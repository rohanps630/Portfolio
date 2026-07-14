import { readdir, readFile } from "fs/promises";
import { join, extname } from "path";

// Recursively find all HTML files
async function findHtmlFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const res = join(dir, entry.name);
      return entry.isDirectory() ? findHtmlFiles(res) : res;
    })
  );
  return files.flat().filter((f) => extname(f) === ".html");
}

async function checkLinks() {
  const buildDir = join(process.cwd(), ".next", "server", "app");

  console.log(`Scanning build directory: ${buildDir}`);
  const htmlFiles = await findHtmlFiles(buildDir);

  // Routes that render on demand (searchParams etc.) emit no HTML — take the
  // authoritative list from Next's manifest instead of a hand-kept whitelist.
  // Dynamic patterns ([slug]) are intentionally excluded: their valid
  // instances are enumerated by the prerendered HTML files, so a link to
  // e.g. /explorer/undefined still fails.
  const manifestPath = join(process.cwd(), ".next", "app-path-routes-manifest.json");
  const manifest: Record<string, string> = JSON.parse(
    await readFile(manifestPath, "utf8")
  );
  const manifestRoutes = new Set(
    Object.values(manifest).filter((route) => !route.includes("["))
  );
  
  if (htmlFiles.length === 0) {
    console.error("No HTML files found. Did you run `next build` first?");
    process.exit(1);
  }

  // Extract all IDs to validate anchors
  const allIds = new Set<string>();
  const allRoutes = new Set<string>();

  // Regex to match hrefs and ids
  const hrefRegex = /href="([^"]+)"/g;
  const idRegex = /id="([^"]+)"/g;

  // First pass: collect all routes and IDs
  for (const file of htmlFiles) {
    const content = await readFile(file, "utf8");
    
    // Map file path back to route
    let route = file.replace(buildDir, "").replace(/\.html$/, "");
    if (route === "/index") route = "/";
    else if (route.endsWith("/index")) route = route.replace(/\/index$/, "");
    
    allRoutes.add(route);
    
    let match;
    while ((match = idRegex.exec(content)) !== null) {
      allIds.add(`${route}#${match[1]}`);
    }
  }

  console.log(`Found ${allRoutes.size} routes and ${allIds.size} anchors.`);

  let brokenLinks = 0;

  // Second pass: check links
  for (const file of htmlFiles) {
    const content = await readFile(file, "utf8");
    let route = file.replace(buildDir, "").replace(/\.html$/, "");
    if (route === "/index") route = "/";
    else if (route.endsWith("/index")) route = route.replace(/\/index$/, "");

    let match;
    while ((match = hrefRegex.exec(content)) !== null) {
      const href = match[1];
      
      // Ignore external links, mailto, tel, empty
      if (
        href.startsWith("http") || 
        href.startsWith("mailto:") || 
        href.startsWith("tel:") || 
        href === "" || 
        href.startsWith("/_next") || 
        href.startsWith("javascript:") ||
        href.startsWith("/fonts/") ||
        href.startsWith("/images/") ||
        href.startsWith("/icon") ||
        href.startsWith("/apple-icon") ||
        href.startsWith("/manifest") ||
        href.startsWith("/api/") ||
        href.endsWith(".pdf")
      ) {
        continue;
      }

      // Handle relative paths
      let target = href;
      if (!target.startsWith("/")) {
        // Very basic resolution for simplicity, assuming most are absolute paths
        target = join(route, target); 
      }

      const [path, hash] = target.split("#");
      
      // Clean up path
      const cleanPath = path === "" ? route : (path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path);

      if (!allRoutes.has(cleanPath) && !manifestRoutes.has(cleanPath)) {
        console.error(`❌ Broken link in ${route}: ${href} (Path ${cleanPath} not found)`);
        brokenLinks++;
      } else if (hash && allRoutes.has(cleanPath)) {
        // Anchor targets are only verifiable on prerendered pages.
        const targetId = `${cleanPath}#${hash}`;
        if (!allIds.has(targetId)) {
          console.error(`❌ Broken anchor in ${route}: ${href} (Anchor #${hash} not found on ${cleanPath})`);
          brokenLinks++;
        }
      }
    }
  }

  if (brokenLinks > 0) {
    console.error(`\nFound ${brokenLinks} broken links.`);
    process.exit(1);
  } else {
    console.log("\n✅ All internal links and anchors are valid.");
  }
}

checkLinks().catch((err) => {
  console.error(err);
  process.exit(1);
});

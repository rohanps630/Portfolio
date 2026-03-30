import postgres from "postgres";
const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

async function fix() {
  console.log("Removing duplicate rows...\n");

  // For each table, keep only the row with the lowest id for each unique combination

  // Stats: unique by label
  const statsDel = await sql`
    DELETE FROM stats WHERE id NOT IN (
      SELECT MIN(id) FROM stats GROUP BY label
    )
  `;
  console.log(`stats: removed ${statsDel.count} duplicates`);

  // Testimonials: unique by name
  const testDel = await sql`
    DELETE FROM testimonials WHERE id NOT IN (
      SELECT MIN(id) FROM testimonials GROUP BY name
    )
  `;
  console.log(`testimonials: removed ${testDel.count} duplicates`);

  // FAQs: unique by question
  const faqsDel = await sql`
    DELETE FROM faqs WHERE id NOT IN (
      SELECT MIN(id) FROM faqs GROUP BY question
    )
  `;
  console.log(`faqs: removed ${faqsDel.count} duplicates`);

  // Process steps: unique by step_number
  const stepsDel = await sql`
    DELETE FROM process_steps WHERE id NOT IN (
      SELECT MIN(id) FROM process_steps GROUP BY step_number
    )
  `;
  console.log(`process_steps: removed ${stepsDel.count} duplicates`);

  // Nav items: unique by href
  const navDel = await sql`
    DELETE FROM nav_items WHERE id NOT IN (
      SELECT MIN(id) FROM nav_items GROUP BY href
    )
  `;
  console.log(`nav_items: removed ${navDel.count} duplicates`);

  // Tech stack: unique by name
  const techDel = await sql`
    DELETE FROM tech_stack WHERE id NOT IN (
      SELECT MIN(id) FROM tech_stack GROUP BY name
    )
  `;
  console.log(`tech_stack: removed ${techDel.count} duplicates`);

  // Verify counts
  console.log("\nFinal counts:");
  const tables = ["stats", "testimonials", "faqs", "process_steps", "nav_items", "tech_stack", "page_sections", "projects", "blog_posts"];
  for (const table of tables) {
    const [{ count }] = await sql.unsafe(`SELECT COUNT(*)::int as count FROM ${table}`);
    console.log(`  ${table}: ${count}`);
  }

  // Add unique constraints to prevent future duplicates
  console.log("\nAdding unique constraints...");
  const constraints = [
    ["stats", "label", "stats_label_unique"],
    ["testimonials", "name", "testimonials_name_unique"],
    ["faqs", "question", "faqs_question_unique"],
    ["process_steps", "step_number", "process_steps_step_number_unique"],
    ["nav_items", "href", "nav_items_href_unique"],
    ["tech_stack", "name", "tech_stack_name_unique"],
  ];
  for (const [table, col, name] of constraints) {
    try {
      await sql.unsafe(`ALTER TABLE ${table} ADD CONSTRAINT ${name} UNIQUE (${col})`);
      console.log(`  ✓ ${name}`);
    } catch {
      console.log(`  - ${name} (already exists)`);
    }
  }

  await sql.end();
  console.log("\nDone!");
}
fix();

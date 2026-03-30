import postgres from "postgres";
const sql = postgres(process.env.DATABASE_URL!, { prepare: false });

async function check() {
  const tables = ["stats", "testimonials", "faqs", "process_steps", "nav_items", "tech_stack", "page_sections"];
  for (const table of tables) {
    const rows = await sql.unsafe(`SELECT id FROM ${table} ORDER BY id`);
    console.log(`${table}: ${rows.length} rows`);
  }
  await sql.end();
}
check();

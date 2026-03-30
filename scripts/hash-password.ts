import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error("Usage: bun run scripts/hash-password.ts <password>");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);
console.log(`\nPassword hash generated:\n`);
console.log(hash);
console.log(`\nAdd this to your .env.local file:`);
console.log(`ADMIN_PASSWORD_HASH=${hash}`);

#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");

const projectName = process.argv[2];

if (!projectName) {
  console.error("❌ Please provide a project folder name. Usage: npx themexxxxxz my-app");
  process.exit(1);
}

const targetPath = path.resolve(process.cwd(), projectName);
const templatePath = path.join(__dirname, "template");

console.log(`🚀 Creating CLI in: ${targetPath}`);

try {
  fs.copySync(templatePath, targetPath);
  console.log("\n✅ files copied!");
  console.log("📦 Next steps:");
  console.log(`  cd ${projectName}`);
  console.log("  npm install");
  console.log("  npm run dev\n");
} catch (err) {
  console.error("❌ Error copying project:", err.message);
  process.exit(1);
}

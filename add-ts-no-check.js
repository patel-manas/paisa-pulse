import fs from "fs";
import { glob } from "glob";

const addTsNocheck = (filePath) => {
  const content = fs.readFileSync(filePath, "utf-8");
  if (!content.startsWith("// @ts-nocheck")) {
    const newContent = `// @ts-nocheck\n${content}`;
    fs.writeFileSync(filePath, newContent, "utf-8");
    console.log(`Added @ts-nocheck to ${filePath}`);
  }
};

const tsFiles = glob.sync("src/**/*.{ts,tsx}");
tsFiles.forEach(addTsNocheck);

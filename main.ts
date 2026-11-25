import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Our own make.fun handle, sent as one word and nothing else.
const USERNAME = "quiet-kestrel-10";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

if (USERNAME.length < 1 || USERNAME.length > 30) {
  throw new Error("username must be 1 to 30 characters long");
}
if (/\s/.test(USERNAME)) {
  throw new Error("username must be a single word with no whitespace");
}
if (USERNAME.trim() !== USERNAME) {
  throw new Error("username must not start or end with whitespace");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, USERNAME, "utf8");

// Read the file back and confirm it matches the username byte for byte.
const written = readFileSync(outFile, "utf8");
if (written !== USERNAME) {
  throw new Error("entry file does not match the username byte for byte");
}

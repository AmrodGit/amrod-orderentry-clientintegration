import { buildSchema, parse, validate } from "graphql";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const schemaPath = join(root, "..", "SDK-.NET", "Amrod.SDK", "schema.graphql");
const lockPath = join(root, "schema.sha256");
const operationRoot = join(root, "..", "SDK-.NET", "Amrod.SDK", "graphql");

const schemaSource = await readFile(schemaPath, "utf8");
const expectedHash = (await readFile(lockPath, "utf8")).trim();
const actualHash = createHash("sha256").update(schemaSource).digest("hex").toUpperCase();

if (actualHash !== expectedHash) {
  throw new Error(`Schema checksum mismatch. Update ${lockPath} only when the SDK contract is intentionally changed.`);
}

const schema = buildSchema(schemaSource);
const operationFiles = (await walk(operationRoot)).filter((file) => file.endsWith(".graphql"));

for (const file of operationFiles) {
  const document = parse(await readFile(file, "utf8"));
  const errors = validate(schema, document);

  if (errors.length > 0) {
    throw new Error(`${file} is invalid against ${schemaPath}:\n${errors.map((error) => error.message).join("\n")}`);
  }
}

console.log(`Validated ${operationFiles.length} GraphQL operation documents against the pinned schema.`);

async function walk(directory) {
  const entries = await import("node:fs/promises").then(({ readdir }) => readdir(directory, { withFileTypes: true }));
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }

  return files;
}

import { getCategoryRepository } from "@/lib/db";
import { readFileSync } from "fs";
import { Category } from "@/lib/db/entity/Category";
import { basename } from "path";
import { exit } from "process";

export default async function add(filepath: string) {
  const text = readFileSync(filepath, "utf-8");

  const paste = new Category();
  /*   paste.title = basename(filepath);
  paste.text = text;
 */
  const pasteRepository = await getCategoryRepository();
  await pasteRepository.save(paste);
  console.log("paste has been saved");
  exit(0);
}

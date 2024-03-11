import { getPasteRepository } from "@/lib/db";
import { readFileSync } from "fs";
import { Paste } from "@/lib/db/entity/Paste";
import { basename } from "path";
import { exit } from "process";

export default async function add(filepath: string) {
  const text = readFileSync(filepath, "utf-8");

  const paste = new Paste();
  paste.title = basename(filepath);
  paste.text = text;

  const pasteRepository = await getPasteRepository();
  await pasteRepository.save(paste);
  console.log("paste has been saved");
  exit(0);
}

import { getTipRepository } from "@/lib/db";
import consoleRenderer from "@/lib/renderer/consoleRenderer";
import fs from "fs";
import { marked } from "marked";
import { exit } from "process";
marked.setOptions({
  renderer: consoleRenderer,
});

export default async function backup(outfile: string | null) {
  const repo = await getTipRepository();

  const query = repo.createQueryBuilder("tips");

  query
    .innerJoinAndSelect("tips.category", "category")
    .orderBy("tips.id", "ASC");

  const tips = await query.getRawMany();

  if (outfile) {
    fs.writeFileSync(outfile, JSON.stringify(tips, null, 2));
    console.log(`Backup saved to ${outfile}`);
  } else {
    console.log(JSON.stringify(tips, null, 2));
  }

  exit(0);
}

import { getPasteRepository } from "@/lib/db";
import { Paste } from "@/lib/db/entity/Paste";
import { exit } from "process";
import c from "ansi-colors";
export default async function show(id?: string) {
  const repo = await getPasteRepository();
  let paste: Paste | null;
  if (id && id !== "-1") {
    paste = await repo.findOneBy({
      id: parseInt(id),
    });
  } else {
    paste = await repo
      .createQueryBuilder("paste")
      .orderBy("id", "DESC")
      .getOne();
  }
  if (!paste) {
    console.log("No paste found");
    exit(1);
  }
  console.log(c.cyan(paste.title));
  console.log(paste.text);
  exit(0);
}

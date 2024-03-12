import { getCategoryRepository, getTipRepository } from "@/lib/db";
import { Category } from "@/lib/db/entity/Category";
import { exit } from "process";
import c from "ansi-colors";
import { Tip } from "@/lib/db/entity/Tip";
import { marked } from "marked";
import consoleRenderer from "@/lib/renderer/consoleRenderer";
import { TipFromDb } from "@/lib/types";
marked.setOptions({
  renderer: consoleRenderer,
});
export default async function show(id?: string) {
  const repo = await getTipRepository();
  let tip: Tip | null;
  if (id && id !== "-1") {
    tip = await repo.findOneBy({
      id: parseInt(id),
    });
  } else {
    tip = await repo.createQueryBuilder("tips").orderBy("id", "DESC").getOne();
  }
  if (!tip) {
    console.log("No tip found");
    exit(1);
  }
  console.log(
    c.bgYellow.black(` ${tip.id} `) + c.bgCyan.black(` ${tip.title} `)
  );
  console.log(marked(tip.text));

  exit(0);
}

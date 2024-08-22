import { getTipRepository } from "@/lib/db";
import { Tip } from "@/lib/db/entity/Tip";
import consoleRenderer from "@/lib/renderer/consoleRenderer";
import c from "ansi-colors";
import { marked } from "marked";
import { exit } from "process";
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

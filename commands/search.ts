import { getCategoryRepository, getTipRepository } from "@/lib/db";
import { log } from "@/lib/utils";
import { exit } from "process";
import Table from "easy-table";
import c from "ansi-colors";
import { Category } from "@/lib/db/entity/Category";
import figlet = require("figlet");
import { marked } from "marked";
import consoleRenderer from "@/lib/renderer/consoleRenderer";
type TipFromDb = {
  tips_id: number;
  tips_title: string;
  tips_text: string;
  category_name: string;
};

marked.setOptions({
  renderer: consoleRenderer,
});

export default async function search(term: string, category: string) {
  const repo = await getTipRepository();

  const query = repo
    .createQueryBuilder("tips")
    .where("title ILIKE :term OR text ILIKE :term", { term: `%${term}%` })
    .innerJoinAndSelect("tips.category", "category")
    .orderBy("tips.id", "ASC");

  if (category !== "all") {
    query.andWhere("category.name = :category", { category });
  }

  const allTips: TipFromDb[] = await query.getRawMany();

  const categories: Record<string, TipFromDb[]> = {};
  allTips.forEach((tip) => {
    categories[tip.category_name] ||= [];
    categories[tip.category_name].push(tip);
  });

  Object.keys(categories).forEach((category) => {
    console.log(c.cyan(figlet.textSync(category)));

    categories[category].forEach((tip) => {
      console.log(
        c.bgYellow.black(` ${tip.tips_id} `) +
          c.bgCyan.black(` ${tip.tips_title} `)
      );
      console.log(marked(tip.tips_text));

      console.log();
    });
    console.log("\n");
  });

  exit(0);
}

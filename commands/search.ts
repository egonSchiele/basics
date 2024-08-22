import { getTipRepository } from "@/lib/db";
import consoleRenderer from "@/lib/renderer/consoleRenderer";
import { TipFromDb } from "@/lib/types";
import c from "ansi-colors";
import Table from "easy-table";
import { marked } from "marked";
import { exit } from "process";

marked.setOptions({
  renderer: consoleRenderer,
});

export default async function search(term: string | null, category: string) {
  const repo = await getTipRepository();
  const query = repo.createQueryBuilder("tips");

  if (term && category !== "all") {
    query.where(
      "(title ILIKE :term OR text ILIKE :term) AND category.name = :category",
      {
        term: `%${term}%`,
        category,
      }
    );
  } else if (term) {
    query.where("title ILIKE :term OR text ILIKE :term", {
      term: `%${term}%`,
    });
  } else if (category !== "all") {
    query.where("category.name = :category", {
      category,
    });
  }

  query
    .innerJoinAndSelect("tips.category", "category")
    .orderBy("tips.id", "ASC");

  const allTips: TipFromDb[] = await query.getRawMany();

  const categories: Record<string, TipFromDb[]> = {};
  allTips.forEach((tip) => {
    categories[tip.category_name] ||= [];
    categories[tip.category_name].push(tip);
  });

  var t = new Table();

  console.log(c.yellow(`Found ${allTips.length} tips`));
  console.log();

  allTips.forEach((tip) => {
    t.cell(c.cyan("category"), tip.category_name);
    t.cell(c.cyan("id"), tip.tips_id);
    t.cell(c.cyan("title"), tip.tips_title);
    t.newRow();
  });
  console.log(t.toString());

  Object.keys(categories).forEach((category) => {
    console.log(c.cyan(c.bold(category)));

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

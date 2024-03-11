import { getCategoryRepository, getTipRepository } from "@/lib/db";
import { log } from "@/lib/utils";
import { exit } from "process";
import Table from "easy-table";
import c from "ansi-colors";
import { Category } from "@/lib/db/entity/Category";
export default async function search(term: string, category: string) {
  const repo = await getTipRepository();

  const allTips = await repo
    .createQueryBuilder("tips")
    .where("title ILIKE :term", { term: `%${term}%` })
    .orWhere("text ILIKE :term", { term: `%${term}%` })
    .orderBy("id", "ASC")
    .getRawMany();
  // var t = new Table();

  // also tips_category_id
  allTips.forEach((category) => {
    console.log(c.cyan(category.tips_id), c.yellow(category.tips_title));
    console.log(category.tips_text);
  });
  exit(0);
}

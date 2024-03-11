import { getCategoryRepository, getTipRepository } from "@/lib/db";
import { log } from "@/lib/utils";
import { exit } from "process";
import Table from "easy-table";
import c from "ansi-colors";
import { Category } from "@/lib/db/entity/Category";
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

  const allTips = await query.getRawMany();

  // var t = new Table();

  // also tips_category_id
  allTips.forEach((category) => {
    console.log(c.cyan(category.tips_id), c.yellow(category.tips_title));
    console.log(category.tips_text);
  });
  exit(0);
}

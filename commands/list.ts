import { getCategoryRepository } from "@/lib/db";
import { log } from "@/lib/utils";
import { exit } from "process";
import Table from "easy-table";
import c from "ansi-colors";
import { Category } from "@/lib/db/entity/Category";
export default async function list() {
  const repo = await getCategoryRepository();

  const allCategories = await repo
    .createQueryBuilder("category")
    .select(["id", "name", "nice_name", "description", "hidden"])
    .orderBy("id", "ASC")
    .getRawMany();
  var t = new Table();

  allCategories.forEach((category) => {
    t.cell(c.cyan("id"), category.id);
    t.cell(c.cyan("name"), category.name);
    t.cell(c.cyan("nice_name"), category.nice_name);
    t.cell(c.cyan("description"), category.description);
    t.cell(c.cyan("hidden"), category.hidden);
    t.newRow();
  });
  console.log(t.toString());
  exit(0);
}

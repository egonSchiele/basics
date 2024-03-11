import { getPasteRepository } from "@/lib/db";
import { log } from "@/lib/utils";
import { exit } from "process";
import Table from "easy-table";
import c from "ansi-colors";
export default async function list() {
  const repo = await getPasteRepository();

  const allPastes = await repo
    .createQueryBuilder("paste")
    .select(["id", "title"])
    .orderBy("id", "DESC")
    .getRawMany();
  var t = new Table();

  allPastes.forEach((paste) => {
    t.cell(c.cyan("id"), paste.id);
    t.cell(c.cyan("title"), paste.title);
    t.newRow();
  });
  console.log(t.toString());
  exit(0);
}

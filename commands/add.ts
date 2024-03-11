import { getCategoryRepository } from "@/lib/db";
import { readFileSync } from "fs";
import { Category } from "@/lib/db/entity/Category";
import { basename } from "path";
import { exit, title } from "process";
import inquirer, { DistinctQuestion } from "inquirer";

export default async function add(category?: string | undefined) {
  const questions: ReadonlyArray<DistinctQuestion> = [
    {
      type: "input",
      name: "title",
      message: "Title?",
      filter: (value) => value.trim(),
    },
    {
      type: "editor",
      name: "text",
      message: "Text?",
    },
  ];

  if (!category) {
    const categories = await getCategoryRepository();
    const allCategories = await categories.find();
    const choices = allCategories.map((c) => c.name);
    // @ts-ignore
    questions.unshift({
      type: "list",
      name: "category",
      message: "Category?",
      choices,
    });
  }

  const responses = (await inquirer.prompt(questions, { category })) as {
    title: string;
    text: string;
    category: string;
  };

  console.log({ responses });
  exit(0);

  const paste = new Category();
  /*   paste.title = basename(filepath);
  paste.text = text;
 */
  const pasteRepository = await getCategoryRepository();
  await pasteRepository.save(paste);
  console.log("paste has been saved");
  exit(0);
}

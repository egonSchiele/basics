import { getCategoryRepository, getTipRepository } from "@/lib/db";
import { readFileSync } from "fs";
import { Category } from "@/lib/db/entity/Category";
import { basename } from "path";
import { exit, title } from "process";
import inquirer, { DistinctQuestion } from "inquirer";
import { Tip } from "@/lib/db/entity/Tip";

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
    const choices = allCategories.map((c) => ({ name: c.name, value: c.id }));
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
    category: number;
  };

  const categoryRow = await getCategory({ id: responses.category });

  if (!categoryRow) {
    console.error("Category not found with id", responses.category);
    exit(1);
  }

  const tip = new Tip();
  tip.title = responses.title;
  tip.text = responses.text;
  tip.category = categoryRow;

  const repo = await getTipRepository();
  await repo.save(tip);
  console.log("tip saved");
  exit(0);
}

async function getCategory({ id }: { id: number }) {
  const categories = await getCategoryRepository();
  return categories.findOneBy({ id });
}

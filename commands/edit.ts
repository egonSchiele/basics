import { getCategoryRepository, getTipRepository } from "@/lib/db";
import { Category } from "@/lib/db/entity/Category";
import { exit } from "process";
import c from "ansi-colors";
import { Tip } from "@/lib/db/entity/Tip";
import { marked } from "marked";
import consoleRenderer from "@/lib/renderer/consoleRenderer";
import { TipFromDb } from "@/lib/types";
import path = require("path");
marked.setOptions({
  renderer: consoleRenderer,
});
export default async function edit(id: string) {
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

  const toEdit = tip.title + "\n" + tip.text;

  const edited = await writeToTempFileAndOpenEditor(toEdit);
  const [title, ..._text] = edited.split("\n");
  const text = _text.join("\n");
  console.log("New contents:");
  console.log(c.bgYellow.black(` ${tip.id} `) + c.bgCyan.black(` ${title} `));
  console.log(marked(text));

  const responses = await inquirer.prompt({
    type: "input",
    name: "confirm",
    message: "Save it? (y/n)",
    filter: (value) => value.trim(),
  });

  if (responses.confirm !== "y" && responses.confirm !== "yes") {
    console.log(c.red("Not saving"));
    exit(0);
  }

  console.log(c.yellow("saving..."));

  tip.title = title;
  tip.text = text;
  await repo.save(tip);
  console.log(c.yellow("saved!"));

  exit(0);
}

import { writeFile, readFile } from "fs/promises";
import { exec, execSync } from "child_process";
import inquirer from "inquirer";

async function writeToTempFileAndOpenEditor(content: string): Promise<string> {
  const tempFilePath = path.resolve("/tmp", "basics-tempfile.md");

  try {
    // Write content to a temporary file
    await writeFile(tempFilePath, content);

    // Open the temporary file in the default text editor
    execSync(`$EDITOR ${tempFilePath}`);
    // Read the contents of the file back into TypeScript as a string
    const fileContent = await readFile(tempFilePath, "utf-8");

    return fileContent;
  } catch (error) {
    console.error("Error:", error);
    return "";
  }
}

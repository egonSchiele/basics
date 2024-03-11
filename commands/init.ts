import { Config } from "@/lib/types";
import { setConfig } from "@/lib/utils";
import inquirer from "inquirer";
export default async function init() {
  const responses: Config = await inquirer.prompt([
    {
      type: "input",
      name: "host",
      message: "Database host?",
      filter: (value) => value.trim(),
    },
    {
      type: "input",
      name: "port",
      message: "Database port?",
      filter: (value) => value.trim(),
    },
    {
      type: "input",
      name: "username",
      message: "Database username?",
      filter: (value) => value.trim(),
    },
    {
      type: "password",
      name: "password",
      message: "Database password?",
      filter: (value) => value.trim(),
    },
  ]);

  setConfig(responses);
}

import { Config } from "@/lib/types";
import { setConfig } from "@/lib/utils";
import { prompt } from "enquirer";
export default async function init() {
  const responses: Config = await prompt([
    {
      type: "input",
      name: "host",
      message: "Database host?",
      format: (value) => value.trim(),
    },
    {
      type: "input",
      name: "port",
      message: "Database port?",
      format: (value) => value.trim(),
    },
    {
      type: "input",
      name: "username",
      message: "Database username?",
      format: (value) => value.trim(),
    },
    {
      type: "password",
      name: "password",
      message: "Database password?",
      format: (value) => value.trim(),
    },
  ]);

  setConfig(responses);
}

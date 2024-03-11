#!/usr/bin/env node
import { Command } from "commander";
import add from "./commands/add";
import list from "./commands/list";
import show from "./commands/show";
import init from "./commands/init";
import config from "./commands/config";
import { log } from "@/lib/utils";
import search from "./commands/search";

const program = new Command();

program.name("basics").description("Tech notes").version("0.0.1");

program
  .command("add")
  .alias("a")
  .description("Add file to pasteboard")
  .option("-c, --category <name>", "Category to add to")

  .action((options) => {
    add(options.category);
  });

program
  .command("list")
  .alias("l")
  .description("List categories")
  .action(() => {
    list();
  });

program
  .command("search")
  .alias("s")
  .description("Search all tips")
  .argument("<term>", "search term")
  .option(
    "-c, --category <name>",
    "Category to search in (default: all)",
    "all"
  )
  .action((term, options) => {
    search(term, options.category);
  });

program
  .command("show")
  .description("Show one or more pastes")
  .argument("[id]", "paste id")
  .action((id) => {
    show(id);
  });

program
  .command("init")
  .description("initialize config")
  .action(() => {
    init();
  });

program
  .command("config")
  .description("configalize config (print current config)")
  .action(() => {
    config();
  });

program.parse();

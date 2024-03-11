#!/usr/bin/env node
import { Command } from "commander";
import add from "./commands/add";
import list from "./commands/list";
import show from "./commands/show";
import init from "./commands/init";
import config from "./commands/config";
import { log } from "@/lib/utils";

const program = new Command();

program.name("pb").description("Global pasteboard CLI").version("0.0.1");

program
  .command("add")
  .description("Add file to pasteboard")
  .argument("<filepath>", "file to add")
  .action((filepath) => {
    add(filepath);
  });

program
  .command("list")
  .description("List files in pasteboard")
  .action(() => {
    list();
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

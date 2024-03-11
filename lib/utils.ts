import { resolve } from "path";
import { homedir } from "os";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { Config } from "@/lib/types";
import c from "ansi-colors";
export const CONFIG_PATH = resolve(homedir(), ".pb.config.json");

export function getConfig(): Config | null {
  if (existsSync(CONFIG_PATH)) {
    return JSON.parse(readFileSync(CONFIG_PATH, "utf-8"));
  }
  return null;
}

export function setConfig(config: Config) {
  writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

export function log(message: string) {
  console.log(c.yellow(message));
}

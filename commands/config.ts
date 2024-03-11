import { CONFIG_PATH, getConfig } from "@/lib/utils";

export default function config() {
  const config = getConfig();
  if (config) {
    console.log(JSON.stringify(config, null, 2));
  } else {
    console.log("No config found.");
  }
  console.log(`config path: ${CONFIG_PATH}`);
}

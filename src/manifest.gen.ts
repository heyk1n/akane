import type { Manifest } from "./types.ts";

import $0 from "./commands/kill.ts";
import $1 from "./commands/ping.ts";

export default {
	commands: [
		$0,
		$1,
	],
} as Manifest;

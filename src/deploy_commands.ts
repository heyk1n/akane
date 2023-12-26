import { REST } from "@discordjs/rest";
import manifest from "./manifest.gen.ts";
import { APIVersion as version, Routes } from "discord";

const rest = new REST({
	version,
})
	.setToken(Deno.env.get("DISCORD_TOKEN")!);

await rest.put(
	Routes.applicationCommands(Deno.env.get("DISCORD_ID")!),
	{
		body: manifest.commands.map(
			(command) => command.data,
		),
	},
);

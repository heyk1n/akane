import type {
	APIChatInputApplicationCommandInteraction,
	APIInteraction,
	RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "discord";
import type { REST } from "@discordjs/rest";

export interface ExecuteOptions<
	T extends APIInteraction,
> {
	interaction: T;
	rest: REST;
	kv: Deno.Kv;
}

export interface ChatInputCommand {
	data: RESTPostAPIChatInputApplicationCommandsJSONBody;
	execute(
		options: ExecuteOptions<APIChatInputApplicationCommandInteraction>,
	): Promise<Response> | Response;
}

export type Command = ChatInputCommand;

export interface Manifest {
	commands: Command[];
}

import type {
	APIChatInputApplicationCommandInteraction,
	RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "discord";
import type { REST } from "@discordjs/rest";

export interface ChatInputCommand {
	data: RESTPostAPIChatInputApplicationCommandsJSONBody;
	execute(
		interaction: APIChatInputApplicationCommandInteraction,
		rest?: REST,
	): Promise<Response> | Response;
}

export type Command = ChatInputCommand;

export interface Manifest {
	commands: Command[];
}

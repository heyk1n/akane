import type { ChatInputCommand } from "../types.ts";
import {
	type APIInteractionResponseChannelMessageWithSource,
	InteractionResponseType,
} from "discord";

export default {
	data: {
		name: "ping",
		description: "Ngetes doang banh~ :3",
		dm_permission: false,
	},
	execute(_options): Response {
		const interactionResponse:
			APIInteractionResponseChannelMessageWithSource = {
				type: InteractionResponseType.ChannelMessageWithSource,
				data: {
					content: "Pong~!",
				},
			};

		return Response.json(interactionResponse);
	},
} as ChatInputCommand;

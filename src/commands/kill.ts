import type { ChatInputCommand } from "../types.ts";
import {
	type APIInteractionResponseChannelMessageWithSource,
	ApplicationCommandOptionType,
	InteractionResponseType,
} from "discord";
import {userMention } from "npm:@discordjs/formatters";

export default {
	data: {
		name: "kill",
		description:
			"Serang temen atau musuh atau orang ga dikenal siapa aje dah serahh~ :3",
		dm_permission: false,
		options: [
			{
				name: "target",
				description: "Target untuk dibunuh >:3",
				type: ApplicationCommandOptionType.User,
				required: true,
			},
		],
	},
	async execute({ interaction, kv }): Promise<Response> {
		const target = Object.values(interaction.data.resolved!.users!)[0];
		const targetId = target.id;

		const kvKey = [targetId, "health"];

		const data = await kv.get<number>(kvKey);
		const health = data.value ?? 100;
		let message: string;

		switch (health) {
			case 0:
				{
					message = `Target yang ingin kamu bunuh sudah mati.`;
				}
				break;
			default: {
				const reduced = health - 20;
				await kv.set(kvKey, reduced);

				message =
					`Kamu menyerang ${userMention(targetId)} hingga darahnya tersisa ${reduced}%`;
			}
		}

		return Response.json(
			{
				type: InteractionResponseType.ChannelMessageWithSource,
				data: {
					content: message,
					allowed_mentions: {
						parse: []
					}
				},
			} as APIInteractionResponseChannelMessageWithSource,
		);
	},
} as ChatInputCommand;

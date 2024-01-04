import {
	type APIChatInputApplicationCommandInteraction,
	type APIInteraction,
	type APIInteractionResponseChannelMessageWithSource,
	type APIInteractionResponsePong,
	APIVersion as version,
	InteractionResponseType,
	Routes
} from "discord";
import { REST } from "@discordjs/rest";

import CommandUtils from "./utils/command.ts";
import InteractionUtils from "./utils/interaction.ts";

import manifest from "./manifest.gen.ts";
import type { Command } from "./types.ts";

import tweetnacl from "npm:tweetnacl@1.0.3";
import { Status } from "std/http/http_status.ts";
import { decodeHex } from "std/encoding/hex.ts";

async function handler(request: Request): Promise<Response> {
	const invalidRequest = new Response(
		"Invalid request.",
		{ status: Status.Unauthorized },
	);
	const body = await request.text();
	const timestamp = request.headers.get("x-signature-timestamp")!;
	const signature = request.headers.get("x-signature-ed25519")!;

	const valid = tweetnacl.sign.detached.verify(
		new TextEncoder().encode(timestamp + body),
		decodeHex(signature),
		decodeHex(Deno.env.get("DISCORD_PUBLIC_KEY")!),
	);

	if (!valid) return invalidRequest;

	const interaction: APIInteraction = JSON.parse(body);
	const rest = new REST({
		version,
	})
		.setToken(Deno.env.get("DISCORD_TOKEN")!);
	const kv = await Deno.openKv();

	if (InteractionUtils.isApplicationCommand(interaction)) {
		const command: Command = manifest.commands.find(
			(ctx) => ctx.data.name === interaction.data.name,
		)!;

		if (command) {
			if (CommandUtils.isChatInput(command)) {
				return await command.execute({
					interaction:
						interaction as APIChatInputApplicationCommandInteraction,
					rest,
					kv,
				});
			} else {
				throw "Unknown command type";
			}
		} else {
			const interactionResponse:
				APIInteractionResponseChannelMessageWithSource = {
					type: InteractionResponseType.ChannelMessageWithSource,
					data: {
						content:
							"Duh,, kayaknya command ini sudah dihapus deh, silahkan lapor ke develope yaa makacii~!",
					},
				};

			return Response.json(interactionResponse);
		}
	} else if (InteractionUtils.isPing(interaction)) {
		await rest.put(
			Routes.applicationCommands(Deno.env.get("DISCORD_ID")),
			{
				body: manifest.commands.map((cmd) => cmd.data)
			}
		);
		const interactionResponse: APIInteractionResponsePong = {
			type: InteractionResponseType.Pong,
		};
		return Response.json(interactionResponse);
	} else {
		throw "Unknown interaction type";
	}
}

Deno.serve(handler);

import {
	type APIApplicationCommandInteraction,
	type APIInteraction,
	type APIModalSubmitInteraction,
	type APIPingInteraction,
	InteractionType,
} from "discord";

export default {
	isApplicationCommand(
		interaction: APIInteraction,
	): interaction is APIApplicationCommandInteraction {
		return interaction.type == InteractionType.ApplicationCommand;
	},
	isModalSubmit(
		interaction: APIInteraction,
	): interaction is APIModalSubmitInteraction {
		return interaction.type == InteractionType.ModalSubmit;
	},
	isPing(
		interaction: APIInteraction,
	): interaction is APIPingInteraction {
		return interaction.type == InteractionType.Ping;
	},
};

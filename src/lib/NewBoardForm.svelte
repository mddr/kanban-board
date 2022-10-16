<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { form, field } from "svelte-forms";
	import { required } from "svelte-forms/validators";

	import type { CreateBoard } from "src/models/board.model";
	import FormField from "./FormField.svelte";

	const dispatcher = createEventDispatcher<{
		cancel: void;
		submit: CreateBoard;
	}>();

	const title = field("title", "", [required()], { checkOnInit: true });
	const backgroundColor = field("backgroundColor", "#fff", [required()], {
		checkOnInit: true,
	});
	const headerColor = field("headerColor", "#000", [required()], {
		checkOnInit: true,
	});
	const newItemForm = form(title, backgroundColor, headerColor);

	function emitValues(event: Event) {
		event.preventDefault();

		console.log({ $newItemForm: $newItemForm.summary });

		if ($newItemForm.valid) {
			dispatcher("submit", {
				title: $title.value,
				backgroundColor: $backgroundColor.value,
				textColor: $headerColor.value,
			});
		}
	}

	function emitCancel() {
		dispatcher("cancel");
	}
</script>

<form class="p-3" on:submit={(event) => emitValues(event)}>
	<FormField>
		<label for="board-item-title">Title</label>
		<input
			type="text"
			id="board-item-title"
			aria-describedby="board-item-title-error"
			class={$title.errors.length ? "border-b-red-500" : "border-b-fuchsia-900"}
			bind:value={$title.value}
		/>
		{#if $title.errors.length}
			<span id="board-item-title-error" class="text-sm text-red-500">
				Field required
			</span>
		{/if}
	</FormField>

	<FormField>
		<label for="board-item-bg">Background color</label>
		<input
			type="color"
			id="board-item-bg"
			aria-describedby="board-item-bg-error"
			bind:value={$backgroundColor.value}
		/>
		{#if $backgroundColor.errors.length}
			<span id="board-item-bg-error" class="text-sm text-red-500">
				Field required
			</span>
		{/if}
	</FormField>

	<FormField>
		<label for="board-item-text">Header color</label>
		<input
			type="color"
			id="board-item-text"
			aria-describedby="board-item-text-error"
			bind:value={$headerColor.value}
		/>
		{#if $headerColor.errors.length}
			<span id="board-item-text-error" class="text-sm text-red-500">
				Field required
			</span>
		{/if}
	</FormField>

	<button
		class="rounded bg-neutral-300 hover:bg-neutral-400 active:bg-neutral-400 px-4 py-2 mt-2"
		type="button"
		on:click={emitCancel}
	>
		Cancel
	</button>
	<button
		class="rounded bg-neutral-500 enabled:hover:bg-neutral-600 active:bg-neutral-600 px-4 py-2 text-white mt-2 "
		type="submit"
	>
		Submit
	</button>
</form>

<style>
	input[type="text"] {
		@apply border-2;
	}
</style>

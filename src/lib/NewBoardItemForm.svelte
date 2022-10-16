<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { form, field } from "svelte-forms";
	import { required } from "svelte-forms/validators";

	import type { CreateBoardElement } from "src/models/board.model";
	import FormField from "./FormField.svelte";

	const dispatcher = createEventDispatcher<{
		cancel: void;
		submit: CreateBoardElement;
	}>();

	const header = field("header", "", [required()], { checkOnInit: true });
	const content = field("content", "", [required()], { checkOnInit: true });
	const newItemForm = form(header, content);

	function emitValues(event: Event) {
		event.preventDefault();

		if ($newItemForm.valid) {
			dispatcher("submit", {
				header: $header.value,
				content: $content.value,
			});
		}
	}

	function emitCancel() {
		dispatcher("cancel");
	}
</script>

<form class="p-3" on:submit={(event) => emitValues(event)}>
	<FormField>
		<label for="board-item-header">Header</label>
		<input
			type="text"
			id="board-item-header"
			aria-describedby="board-item-header-error"
			class={$header.errors.length
				? "border-b-red-500"
				: "border-b-fuchsia-900"}
			bind:value={$header.value}
		/>
		{#if $header.errors.length}
			<span id="board-item-header-error" class="text-sm text-red-500">
				Field required
			</span>
		{/if}
	</FormField>

	<FormField>
		<label for="board-item-content">Content</label>
		<input
			type="text"
			id="board-item-content"
			aria-describedby="board-item-content-error"
			class={$content.errors.length
				? "border-b-red-500"
				: "border-b-fuchsia-900"}
			bind:value={$content.value}
		/>
		{#if $content.errors.length}
			<span id="board-item-content-error" class="text-sm text-red-500">
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

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
	const backgroundColor = field("backgroundColor", "#BADA55", [required()], {
		checkOnInit: true,
	});
	const headerColor = field("headerColor", "#1A1A1A", [required()], {
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
	<FormField label="Title" id="new-board-title" fieldDef={title} />

	<FormField
		label="Background color"
		id="new-board-bg"
		inputType="color"
		fieldDef={backgroundColor}
	/>

	<FormField
		label="Header color"
		id="new-board-header"
		inputType="color"
		fieldDef={headerColor}
	/>

	<button
		class="bg-neutral-300 hover:bg-neutral-400 active:bg-neutral-400"
		type="button"
		on:click={emitCancel}
	>
		Cancel
	</button>
	<button
		class="enabled:hover:bg-neutral-600 active:bg-neutral-600 bg-neutral-500 text-white"
		type="submit"
	>
		Submit
	</button>
</form>

<style>
	button {
		@apply rounded px-4 py-2 mt-2;
	}
</style>

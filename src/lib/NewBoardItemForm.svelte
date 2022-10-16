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
	<FormField label="Header" id="board-item-header" fieldDef={header} />

	<FormField label="Content" id="board-item-content" fieldDef={content} />

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

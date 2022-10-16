<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import type {
		Board,
		BoardElement,
		CreateBoardElement,
	} from "src/models/board.model";
	import NewBoardItemForm from "./NewBoardItemForm.svelte";

	export let board: Board;

	let newFormVisible = false;

	const dispatcher = createEventDispatcher<{
		removeBoard: void;
		addElement: CreateBoardElement;
		removeElement: { id: BoardElement["id"] };
	}>();

	function displayNewItemForm() {
		newFormVisible = true;
	}
	function closeNewItemForm() {
		newFormVisible = false;
	}

	function addNewTask(dto: CustomEvent<CreateBoardElement>) {
		closeNewItemForm();
		dispatcher("addElement", dto.detail);
	}

	function removeElement(id: BoardElement["id"]) {
		dispatcher("removeElement", { id });
	}

	function removeBoard() {
		dispatcher("removeBoard");
	}
</script>

<section
	class="p-2 rounded"
	style="--board-header-bg: {board.backgroundColor}; --board-header-text: {board.textColor}"
>
	<div
		class="p-3 flex justify-between min-w-[400px] rounded-t-lg bg-[color:var(--board-header-bg)]"
	>
		<h2 class="text-2xl text-[color:var(--board-header-text)]">
			{board.title}
		</h2>

		<div>
			<button
				class="board-button"
				type="button"
				disabled={newFormVisible}
				on:click={displayNewItemForm}
			>
				Add item
			</button>
			<button class="board-button" type="button" on:click={removeBoard}>
				Remove
			</button>
		</div>
	</div>

	{#if newFormVisible}
		<NewBoardItemForm on:cancel={closeNewItemForm} on:submit={addNewTask} />
	{/if}

	<div class="p-3 border-b-8 border-b-[color:var(--board-header-bg)]">
		{#each board.elements as element (element.id)}
			<div class="my-3 flex justify-between">
				<div>
					<h3 class="text-xl">{element.header}</h3>
					<span>{element.content}</span>
				</div>

				<button
					class="text-red-700 px-4 bold bg-white hover:bg-gray-50 focus:bg-gray-50 rounded-xl transition"
					type="button"
					aria-label="Remove"
					on:click={() => removeElement(element.id)}
				>
					X
				</button>
			</div>
		{/each}
	</div>
</section>

<style>
	.board-button {
		@apply py-2 px-4 transition bg-neutral-500 enabled:hover:bg-neutral-600 enabled:focus:bg-neutral-500 rounded text-white disabled:bg-neutral-900;
	}
</style>

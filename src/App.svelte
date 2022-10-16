<script lang="ts">
	import "./app.css";
	import BoardView from "./lib/BoardView.svelte";
	import NewBoardForm from "./lib/NewBoardForm.svelte";
	import type {
		Board,
		BoardElement,
		CreateBoard,
		CreateBoardElement,
	} from "./models/board.model";
	import { readBoards, saveBoards } from "./storage";
	import { generateId } from "./utils";

	let newBoardFormVisible = false;
	let boards: Board[] = readBoards();

	$: console.log({ boards });

	$: saveBoards(boards);

	function removeElementFromBoard(
		boardIndex: number,
		elementId: BoardElement["id"]
	) {
		// two equivalent approaches

		// const board = boards[boardIndex];
		// board.elements = board.elements.filter((e) => e.id !== elementId);
		// boards = boards;

		boards[boardIndex] = {
			...boards[boardIndex],
			elements: boards[boardIndex].elements.filter((e) => e.id !== elementId),
		};
	}

	function addElementToBoard(boardIndex: number, dto: CreateBoardElement) {
		const board = boards[boardIndex];
		board.elements.push({ ...dto, id: generateId() });
		boards = boards;
	}

	function displayNewBoardForm() {
		newBoardFormVisible = true;
	}
	function hideNewBoardform() {
		newBoardFormVisible = false;
	}

	function addNewBoard(event: CustomEvent<CreateBoard>) {
		hideNewBoardform();
		boards = [...boards, { ...event.detail, elements: [] }];
	}
	function removeBoard(boardIndex: number) {
		boards.splice(boardIndex, 1);
		boards = boards;
	}
</script>

<main class="p-2">
	<h1 class="text-3xl font-bold">Kanban Board</h1>

	<button
		class="py-2 px-4 transition bg-neutral-500 enabled:hover:bg-neutral-600 enabled:focus:bg-neutral-500 rounded text-white disabled:bg-neutral-900"
		type="button"
		on:click={displayNewBoardForm}>Add Board</button
	>

	{#if newBoardFormVisible}
		<NewBoardForm on:cancel={hideNewBoardform} on:submit={addNewBoard} />
	{/if}

	<div class="flex">
		{#each boards as board, boardIndex}
			<BoardView
				{board}
				on:removeElement={(event) =>
					removeElementFromBoard(boardIndex, event.detail.id)}
				on:addElement={(event) => addElementToBoard(boardIndex, event.detail)}
				on:removeBoard={() => removeBoard(boardIndex)}
			/>
		{/each}
	</div>
</main>

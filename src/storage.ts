import type { Board } from "./models/board.model";

const STORAGE_KEY = "KANBAN_BOARDS";

export function saveBoards(boards: Board[]) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(boards));
}

export function readBoards(): Board[] {
	const fromStorage = localStorage.getItem(STORAGE_KEY);
	return fromStorage ? JSON.parse(fromStorage) : [];
}

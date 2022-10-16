export interface Board {
	title: string;
	backgroundColor: string;
	textColor: string;
	elements: BoardElement[];
}

export interface BoardElement {
	id: string | number;
	header: string;
	content: string;
}

export type CreateBoard = Omit<Board, "elements">;
export type CreateBoardElement = Omit<BoardElement, "id">;

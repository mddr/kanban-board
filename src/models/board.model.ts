export interface Board {
	title: string;
	color: string;
	elements: BoardElement[];
}

export interface BoardElement {
	id: string | number;
	header: string;
	content: string;
}

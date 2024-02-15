import { Dispatch, DragEvent, SetStateAction } from 'react';

export type ColumnProps = {
	title: string;
	column: string;
	headingColor: string;
	cards: Card[];
	setCards: Dispatch<SetStateAction<Card[]>>;
};

export interface Card {
	id: string;
	title: string;
	column: string;
}

export interface CardProps extends Card {
	handleDragStart: (e: DragEvent<HTMLDivElement>, card: Card) => void;
}

export type DropIndicatorProps = {
	beforeId?: string;
	column: string;
};

export type BurnBarrelProps = {
	setCards: Dispatch<SetStateAction<Card[]>>;
};

export type AddCardProps = {
	column: string;
	setCards: Dispatch<SetStateAction<Card[]>>;
};

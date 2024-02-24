import { AddCard, Card, DropIndicator } from '@/components';
import { Card as CardType, ColumnProps } from '@/types';
import { DragEvent, useState } from 'react';

const Column = ({
	title,
	column,
	headingColor,
	cards,
	setCards,
}: ColumnProps) => {
	const [active, setActive] = useState(false);
	const filteredCards = cards.filter(card => card.column === column);
	const handleDragStart = (e: DragEvent<HTMLDivElement>, card: CardType) => {
		e.dataTransfer.setData('cardId', card.id);
	};

	const getIndicators = (): HTMLElement[] => {
		return Array.from(
			document.querySelectorAll(`
		[data-column="${column}"]
		`),
		);
	};

	const getNearestIndicator = (
		e: DragEvent<HTMLDivElement>,
		indicators: HTMLElement[],
	) => {
		const DISTANCE_OFFSET = 50;
		const el = indicators.reduce(
			(closest, child) => {
				const box = child.getBoundingClientRect();
				const offset = e.clientY - (box.top + DISTANCE_OFFSET);

				if (offset < 0 && offset > closest.offset) {
					return { offset: offset, element: child };
				} else {
					return closest;
				}
			},
			{
				offset: Number.NEGATIVE_INFINITY,
				element: indicators[indicators.length - 1],
			},
		);

		return el;
	};

	const clearHighlights = (els?: HTMLElement[]) => {
		const indicators = els ?? getIndicators();
		indicators.forEach(i => {
			i.style.opacity = '0';
		});
	};

	const highlightIndicator = (e: DragEvent<HTMLDivElement>) => {
		const indicators = getIndicators();
		clearHighlights(indicators);
		const el = getNearestIndicator(e, indicators);
		el.element.style.opacity = '1';
	};

	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		highlightIndicator(e);
		setActive(true);
	};

	const handleDragLeave = () => {
		setActive(false);
		clearHighlights();
	};

	const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
		const cardId = e.dataTransfer.getData('cardId');
		setActive(false);
		clearHighlights();

		const indicators = getIndicators();
		const { element } = getNearestIndicator(e, indicators);
		const before = element.dataset.before || '-1';

		if (before !== cardId) {
			let copy = [...cards];
			let cardToTransfer = copy.find(c => c.id === cardId);
			if (!cardToTransfer) return;
			cardToTransfer = { ...cardToTransfer, column };
			copy = copy.filter(c => c.id !== cardId);
			const moveToBack = before === '-1';
			if (moveToBack) {
				copy.push(cardToTransfer);
			} else {
				const insertAtIndex = copy.findIndex(el => el.id === before);
				if (insertAtIndex === undefined) return;
				copy.splice(insertAtIndex, 0, cardToTransfer);
			}
			setCards(copy);
		}
	};

	return (
		<div className='w-56 shrink-0'>
			<div className='item-center mb-3 flex justify-between'>
				<h3 className={`font-medium ${headingColor}`}>{title}</h3>
				<span className='rounded text-sm text-neutral-400'>
					{filteredCards.length}
				</span>
			</div>
			<div
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDragEnd}
				className={`h-full w-full transition-colors 
        ${active ? 'bg-neutral-800/50' : 'bg-neutral-800/0'}`}
			>
				{filteredCards.map(card => {
					return (
						<Card
							key={card.id}
							{...card}
							handleDragStart={handleDragStart}
						/>
					);
				})}
				<DropIndicator column={column} />
				<AddCard
					column={column}
					setCards={setCards}
				/>
			</div>
		</div>
	);
};

export default Column;

import { BurnBarrel, Column } from '@/components';
import { Card } from '@/types';
import { useState } from 'react';

const DEFAULT_CARDS = [
	// BACKLOG
	{ id: '1', title: 'Look into render bug in dashboard', column: 'backlog' },
	{ id: '2', title: 'SOX compliance checklist', column: 'backlog' },
	{ id: '3', title: '[SPIKE] Migrate to Azure', column: 'backlog' },
	{ id: '4', title: 'Document Notifications service', column: 'backlog' },

	// To Do
	{
		id: '5',
		title: 'Research DB options for new microservice',
		column: 'todo',
	},
	{ id: '6', title: 'Postmortem for outage', column: 'todo' },
	{ id: '7', title: 'Sync with product on Q3 roadmap', column: 'todo' },

	// DOING
	{
		id: '8',
		title: 'Refactor context providers to use Zustand',
		column: 'doing',
	},
	{ id: '9', title: 'Add logging to daily CRON', column: 'doing' },

	// DONE
	{
		id: '10',
		title: 'Set up DD dashboards for Lambda listener',
		column: 'done',
	},
];

const Board = () => {
	const [cards, setCards] = useState<Card[]>(DEFAULT_CARDS);
	const columns = [
		{
			title: 'Backlog',
			column: 'backlog',
			headingColor: 'text-neutral-500',
			cards: cards,
			setCards: setCards,
		},
		{
			title: 'To Do',
			column: 'todo',
			headingColor: 'text-yellow-200',
			cards: cards,
			setCards: setCards,
		},
		{
			title: 'In Progress',
			column: 'doing',
			headingColor: 'text-blue-200',
			cards: cards,
			setCards: setCards,
		},
		{
			title: 'Complete',
			column: 'done',
			headingColor: 'text-emerald-200',
			cards: cards,
			setCards: setCards,
		},
	];

	return (
		<div className='flex h-full w-full gap-3 overflow-scroll p-12'>
			{columns.map((col, idx) => {
				return (
					<Column
						key={idx}
						title={col.title}
						column={col.column}
						headingColor={col.headingColor}
						cards={col.cards}
						setCards={col.setCards}
					/>
				);
			})}
			<BurnBarrel setCards={setCards} />
		</div>
	);
};

export default Board;

import { AddCardProps } from '@/types';
import { motion } from 'framer-motion';
import { FormEvent, useState } from 'react';
import { FiPlus } from 'react-icons/fi';

const AddCard = ({ column, setCards }: AddCardProps) => {
	const [text, setText] = useState('');
	const [adding, setAdding] = useState(false);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!text.trim().length) return;
		const newCard = {
			id: Math.random().toString(),
			title: text.trim(),
			column,
		};
		setCards(curr => [...curr, newCard]);
		setAdding(false);
	};

	return (
		<div>
			{adding ? (
				<motion.form
					layout
					onSubmit={handleSubmit}
				>
					<textarea
						onChange={e => setText(e.target.value)}
						autoFocus
						placeholder='Add new task...'
						className='w-full rounded border border-violet-400 bg-violet-400/20
            p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0'
					></textarea>
					<div className='mt-1.5 flex items-center justify-end gap-1.5'>
						<button
							onClick={() => {
								setText('');
								setAdding(false);
							}}
							className='px-3 py-1.5 text-xs text-neutral-400 transition-colors
            hover:text-neutral-50'
						>
							Close
						</button>
						<button
							type='submit'
							className='flex items-center gap-1.5 rounded bg-neutral-50 px-3
              py-1.5 text-xs text-neutral-950 transition-colors
            hover:bg-neutral-300'
						>
							<span>Add</span>
							<FiPlus />
						</button>
					</div>
				</motion.form>
			) : (
				<motion.button
					layout
					onClick={() => setAdding(true)}
					className='flex w-full items-center gap-1.5 px-3 py-1.5 
        text-neutral-400 transition-colors hover:text-neutral-50'
				>
					<span>Add Card</span>
					<FiPlus />
				</motion.button>
			)}
		</div>
	);
};

export default AddCard;

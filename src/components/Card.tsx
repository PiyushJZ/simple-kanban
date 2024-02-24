import { DropIndicator } from '@/components';
import { CardProps } from '@/types';
import { motion } from 'framer-motion';

const Card = ({ id, title, column, handleDragStart }: CardProps) => {
	return (
		<>
			<DropIndicator
				beforeId={id}
				column={column}
			/>

			<motion.div
				layout
				layoutId={id}
			>
				<div
					draggable='true'
					onDragStart={e => handleDragStart(e, { id, title, column })}
					className='cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing'
				>
					<p className='text-sm text-neutral-100'>{title}</p>
				</div>
			</motion.div>
		</>
	);
};

export default Card;

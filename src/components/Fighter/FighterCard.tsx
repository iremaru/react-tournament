import React, { useState } from 'react'
import { db_fighter } from '../../models/DragonBallTournament/dbTournamentModel'
import './fighter-card.scss';
export const FighterCard = ({ fighter, onClick }:
	{
		fighter: db_fighter,
		onClick: (isActive: boolean) => void
	}) => {
	const [isEnrrolled, setIsEnrrolled] = useState(false);

	const handleClick = () => {
		setIsEnrrolled(!isEnrrolled);
		onClick(!isEnrrolled);
	}


	return (
		<div className='fighter-room'>
			{isEnrrolled && (<div className='enroller-band'></div>)}
			<div
				className={`clickable fighter_card ${isEnrrolled && 'enrrolled'}`}
				onClick={handleClick}
			>
				<div className='fighter_info'>
					<div className='image' >
						{fighter.img && (<img src={fighter.img?.avatar.s} alt="" />)}
					</div>
					<p>{fighter.name}</p>
				</div>
				<div className='fighter_stats'>
					<p>
						{fighter.atackPower}
					</p>
					<p>
						{fighter.defense}
					</p>
					<p>
						{fighter.speed}
					</p>
				</div>
			</div>
		</div>
	)
}

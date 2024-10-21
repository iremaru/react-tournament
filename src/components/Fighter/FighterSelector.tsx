
import { getAllFighters } from '../../api/tournament/fighterRequest';
import { useTournament } from '../../context/Tournament/useTournament';
import { db_fighter } from '../../models/DragonBallTournament/dbTournamentModel';
import { FighterCard } from './FighterCard';

export const FighterSelector = () => {

	const { setNewParticipant, removeParticipant, } = useTournament();

	const availableFighters = getAllFighters();

	const toggleFighter = (fighter: db_fighter, isActive: boolean) => {
		return isActive ? setNewParticipant?.(fighter) : removeParticipant?.(fighter)
	}
	return (
		<div className='fighters'>
			{availableFighters.map((fighter: db_fighter, iFighter) =>
				<FighterCard
					key={`fighter${iFighter}`}
					fighter={fighter}
					onClick={(isActive) => toggleFighter(fighter, isActive)}
				/>
			)}
		</div>
	)
}

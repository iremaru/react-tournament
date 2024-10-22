
import { TournamentStages } from '@context/Tournament/TournamentContextModels';
import { getAllFighters } from '../../api/tournament/fighterRequest';
import { useTournament } from '../../context/Tournament/useTournament';
import { db_fighter } from '../../models/DragonBallTournament/dbTournamentModel';
import { FighterCard } from './FighterCard';

export const FighterSelector = () => {

	const { tournament, setNewParticipant, removeParticipant, } = useTournament();

	const availableFighters = getAllFighters();

	const toggleFighter = (fighter: db_fighter, isActive: boolean) => {
		return isActive ? setNewParticipant?.(fighter) : removeParticipant?.(fighter)
	}

	const checkCanShow = () => tournament.tournamentPhase === TournamentStages.NeedFighters || tournament.tournamentPhase === TournamentStages.CanBePlayed;

	return checkCanShow() && (
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

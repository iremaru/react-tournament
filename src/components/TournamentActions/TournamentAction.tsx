import { useTournament } from '@context/Tournament/useTournament';
import './tournament-actions.scss';
import { TournamentStages } from '@context/Tournament/TournamentContextModels';

export const TournamentAction = () => {
	const { tournament, setRounds } = useTournament();
	return (
		<div className='tournament-actions'>
			<button
				disabled={tournament.tournamentPhase !== TournamentStages.CanBePlayed}
				onClick={setRounds}
			>
				Set rounds
			</button>
			<button
				disabled={tournament.tournamentPhase !== TournamentStages.RoundsSetted &&
					tournament.tournamentPhase !== TournamentStages.BattleEnded}
			>
				Play next battle
			</button>
			<button
				disabled={tournament.tournamentPhase === TournamentStages.NeedFighters ||
					tournament.tournamentPhase === TournamentStages.CanBePlayed
				}
			>
				End tournament
			</button>
		</div>
	)
}

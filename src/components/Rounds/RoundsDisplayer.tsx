import { db_battle, db_round } from '../../models/DragonBallTournament/dbTournamentModel';
import { useTournament } from '../../context/Tournament/useTournament';

import './rounds.scss';
export const RoundsDisplayer = () => {
	const { tournament } = useTournament()

	return (
		<div className="rounds_room">
			<h2>Rounds</h2>
			<div className="rounds">
				{tournament.rounds.length > 0 &&
					tournament.rounds.map((round: db_round, iRound: number) => (
						<div className="round_column" key={`round_${iRound + 1}`}>
							{round.battles.map((battle: db_battle, iBattle: number) => (
								<div
									className="battle_card"
									key={`battle_${iRound + 1}_${iBattle + 1}`}
								>
									<p className='winner'>{battle.fighterA?.name}</p>
									<div className='text-vs'>vs</div>
									<p className='losser'>{battle.fighterB?.name}</p>
								</div>
							))}
						</div>
					))}
			</div>
		</div>
	);
};

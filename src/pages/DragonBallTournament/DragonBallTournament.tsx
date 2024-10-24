import { FC } from 'react';
import { RoundsDisplayer } from '../../components/Rounds/RoundsDisplayer';
import { TournamentProvider } from '../../context/Tournament/TournamentProvider';
import { FighterSelector } from '../../components/Fighter/FighterSelector';
import { BattleScene } from '../../components/Battle/BattleScene';
import './dragonBallTournament.scss';
import { TournamentAction } from '@component/TournamentActions/TournamentAction';

export const DragonBallTournament: FC = () => {

	return (
		<TournamentProvider>
			<section className='section_tournament'>
				<TournamentAction />
				<FighterSelector />
				<RoundsDisplayer />
				<BattleScene />
			</section>
		</TournamentProvider>
	);
};

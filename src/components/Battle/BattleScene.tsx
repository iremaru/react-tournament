import { useEffect } from 'react'
import { CharacterTalkbox } from './CharacterTalkbox';
import { BattleLogBox } from './BattleLogBox';
import { useToggle } from '../../hook/useToggle';
import { BattleState, useBattle } from '../../hook/useBattle';
import { useTournament } from '../../context/Tournament/useTournament';
import { db_battle } from '../../models/DragonBallTournament/dbTournamentModel';
import { SceneFighterInfo } from './SceneFighterInfo';
import { FighterSprite } from './FighterSprite';
import { FighterPosition } from '@models/Enums';

import './battle-scene.scss';
import { TournamentStages } from '@context/Tournament/TournamentContextModels';

const noImg = {
	avatar: {
		s: '',
		m: '',
		l: '',
	},
	sprite: {
		idle: ['',],
		atack: ['',],
		dead: ['',],
	}
}

const noBattle: db_battle = {
	fighterA: {
		name: '',
		isMale: false,
		img: noImg,
		health: 0,
		atackPower: 0,
		defense: 0,
		speed: 0
	},
	fighterB: {
		name: '',
		isMale: false,
		img: noImg,
		health: 0,
		atackPower: 0,
		defense: 0,
		speed: 0
	},
	winner: null
}

export const BattleScene = () => {
	const { tournament, setCurrentBattleLog, setBattleIsOver } = useTournament()
	const { currentBattle } = tournament;
	const [charIsTalking, toggleCharIsTalking] = useToggle(false); //TODO: Chara dialogs

	const [
		logHistory,
		winner,
		lossers,
		battleState,
		currentFighters,
		updateBattleSetting,
		startBattle,
		togglePause,
		actionState,
	] = useBattle(currentBattle?.battle || noBattle);

	useEffect(() => {
		updateBattleSetting(currentBattle?.battle || noBattle)
	}, [currentBattle?.battle])

	useEffect(() => {
		if (logHistory.length)
			setCurrentBattleLog(logHistory)
	}, [logHistory])

	useEffect(() => {
		if (battleState === BattleState.OVER)
			setBattleIsOver();
	}, [battleState])

	const ShouldShowScene = (tournamentState: TournamentStages) =>
		tournamentState === TournamentStages.BattleStarted || tournamentState === TournamentStages.BattleEnded;



	return ShouldShowScene(tournament.tournamentPhase) && (
		<div className='battle-scene'>
			<div className='btn-user-actions'>
				<button
					onClick={startBattle}
					disabled={battleState !== BattleState.READY}
				>Play</button>
				<button
					onClick={togglePause}
				>{battleState === BattleState.PAUSED ? 'Resume' : 'Pause'}</button>
				<button

				>AutoPlay</button>
			</div>
			<div className='battle-box'>
				{tournament.tournamentPhase === TournamentStages.BattleStarted
					? (
						<div className='main battle-ring'
							style={{ backgroundImage: `url(${currentBattle?.backgroundPath})` }}
						>
							<div className='player-info-box'>
								{currentFighters.map((fighter, index) =>
									<SceneFighterInfo
										fighter={fighter}
										key={`finfo${index}`} />
								)}
							</div>
							<div className='player-room'>
								<FighterSprite fighterAction={actionState.ActionsFromFighterA} position={FighterPosition.LEFT} />
								<FighterSprite fighterAction={actionState.ActionsFromFighterB} position={FighterPosition.RIGHT} />
							</div>
						</div>
					)
					: (
						<div className='main result-displayer'>
							{lossers.length > 0 && (
								<>
									<div className='card_result card_winner'>
										<p>{winner?.name}</p>
										<div className='img-container' style={{ backgroundImage: `url(${winner?.img.avatar.s})` }}>
										</div>
									</div>
									<div className='card_result card_losser'>
										<div className='img-container' style={{ backgroundImage: `url(${lossers[0]?.img.avatar.s})` }}>
										</div>
										<p>{lossers[0]?.name}</p>
									</div>
								</>
							)
							}
						</div>
					)}
				<div className='battle-log'>
					{
						charIsTalking
							? (<CharacterTalkbox
								onEndTalk={() => toggleCharIsTalking()} />)
							: (<BattleLogBox />)
					}
				</div>
			</div>
		</div>

	)
}

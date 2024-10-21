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
	const { tournament, setCurrentBattleLog } = useTournament()
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

	return (
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
			{currentFighters.length > 1 &&
				(
					<div className='battle-box'>
						<div className='logo-dg'>
							<img src="./../../../public/Dragon-Ball-Z-LogoTitle.png" alt="" />
							{lossers.length > 0 && (
								<>
									{
										lossers.map((losser, i) => (
											<div className='fighter-losser'
												key={`losser-display${i}`}>
												<img src={losser.img.avatar.s} />
											</div>
										))}
									<div className='fighter-winner'>
										<img src={winner?.img.avatar.s} /> //TODO: SCSS FOR NO-WINNER CASE
									</div>
								</>
							)
							}
						</div>
						<div className='battle-ring'
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
						<div className='battle-log'>
							{
								charIsTalking
									? (<CharacterTalkbox
										onEndTalk={() => toggleCharIsTalking()} />)
									: (<BattleLogBox />)
							}
						</div>
					</div>
				)
			}
		</div>

	)
}

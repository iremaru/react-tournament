import { useEffect, useState } from 'react'
import { db_battle, db_fighter } from '../models/DragonBallTournament/dbTournamentModel';
import { Fighter } from '../models/DragonBallTournament/Fighter';
import { LogActions, ILogHistory } from '../context/Tournament/TournamentContextModels';
import { FighterActionState } from '@models/Enums';

export type FighterAction = {
	fighter: db_fighter,
	action: FighterActionState,
}

export type ActionsInTurn = {
	ActionsFromFighterA: FighterAction;
	ActionsFromFighterB: FighterAction;
}


export const useBattle = (battle: db_battle) => {
	const [actionsState, setActionsState] = useState<ActionsInTurn>({
		ActionsFromFighterA: {
			fighter: battle.fighterA,
			action: FighterActionState.IDLE,
		},
		ActionsFromFighterB: {
			fighter: battle.fighterB,
			action: FighterActionState.IDLE,
		}
	})
	const [logHistory, setLogHistory] = useState<ILogHistory[]>([])
	const [battleInfo, setBattleInfo] = useState(battle);
	const [firstIsAttacker, setFirstIsAttacker] = useState(true);
	const [battleState, setBattleState] = useState<BattleState>(
		BattleState.OVER
	);
	const [victoryCause, setVictoryCause] = useState<VictoryCondition>(
		VictoryCondition.NO_VICTORY
	);
	const [currentFighters, setCurrentFighters] = useState<Fighter[]>([]);
	const [winner, setWinner] = useState<db_fighter | null>(null);
	const [lossers, setLossers] = useState<db_fighter[]>([]);


	const updateBattleSetting = (battle: db_battle) => {
		if (battleState === BattleState.TURN_A) return;
		const fighterA = battle.fighterA.name;
		const fighterB = battle.fighterB.name;

		const battleIsForReal: boolean = fighterA !== '' && fighterB != '';
		if (battleIsForReal) setLogHistory([
			{
				actorName: 'Narrador',
				actionType: LogActions.ANNOUNCEMENT,
				actionText: `Atención, por favor. Pronto dará comienzo a la batalla entre ${fighterA} y ${fighterB}. Aquellos que quieran presentar el combate, acerquense al ring y guarden silencio.`,
				actionResult: `Todos los participantes y algunos espectadores casuales se acercaron al ring.`,
			}]);
		setActionsState({
			ActionsFromFighterA: {
				fighter: battle.fighterA,
				action: FighterActionState.IDLE,
			},
			ActionsFromFighterB: {
				fighter: battle.fighterB,
				action: FighterActionState.IDLE,
			}
		}
		)
		setBattleInfo(battle);
		setWinner(null);
		setLossers([]);
		setVictoryCause(VictoryCondition.NO_VICTORY);
		setBattleState(battleIsForReal ? BattleState.SETTED : BattleState.UNSETTED);
	}

	const setFighters = () => {
		const firstAttacker = battleInfo.fighterA.speed > battleInfo.fighterB.speed ? battleInfo.fighterA : battleInfo.fighterB;
		const firstDefender = firstAttacker === battleInfo.fighterA ? battleInfo.fighterB : battleInfo.fighterA;
		setCurrentFighters([new Fighter(firstAttacker), new Fighter(firstDefender)]);

		console.log("First attacker ", firstAttacker);
		console.log("First defender ", firstDefender);
		setBattleState(BattleState.READY);
	}

	//BattleActions
	const getRoles = () => {
		return {
			attacker: currentFighters[firstIsAttacker ? 0 : 1],
			defender: currentFighters[firstIsAttacker ? 1 : 0],
		};
	}

	const toggleTurn = () => {

		const haveWeAWinner = checkWinner();
		if (!haveWeAWinner && battleState !== BattleState.OVER &&
			victoryCause === VictoryCondition.NO_VICTORY
		) {
			setBattleState(battleState === BattleState.TURN_A ? BattleState.TURN_B : BattleState.TURN_A);
			setFirstIsAttacker(!firstIsAttacker);
		}

	}

	const nextTurn = () => {
		console.log('INICIANDO NUEVO TURNO')
		const { attacker, defender } = getRoles()
		setActionsState({
			ActionsFromFighterA: {
				fighter: battle.fighterA,
				action: attacker.getName() === battle.fighterA.name ? FighterActionState.ATTACKING : FighterActionState.DEFENDING,
			},
			ActionsFromFighterB: {
				fighter: battle.fighterB,
				action: defender.getName() === battle.fighterB.name ? FighterActionState.DEFENDING : FighterActionState.ATTACKING,
			}
		})

		setTimeout(() => {
			const { attackText, resultText, resultType } = attacker.narrateAttack(defender);
			setLogHistory((old) =>
				[...old,
				{
					actorName: attacker.getName(),
					actionType: LogActions.ATTACK,
					actionText: attackText,
					actionResult: resultText,
					logResultType: resultType,
				}
				]
			)
			toggleTurn();
		}, 2000);

	};

	const checkWinner = () => {
		const lossers = currentFighters.filter(fighter => fighter.getHealth() <= 0);

		if (lossers.length) {

			//Losser
			setLossers(lossers.map(fighter => fighter.getInfo()))

			//Winner
			const winner = lossers.length === 2
				? null
				: currentFighters.filter(fighter => fighter != lossers[0])[0].getInfo();
			battle.winner = winner;
			setWinner(winner)
			setVictoryCause(
				winner ? VictoryCondition.KO : VictoryCondition.DOUBLE_KO
			);

			onBattleEnd(winner, lossers);

			return true;
		}
		return false;
	};

	//Battleloop
	const startBattle = () => {
		if (battleState !== BattleState.READY) return; setLogHistory((old) =>
			[...old,
			{
				actorName: 'Narrador',
				actionType: LogActions.ANNOUNCEMENT,
				actionText: `¡Que comience la batalla!`,
				actionResult: ''
			}
			]
		);
		setBattleState(BattleState.TURN_A);
	};

	const togglePause = () => {
		if (battleState === BattleState.PAUSED) {
			setBattleState(BattleState.TURN_A)
			nextTurn();
		} else if (battleState === BattleState.TURN_A) {
			setBattleState(BattleState.PAUSED);
		}
	}

	const onBattleEnd = (winner: db_fighter | null, lossers: Fighter[]) => {
		setBattleState(BattleState.OVER);
		const winnerName = winner?.name;
		const winnerIsMale = winner?.isMale;
		const losserName = lossers[0]?.getName();
		setLogHistory((old) =>
			[...old,
			{
				actorName: 'Narrador',
				actionType: LogActions.ANNOUNCEMENT,
				actionText: `¡Maravilloso combate! Todos hemos podido presenciar la indiscutible victoria de ${winnerName} sobre ${losserName}`,
				actionResult: `${losserName} se marcha del ring arrastrando los pies mientras ${winnerName} sonríe victorios${winnerIsMale ? 'o' : 'a'}.`
			}
			]
		);
	};

	useEffect(() => {
		console.log('------------ CAMBIANDO ESTADO');

		switch (battleState) {
			case BattleState.SETTED:
				setFighters();
				break;
			case BattleState.TURN_A:
				console.log('TURNO A')
				nextTurn();
				break;
			case BattleState.TURN_B:
				console.log('TURNO B')
				nextTurn();
				break;
			/* case BattleState.STARTING:
				startBattle();
				break;
				*/

			default:
				break;
		}

	}, [battleState])

	return [
		logHistory,
		winner,
		lossers,
		battleState,
		currentFighters,
		updateBattleSetting,
		startBattle,
		togglePause,
		actionsState,
	] as const;
}

export enum BattleState {
	UNSETTED,
	SETTED,
	READY,
	STARTING,
	TURN_A,
	TURN_B,
	PAUSED,
	OVER,
}

export enum VictoryCondition {
	NO_VICTORY,
	DOUBLE_KO,
	KO,
	PULL_OUT, //Abandono
}

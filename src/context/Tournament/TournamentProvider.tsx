import { useReducer, ReactNode, createContext } from 'react';
import { TournamentReducer } from './TournamentReducer';
import { db_battle, db_fighter, db_round } from '../../models/DragonBallTournament/dbTournamentModel';
import { ICharaDialog, CurrentMatchType, TOURNAMENT_CONTEXT_ENUM, TournamentContexType, ILogHistory } from './TournamentContextModels';
import { initialState } from './TournamentInitialState';
import { getRandomBackground } from '@public/ring-background/';

export const TournamentContext = createContext<TournamentContexType | null>(null);

export const TournamentProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(TournamentReducer, initialState);

	const setNewParticipant = (newFighter: db_fighter) => {
		const participants: db_fighter[] = [...state.participants, newFighter];

		setTournamentCanBePlayed(participants.length)

		dispatch({
			type: TOURNAMENT_CONTEXT_ENUM.SET_PARTICIPANTS,
			payload: participants,
		});
	};

	const removeParticipant = (removedFighter: db_fighter) => {
		const participants: db_fighter[] = [
			...state.participants.filter(
				(participant: db_fighter) => participant.name != removedFighter.name
			),
		];

		setTournamentCanBePlayed(participants.length)

		dispatch({
			type: TOURNAMENT_CONTEXT_ENUM.SET_PARTICIPANTS,
			payload: participants,
		});
	};

	const setRounds = (rounds: db_round[]) => {

		dispatch({
			type: TOURNAMENT_CONTEXT_ENUM.SET_ROUNDS,
			payload: rounds,
		});

		if (rounds.length) {
			console.log('Asignando match')
			const firstBattle: CurrentMatchType = {
				backgroundPath: getRandomBackground(),
				battle: rounds[state.currentRound].battles[0],
				logHistory: [],
			}
			setCurrentBattle(firstBattle);

		}
	}

	const setCurrentBattle = (battle: CurrentMatchType) => {

		dispatch({
			type: TOURNAMENT_CONTEXT_ENUM.SET_CURRENT_BATTLE,
			payload: battle,
		});
	}

	const updateCurrentBattle = ({
		battle,
		logHistory,
	}: {
		battle?: db_battle,
		logHistory?: ICharaDialog[],
	}) => {
		if (state.currentBattle) {
			dispatch({
				type: TOURNAMENT_CONTEXT_ENUM.SET_CURRENT_BATTLE,
				payload: {
					...state.currentBattle,
					battle: battle || state.currentBattle.battle,
					logHistory: logHistory || state.currentBattle.logHistory
				},
			});

		}
	}

	const setCurrentBattleLog = (logs: ILogHistory[]) => {
		if (state.currentBattle) {

			dispatch({
				type: TOURNAMENT_CONTEXT_ENUM.SET_CURRENT_BATTLE,
				payload: {
					...state.currentBattle,
					logHistory: [...logs]
				},
			});

		}
	}
	const updateCurrentBattleLog = (newDialog: ICharaDialog) => {
		if (state.currentBattle) {

			dispatch({
				type: TOURNAMENT_CONTEXT_ENUM.SET_CURRENT_BATTLE,
				payload: {
					...state.currentBattle,
					logHistory: [
						...state.currentBattle.logHistory,
						newDialog
					]
				},
			});

		}
	}


	const setTournamentCanBePlayed = (fighterCount: number) => dispatch({
		type: TOURNAMENT_CONTEXT_ENUM.SET_CAN_BE_PLAYED,
		payload: fighterCount > 0 &&
			(fighterCount & (fighterCount - 1)) === 0 &&
			Math.log2(fighterCount) !== 0,
	})


	return (
		<TournamentContext.Provider
			value={{
				tournament: state,
				setNewParticipant,
				removeParticipant,
				setRounds,
				setCurrentBattle,
				updateCurrentBattle,
				setCurrentBattleLog,
				updateCurrentBattleLog,
			}}
		>
			{children}
		</TournamentContext.Provider>
	);
};



const getRounds = (selectedFighters: db_fighter[]) => {
	const totalRounds = Math.log2(selectedFighters.length);
	const battleCountInFirstRound = selectedFighters.length / 2;
	const participants = [...selectedFighters];

	const { battles: battlesInFirstRound } = getBattles(
		battleCountInFirstRound,
		participants
	);

	const noneFighter: db_fighter = {
		name: '',
		isMale: false,
		health: 0,
		atackPower: 0,
		defense: 0,
		speed: 0,
	};

	const rounds: db_round[] = [];
	for (
		let i = 0, encounters = battleCountInFirstRound;
		i < totalRounds;
		i++, encounters /= 2
	) {
		rounds.push({
			encounters: encounters,
			battles: new Array(encounters).fill(noneFighter, 0, encounters),
			winners: [],
		});
	}

	rounds[0] = {
		...rounds[0],
		battles: battlesInFirstRound,
	};

	return rounds;
};

const getBattles = (totalBattles: number, participants: db_fighter[]) => {
	const battles: db_battle[] = [];
	let leftOver: db_fighter[] = [...participants];
	for (let i = 1; i <= totalBattles * 2; i++) {
		const luckyIndex = Math.floor(Math.random() * leftOver.length);
		const selected = leftOver[luckyIndex];
		leftOver = leftOver.filter((member) => member !== selected);
		if (i % 2 === 0) {
			const current = i / 2 - 1;
			battles[current].fighterB = selected;
		} else {
			battles.push({
				fighterA: selected,
				fighterB: selected,
				winner: null,
			});
		}
	}

	return { battles, leftOver };
};

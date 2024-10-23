import { db_battle, db_fighter, db_round } from "../../models/DragonBallTournament/dbTournamentModel";

export enum TOURNAMENT_CONTEXT_ENUM {
	//SETTERS
	SET_LOSSERS,
	SET_PREVIUS_BATTLES,
	SET_NEXT_BATTLES,
	SET_CURRENT_BATTLE,
	SET_ROUNDS,
	SET_PARTICIPANTS,
	SET_CURRENT_PHASE,
	//UPDATERS
	UPDATE_LOSSERS,
	UPDATE_PREVIUS_BATTLES,
	UPDATE_NEXT_BATTLES,
	UPDATE_CURRENT_BATTLE,
	UPDATE_ROUNDS,
	UPDATE_PARTICIPANTS,
	//DELETERS
	DELETE_LOSSERS,
	DELETE_PREVIUS_BATTLES,
	DELETE_NEXT_BATTLES,
	DELETE_CURRENT_BATTLE,
	DELETE_ROUNDS,
	DELETE_PARTICIPANTS,
}

export enum TournamentStages {
	NeedFighters,
	CanBePlayed,
	RoundsSetted,
	BattleStarted,
	BattleEnded,
	RoundEnded,
	TournamentEnded,
}

export type TournamentAction =
	| {
		type: TOURNAMENT_CONTEXT_ENUM.SET_PARTICIPANTS;
		payload: db_fighter[];
	}
	| {
		type: TOURNAMENT_CONTEXT_ENUM.SET_ROUNDS;
		payload: db_round[];
	}
	| {
		type: TOURNAMENT_CONTEXT_ENUM.SET_NEXT_BATTLES;
		payload: db_battle[];
	}
	| {
		type: TOURNAMENT_CONTEXT_ENUM.SET_CURRENT_PHASE;
		payload: TournamentStages;
	}
	| {
		type: TOURNAMENT_CONTEXT_ENUM.SET_CURRENT_BATTLE;
		payload: CurrentMatchType;
	};

export enum LogActions {
	ANNOUNCEMENT = 'announcement',
	ATTACK = 'attack',
	DIALOG = 'dialog',
}

export enum LogAttackResult {
	dodge,
	dead,
	fail,
	right,
}

export interface ILogHistory {
	actorName: string,
	actionType: LogActions,
	actionText: string;
	actionResult: string;
}

export interface ILogAttack extends ILogHistory {
	logResultType: LogAttackResult;
};
export interface ICharaDialog extends ILogHistory {
	fighter: db_fighter;
	text: string;
};

export type CurrentMatchType = {
	backgroundPath: string;
	battle: db_battle;
	logHistory: ILogHistory[];
};

export interface ITournament {
	participants: db_fighter[];
	tournamentPhase: TournamentStages;
	currentRound: number;
	rounds: db_round[];
	currentBattle: CurrentMatchType | null;
	nextBattles: db_battle[];
	previousBattles: db_battle[];
	lossers: db_fighter[];
}

export type TournamentContexType = {
	tournament: ITournament;
	setNewParticipant: (newFighter: db_fighter) => void;
	removeParticipant: (removedFighter: db_fighter) => void;
	setCurrentBattle: (battle: CurrentMatchType) => void;
	updateCurrentBattle: ({
		battle,
		logHistory,
	}: {
		battle?: db_battle,
		logHistory?: ICharaDialog[],
	}) => void;
	setCurrentBattleLog: (logs: ILogHistory[]) => void;
	updateCurrentBattleLog: (newDialog: ICharaDialog) => void;
	setRounds: () => void;
	startNextBattle: () => void;
	setBattleIsOver: () => void;
	cancelTournament: () => void;
}

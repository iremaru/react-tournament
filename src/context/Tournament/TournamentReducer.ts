import { TOURNAMENT_CONTEXT_ENUM, ITournament, TournamentAction } from "./TournamentContextModels";

export const TournamentReducer = (
	state: ITournament,
	action: TournamentAction
): ITournament => {
	switch (action.type) {
		case TOURNAMENT_CONTEXT_ENUM.SET_PARTICIPANTS:
			return {
				...state,
				participants: [...action.payload],
			};
		case TOURNAMENT_CONTEXT_ENUM.SET_CAN_BE_PLAYED:
			return {
				...state,
				torunamentCanBePlayed: action.payload,
			};
		case TOURNAMENT_CONTEXT_ENUM.SET_ROUNDS:
			return {
				...state,
				rounds: [...action.payload],
			};
		case TOURNAMENT_CONTEXT_ENUM.SET_NEXT_BATTLES:
			return {
				...state,
				nextBattles: [...action.payload],
			};
		case TOURNAMENT_CONTEXT_ENUM.SET_CURRENT_BATTLE:
			return {
				...state,
				currentBattle: { ...action.payload },
			};
		default:
			return state;
	}
};

import { ITournament } from "./TournamentContextModels";

export const initialState: ITournament = {
	participants: [],
	currentRound: 0,
	rounds: [],
	currentBattle: null,
	nextBattles: [],
	previousBattles: [],
	lossers: [],
};
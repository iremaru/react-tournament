import { ITournament } from "../Tournament/TournamentContextModels";


export const initialState: ITournament = {
	participants: [],
	rounds: [],
	currentBattle: null,
	nextBattles: [],
	previousBattles: [],
	lossers: [],
};
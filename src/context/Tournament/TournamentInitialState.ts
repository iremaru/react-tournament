import { ITournament, TournamentStages } from "./TournamentContextModels";

export const initialState: ITournament = {
	participants: [],
	tournamentPhase: TournamentStages.NeedFighters,
	currentRound: 0,
	rounds: [],
	currentBattle: null,
	nextBattles: [],
	previousBattles: [],
	lossers: [],
};
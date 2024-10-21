import { useContext } from 'react'
import { TournamentContext } from './TournamentProvider';

export const useTournament = () => {
	const tournamentContext = useContext(TournamentContext);
	if (!tournamentContext) {
		throw new Error('TournamentContext must be used within a TournamentProvider');
	}
	return {
		...tournamentContext
	}
}

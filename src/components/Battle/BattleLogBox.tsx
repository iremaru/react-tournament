

import './battle-log-box.scss'
import { ILogAttack, LogActions } from '@context/Tournament/TournamentContextModels'
import { useTournament } from '@context/Tournament/useTournament';
export const BattleLogBox = () => {
	const { tournament } = useTournament();

	return (
		<div className='log-box'>
			{
				tournament.currentBattle?.logHistory.map((log, index) => {
					const attackInfo = (log as ILogAttack);
					const cssClassName = log.actionType === LogActions.ATTACK ? 'text_action' : 'text_dialog';
					return (
						<div
							key={`log${index}${log.actorName}${log.actionType}`}
							log-action={log.actionType}
							className='log'
						>
							<p className='text_actor'>{log.actorName}</p>
							<div className='log_info'>
								<p className={`text_long ${cssClassName}`}>{log.actionText}</p>
								{log.actionResult.length > 0 &&
									<p attack-result={attackInfo?.logResultType || ''} className='text_long text_result'>{log.actionResult}</p>
								}
							</div>
						</div>
					)
				}).reverse()
			}
			{/* <div log-action={LogActions.ANNOUNCEMENT} className='log'>
				<p className='text_actor'>Anuncio</p>
				<p className='text_long text_dialog'>Atención. Atención. El torneo está a punto de comenzar</p>
				<p className='text_long text_result'>Todos los participantes se acercan al ring.</p>
			</div>
			<div log-action={LogActions.ATTACK} className='log'>
				<p className='text_actor'>Vegeta</p>
				<p className='text_long text_action'>Atacó con todas sus fuerzas a Goku.</p>
				<p className='text_long text_result'>Goku recibió 10 de daño.</p>
			</div> */}
		</div>
	)
}



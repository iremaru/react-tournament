import { Fighter } from "src/models/DragonBallTournament/Fighter"


export const SceneFighterInfo = ({ fighter }: { fighter: Fighter }) => {
	const name = fighter.getName();
	const speed = fighter.getSpeed();
	const { img, atackPower, defense } = fighter.getInfo();
	return (
		<div className='player-info'>
			<div className='player-data'>
				<img className='player-avatar'
					src={img?.avatar.m}
					alt={`${name}'s avatar`}
					title={`${name}'s avatar`}
				/>
				<div className='info'>
					<p title={name}><span className='text-title' title='Player'></span> {name}</p>
					<p className='player-attributes'>
						<span className='text-title' title='Power'>P:</span> {atackPower}{' '}
						<span className='text-title' title='Speed'>S:</span> {speed}{' '}
						<span className='text-title' title='Defense'>D:</span> {defense}
					</p>
				</div>
			</div>
			<div className='health-bar'>
				<div
					style={{ width: `${fighter.getHealth() < 0 ? 0 : fighter.getHealth()}%` }}
					className='health-content' />
			</div>
		</div>)
}

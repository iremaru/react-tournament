
import { FighterActionState, FighterPosition } from '@models/Enums';
import './fighter-sprite.scss';
import { FighterAction } from "src/hook/useBattle";



export const FighterSprite = ({ fighterAction, position }: { fighterAction: FighterAction, position: FighterPosition }) => {
	const { dead, atack, idle } = fighterAction.fighter.img.sprite;
	const getAnimation = () => {
		switch (fighterAction.action) {
			case FighterActionState.ATTACKING:
				return atack;
			case FighterActionState.DEAD:
				return dead;
			default:
				return idle;
		}
	}


	return (
		<div className={`fighter-sprite ${fighterAction.action}_${position}`}>
			<img
				src={getAnimation()[0]}
			/>
		</ div>
	)
}

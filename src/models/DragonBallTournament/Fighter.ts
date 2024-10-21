import { LogAttackResult } from "../../context/Tournament/TournamentContextModels";
import { FighterActionState } from "../Enums";
import { db_fighter } from "./dbTournamentModel";


export class Fighter {
	private health = 100;
	private info;

	currentAction = FighterActionState.IDLE;

	constructor(setting: db_fighter) {
		this.info = setting;
	}

	getName = () => this.info.name;
	getSpeed = () => this.info.speed;
	getHealth = () => this.health;
	getIniciative = () => this.info.speed;
	getInfo = () => this.info;


	private getDamage(attackPower: number) {
		const canDodge = Math.random() < .2;
		const damage = attackPower - this.info.defense > 0
			? attackPower - this.info.defense
			: attackPower * .1;
		const willDead = this.health - damage <= 0;
		const isInnefective = (this.info.defense / 100) * 20 > attackPower;

		if (!canDodge) this.health -= damage;

		return {
			resultType: canDodge ? LogAttackResult.dodge : willDead ? LogAttackResult.dead : LogAttackResult.right,
			damagePoints: damage,
			willDead,
			isInnefective,
		};
	}

	private getAttackPoints(): { attackPoints: number, powerPercent: number } {
		const randomAttack = Math.random() * this.info.atackPower;

		return {
			attackPoints: randomAttack,
			powerPercent: (randomAttack / this.info.atackPower) * 100,
		}
	}

	narrateAttack(toWho: Fighter) {
		this.currentAction = FighterActionState.ATTACKING;
		let text = `${this.info.name} atacó a ${toWho.getName()}`
		const { attackPoints, powerPercent } = this.getAttackPoints();


		console.log(`INTENCIÓN ASESINA ${powerPercent}: capacidad ${this.info.atackPower}, puntos de ataque: ${attackPoints}`)

		if (powerPercent > 90) {
			text = text.concat(' con intención de arrancarle la cabeza.');
		} else if (powerPercent > 50) {
			text = text.concat(' intentando derribarlo.');
		} else if (powerPercent > 30) {
			text = text.concat(' torpemente.');
		} else {
			text = text.concat(' con la intención asesina de cachorrito de peluche');
		}

		return {
			attackText: text,
			...toWho.getNarratedDamage(attackPoints),
		};
	}

	getNarratedDamage(attackPower: number) {
		const { damagePoints, willDead, isInnefective, resultType } = this.getDamage(attackPower);
		const { name, isMale } = this.info;

		let resultText: string = `${name} fue atacad${isMale ? 'o' : 'a'} con una fuerza de ${Math.ceil(attackPower)}`;

		switch (resultType) {
			case LogAttackResult.dead:
				this.currentAction = FighterActionState.DEAD;
				resultText += ` y${isInnefective ? ` fue derrotad${isMale ? 'o' : 'a'} ridículamente por este capirotazo afortunado` : ', naturalmente, la guiñó como un conejo'}.`
				break;
			case LogAttackResult.dodge:
				this.currentAction = FighterActionState.DEFENDING;
				resultText = resultText.concat(`, pero consiguió esquivar ${willDead ? 'este golpe mortal' : isInnefective ? 'al molesto mosquito' : 'el golpe'}.`)
				break;
			case LogAttackResult.right:
				this.currentAction = FighterActionState.GETTING_DAMAGE;
				resultText = resultText.concat(`. Pero gracias a su defensa, sólo recibió ${Math.ceil(damagePoints)} puntos de daño.`)
				break;
			default:
				break;
		}

		console.log('RESULT TIPE: ', resultType);
		console.log('RESULT TEXT: ', resultText);

		return {
			resultText,
			resultType,
		}
	}

}
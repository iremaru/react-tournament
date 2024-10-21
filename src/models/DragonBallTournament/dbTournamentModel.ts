export type db_fighter = {
	name: string;
	isMale: boolean;
	img: {
		avatar: {
			s: string;
			m: string;
			l: string;
		},
		sprite: {
			idle: string[];
			atack: string[];
			dead: string[];
		}
	}
	health: number;
	atackPower: number;
	defense: number;
	speed: number;
};

export type db_battle = {
	fighterA: db_fighter;
	fighterB: db_fighter;
	winner: db_fighter | null;
};

export type db_round = {
	encounters: number;
	battles: db_battle[];
	winners: db_fighter[];
};

export type db_tournnament = {
	participants: db_fighter[];
	rounds: db_round[];
};
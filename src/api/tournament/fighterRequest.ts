import { db_fighter } from "../../models/DragonBallTournament/dbTournamentModel";

export const getAllFighters: () => db_fighter[] = () => ([
	{
		name: 'Goku',
		isMale: true,
		img: {
			avatar: {
				s: "/public/fighters/fighter_goku_avatar_L.webp",
				m: "/public/fighters/fighter_goku_avatar_L.webp",
				l: "/public/fighters/fighter_goku_avatar_L.webp",
			},
			sprite: {
				idle: ["/public/fighters/fighter_goku_avatar_L.webp",],
				atack: ["/public/fighters/fighter_goku_avatar_L.webp",],
				dead: ["/public/fighters/fighter_goku_avatar_L.webp",]
			},
		},
		health: 100,
		atackPower: 9000,
		defense: 143,
		speed: 329,
	},
	{
		name: 'Vegeta',
		isMale: true,
		img: {
			avatar: {
				s: "/public/fighters/fighter_vegeta_avatar_L.webp",
				m: "/public/fighters/fighter_vegeta_avatar_L.webp",
				l: "/public/fighters/fighter_vegeta_avatar_L.webp",
			},
			sprite: {
				idle: ["/public/fighters/fighter_vegeta_avatar_L.webp",],
				atack: ["/public/fighters/fighter_vegeta_avatar_L.webp",],
				dead: ["/public/fighters/fighter_vegeta_avatar_L.webp",]
			},
		},
		health: 100,
		atackPower: 439,
		defense: 562,
		speed: 329,
	},
	{
		name: 'Son Gohan',
		isMale: true,

		img: {
			avatar: {
				s: "/public/fighters/fighter_songohan_avatar_M.webp",
				m: "/public/fighters/fighter_songohan_avatar_M.webp",
				l: "/public/fighters/fighter_songohan_avatar_M.webp",
			},
			sprite: {
				idle: ["/public/fighters/fighter_songohan_avatar_M.webp",],
				atack: ["/public/fighters/fighter_songohan_avatar_M.webp",],
				dead: ["/public/fighters/fighter_songohan_avatar_M.webp",]
			},
		},
		health: 100,
		atackPower: 57,
		defense: 32,
		speed: 45,
	},
	{
		name: 'Chichi',
		isMale: false,
		img: {
			avatar: {
				s: "/public/fighters/fighter_chichi_avatar_L.webp",
				m: "/public/fighters/fighter_chichi_avatar_L.webp",
				l: "/public/fighters/fighter_chichi_avatar_L.webp",
			},
			sprite: {
				idle: ["/public/fighters/fighter_chichi_avatar_L.webp",],
				atack: ["/public/fighters/fighter_chichi_avatar_L.webp",],
				dead: ["/public/fighters/fighter_chichi_avatar_L.webp",]
			},
		},
		health: 100,
		atackPower: 9,
		defense: 14,
		speed: 10,
	},
	{
		name: 'Krillin',
		isMale: true,
		img: {
			avatar: {
				s: "/public/fighters/fighter_krilin_avatar_M.webp",
				m: "/public/fighters/fighter_krilin_avatar_M.webp",
				l: "/public/fighters/fighter_krilin_avatar_M.webp",
			},
			sprite: {
				idle: ["/public/fighters/fighter_krilin_avatar_M.webp",],
				atack: ["/public/fighters/fighter_krilin_avatar_M.webp",],
				dead: ["/public/fighters/fighter_krilin_avatar_M.webp",]
			},
		},
		health: 100,
		atackPower: 21,
		defense: 10,
		speed: 4,
	},
	{
		name: 'Pikolo',
		isMale: true,
		img: {
			avatar: {
				s: "/fighters/fighter_pikolo.webp",
				m: "/fighters/fighter_pikolo.webp",
				l: "/public/fighters/fighter_pikolo.webp",
			},
			sprite: {
				idle: ["/public/fighters/fighter_pikolo.webp",],
				atack: ["/public/fighters/fighter_pikolo.webp",],
				dead: ["/public/fighters/fighter_pikolo.webp",]
			},
		},
		health: 100,
		atackPower: 75,
		defense: 23,
		speed: 54,
	},
]);
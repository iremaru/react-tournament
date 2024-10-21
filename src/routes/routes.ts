import { FC } from 'react';
import { MemberRoller } from '../pages/MemberRoller/MemberRoller';
import { DragonBallTournament } from '../pages/DragonBallTournament/DragonBallTournament';

export type CustomRoute = {
	path: string;
	Component: FC;
	sectionTitle: string;
	btnTitle: string;
	title: string;
};

export const routes: CustomRoute[] = [
	{
		path: '/',
		Component: DragonBallTournament,
		sectionTitle: 'Home',
		btnTitle: 'Home',
		title: 'Home',
	},
	{
		path: '/tournament',
		Component: DragonBallTournament,
		sectionTitle: 'Dragon Ball Tournament',
		btnTitle: 'Dragon Ball',
		title: 'DragonBallTournament',
	},
	{
		path: '/santaroll',
		Component: MemberRoller,
		sectionTitle: 'Santa roller',
		btnTitle: 'Santa roller',
		title: 'SantaRoller',
	},
];

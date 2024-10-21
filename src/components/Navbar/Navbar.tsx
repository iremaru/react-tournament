import { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.scss';
import { CustomRoute, routes } from '../../routes/routes';

export const Navbar: FC = () => {
	const [currentSection, setCurrentSection] = useState<string>('Main');

	return (
		<div className="main-navbar">
			<h1 className='section-title'>{currentSection}</h1>
			<div className='navbar-routes'>
				{
					routes.map((route: CustomRoute, index: number) =>
						<NavLink
							key={`${index}link_${route.title}`}
							className={({ isActive }) => `nav-link ${isActive && 'active'}`}
							to={route.path}
							onClick={() => setCurrentSection(route.sectionTitle)}
						>
							{route.btnTitle}
						</NavLink>
					)
				}
			</div>
			<hr />
		</div>
	);
};

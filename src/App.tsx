import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar/Navbar.tsx';
import { routes } from './routes/routes.ts';

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				{routes.map((route, i) =>
					<Route
						key={`rout${i}`}
						path={route.path}
						element={<route.Component />}
					/>
				)}
			</Routes>
		</>
	);
}
export default App;

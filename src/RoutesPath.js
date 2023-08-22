import {
	BrowserRouter as Router,
	Routes,
	Route,
	createBrowserRouter,
	createRoutesFromElements
} from "react-router-dom";
import Header from './components/Header';
import NotesListPage from './components/Pages/NoteListPage';

let rootRoute = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<NotesListPage />} />
			{/* <Header /> */}
			{/* <Route path="/">
					<Route
					path="dashboard"
					element={<Dashboard />}
					loader={({ request }) =>
						fetch("/api/dashboard.json", {
							signal: request.signal,
						})
					}
				/>
				<Route element={<AuthLayout />}>
					<Route
						path="login"
						element={<Login />}
						loader={redirectIfUser}
					/>
					<Route path="logout" action={logoutUser} />
				</Route>
			</Route> */}
		</>


	)
);

export default rootRoute;
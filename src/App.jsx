import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import VideosPage from "./pages/VideosPage";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import ChallengesPage from "./pages/ChallengesPage";
import Layout from "./Layout";
import "./App.scss";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route
				path="/"
				element={<Layout />}>
				<Route
					path=""
					element={<HomePage />}
				/>
				<Route
					path="/videos"
					element={<VideosPage />}
				/>
				<Route
					path="/leaderboard"
					element={<LeaderBoardPage />}
				/>
				<Route
					path="/challenges"
					element={<ChallengesPage />}
				/>
			</Route>
		</>
	)
);

function App() {
	return (
		<main>
			<RouterProvider router={router} />
		</main>
	);
}

export default App;

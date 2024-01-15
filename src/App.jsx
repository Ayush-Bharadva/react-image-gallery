import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import VideosPage from "./pages/VideosPage";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import ChallengesPage from "./pages/ChallengesPage";
import Layout from "./Layout";
import "./App.scss";
import SearchProvider from "./context/SearchProvider";
import SearchPage from "./pages/SearchePage";

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
			<Route
				path="search/:query"
				element={<SearchPage />}
			/>
		</>
	)
);

function App() {
	return (
		<SearchProvider>
			<main>
				<RouterProvider router={router} />
			</main>
		</SearchProvider>
	);
}

export default App;

import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import "./styles/Global.scss";
import HomePage from "./pages/homepage/HomePage";
import VideosPage from "./pages/VideosPage";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import ChallengesPage from "./pages/ChallengesPage";
import Layout from "./Layout";
import SearchProvider from "./context/SearchProvider";
import SearchPage from "./pages/SearchePage";
import "./App.scss";
import Photo from "./pages/Photo";

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
			<Route
				path="photo/:query"
				element={<Photo />}
			/>
		</>
	)
);

function App() {
	return (
		<SearchProvider>
			<RouterProvider router={router} />
		</SearchProvider>
	);
}

export default App;

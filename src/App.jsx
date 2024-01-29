import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import "./styles/Global.scss";
import "./App.scss";
import HomePage from "./pages/homepage/HomePage";
import VideosPage from "./pages/videospage/VideosPage";
import LeaderBoardPage from "./pages/leaderboardpage/LeaderBoardPage";
import ChallengesPage from "./pages/challengespage/ChallengesPage";
import Layout from "./Layout";
import ImageProvider from "./context/ImageProvider";
import SearchPage from "./pages/searchpage/SearchePage";
import Photo from "./pages/photo/Photo";

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
		<ImageProvider>
			<RouterProvider router={router} />
		</ImageProvider>
	);
}

export default App;

import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import "./styles/Global.scss";
import "./App.scss";
import HomePage from "./pages/homepage/HomePage";
import VideosPage from "./pages/videospage/VideosPage";
import Layout from "./Layout";
import ImageProvider from "./context/ImageProvider";
import SearchPage from "./pages/searchpage/SearchePage";

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
		<ImageProvider>
			<RouterProvider router={router} />
		</ImageProvider>
	);
}

export default App;

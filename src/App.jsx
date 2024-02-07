import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route
} from "react-router-dom";
import "./styles/Global.scss";
import "./App.scss";
import Layout from "./Layout";
import ImageProvider from "./context/ImageProvider";
import SearchPage from "./pages/searchpage/SearchePage";
import { Suspense, lazy } from "react";
import { SpinLoader } from "./components/loader/Loader";

const lazyImport = file =>
	lazy(() => import("./pages/index").then(module => ({ default: module[file] })));

const Home = lazyImport("Home");
const Videos = lazyImport("Videos");

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route
				path="/"
				element={<Layout />}>
				<Route
					path=""
					element={<Home />}
				/>
				<Route
					path="/videos"
					element={<Videos />}
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
			<Suspense fallback={<SpinLoader />}>
				<RouterProvider router={router} />
			</Suspense>
		</ImageProvider>
	);
}

export default App;

import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route
} from "react-router-dom";
import "./styles/Global.scss";
import "./App.scss";
import Layout from "./Layout";
import MainProvider from "./context/MainProvider";
import { Suspense, lazy } from "react";
import { SpinLoader } from "./components/loader/Loader";
import { Home } from "./pages/index";


const lazyImport = file =>
	lazy(() => import("./pages/index").then(module => ({ default: module[file] })));

const Videos = lazyImport("Videos");
const Search = lazyImport("Search");

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
				path="/search/:query"
				element={<Search />}
			/>
		</>
	)
);

function App() {
	return (
		<MainProvider>
			<Suspense fallback={<SpinLoader />}>
				<RouterProvider router={router} />
			</Suspense>
		</MainProvider>
	);
}

export default App;

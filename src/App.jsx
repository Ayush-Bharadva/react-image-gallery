import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route
} from "react-router-dom";
import "./styles/Global.scss";
import "./App.scss";
import Layout from "./components/layout/Layout";
import { Suspense, lazy } from "react";
import { SpinLoader } from "./components/common/loader/Loader";
import { Home } from "./pages/index";

const lazyImport = file =>
	lazy(() => import("./pages/index").then(module => ({ default: module[file] })));

const Videos = lazyImport("Videos");
const Search = lazyImport("Search");

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Layout />}>
				<Route path="" element={<Home />} />
				<Route path="/videos" element={<Videos />} />
				<Route path="/search/:query" element={<Search />} />
			</Route>
		</>
	)
);

function App() {
	return (
		<Suspense fallback={<SpinLoader />}>
			<RouterProvider router={router} />
		</Suspense>
	);
}

export default App;

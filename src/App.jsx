import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import "./styles/Global.scss";
import "./App.scss";
import Layout from "./components/layout/Layout";
import { Suspense, lazy } from "react";
import { SpinLoader } from "./components/common/loader/Loader";
import { Toaster } from "react-hot-toast";
import MediaContainer from "./pages/common-media/MediaContainer";
import { MediaType } from "./utils/constants";

const lazyImport = file => lazy(() => import("./pages/index").then(module => ({ default: module[file] })));

const Search = lazyImport("Search");

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route path="/" element={<MediaContainer mediaType={MediaType.photos} key={MediaType.photos} />} />
			<Route path="/videos" element={<MediaContainer mediaType={MediaType.videos} key={MediaType.videos} />} />
			<Route path="/search/:query" element={<Search />} />
		</Route>
	)
);

function App() {
	return (
		<Suspense fallback={<SpinLoader />}>
			<RouterProvider router={router} />
			<Toaster position="bottom-right" />
		</Suspense>
	);
}

export default App;

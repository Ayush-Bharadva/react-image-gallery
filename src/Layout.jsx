import Header from "./components/Header/Header";
import PageNavigationLinks from "./pages/pagelinks/PageNavigationLinks";
import { Outlet } from "react-router-dom";

function Layout() {
	return (
		<>
			<Header />
			<PageNavigationLinks />
			<Outlet />
		</>
	);
}

export default Layout;

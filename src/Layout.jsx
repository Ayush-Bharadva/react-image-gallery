import Header from "./components/Header/Header";
import PagesLinks from "./pages/pagelinks/PageNavigationLinks";
import { Outlet } from "react-router-dom";

function Layout() {
	return (
		<>
			<Header />
			<PagesLinks />
			<Outlet />
		</>
	);
}

export default Layout;

import Header from "./components/common/header/Header";
import PageNavigationLinks from "./components/common/page-navigation-links/PageNavigationLinks";
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

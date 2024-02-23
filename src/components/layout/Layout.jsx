import { Outlet, useLocation } from "react-router-dom";
import PageNavigationLinks from "../common/page-navigation-links/PageNavigationLinks";
import Header from "../common/header/Header";

function Layout() {

	const location = useLocation();
	const isSearchRoute = location.pathname.startsWith('/search');
	const searchQuery = location.pathname.split("/").at(-1);

	return (
		<>
			<Header searchQuery={searchQuery} isSearchPage={isSearchRoute} />
			{!isSearchRoute && <PageNavigationLinks />}
			<Outlet />
		</>
	);
}

export default Layout;

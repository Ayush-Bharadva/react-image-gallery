import { Outlet, useLocation, useParams } from "react-router-dom";
import PageNavigationLinks from "../common/page-navigation-links/PageNavigationLinks";
import Header from "../common/header/Header";

function Layout() {

	const location = useLocation();
	const isSearchRoute = location.pathname.startsWith('/search');
	const { query } = useParams();

	return (
		<>
			<Header searchQuery={query} isSearchPage={isSearchRoute} />
			{!isSearchRoute && <PageNavigationLinks />}
			<Outlet />
		</>
	);
}

export default Layout;

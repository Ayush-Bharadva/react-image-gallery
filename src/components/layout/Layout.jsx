import { Outlet, useLocation } from "react-router-dom";
import PageNavigationLinks from "../common/page-navigation-links/PageNavigationLinks";
import Header from "../common/header/Header";

const Layout = () => {
	const location = useLocation();
	const isSearchRoute = location.pathname.startsWith('/search');

	return (
		<>
			<Header isSearchPage={isSearchRoute} />
			{!isSearchRoute && <PageNavigationLinks />}
			<Outlet />
		</>
	);
}

export default Layout;

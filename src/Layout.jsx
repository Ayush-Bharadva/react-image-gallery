import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import PagesLinks from "./pages/PagesLinks";

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

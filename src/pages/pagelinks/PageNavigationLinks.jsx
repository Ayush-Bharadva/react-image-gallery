import { NavLink } from "react-router-dom";
import "./PageNavigationLinks.scss";

function PagesLinks() {
	return (
		<div className="page-links-container">
			<div className="page-links">
				<NavLink
					className={({ isActive }) => (isActive ? "link selected" : "link")}
					to="/">
					Home
				</NavLink>
				<NavLink
					className={({ isActive }) => (isActive ? "link selected" : "link")}
					to="/videos">
					Videos
				</NavLink>
			</div>
		</div>
	);
}

export default PagesLinks;

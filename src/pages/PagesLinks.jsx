import { NavLink } from "react-router-dom";
import "./PagesLinks.scss";

function PagesLinks() {
	return (
		<div className="pages-links">
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
			<NavLink
				className={({ isActive }) => (isActive ? "link selected" : "link")}
				to="/leaderboard">
				LeaderBoard
			</NavLink>
			<NavLink
				className={({ isActive }) => (isActive ? "link selected" : "link")}
				to="/challenges">
				Challenges
			</NavLink>
		</div>
	);
}

export default PagesLinks;

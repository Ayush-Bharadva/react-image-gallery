import { NavLink } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useRef } from "react";
import "./PagesLinks.scss";

function PagesLinks() {
	const pagesRef = useRef();

	const onScroll = scrollOffset => {
		pagesRef.current.scrollLeft += scrollOffset;
	};

	return (
		<div className="page-links-container">
			<FaAngleLeft
				className="move-left-icon"
				onClick={() => onScroll(-50)}
			/>
			<div
				className="page-links"
				ref={pagesRef}>
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
			<FaAngleRight
				className="move-right-icon"
				onClick={() => onScroll(50)}
			/>
		</div>
	);
}

export default PagesLinks;

import { NavLink } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useRef } from "react";
import "./PagesLinks.scss";

function PagesLinks() {
	const pagesRef = useRef();

	const onScroll = scrollOffset => {
		if (pagesRef.current) {
			pagesRef.current.scrollLeft += scrollOffset;
		}
	};

	return (
		<div className="page-links-container">
			<button className="move-left-icon">
				<FaAngleLeft onClick={() => onScroll(-100)} />
			</button>
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
			<button className="move-right-icon">
				<FaAngleRight
					className=""
					onClick={() => onScroll(100)}
				/>
			</button>
		</div>
	);
}

export default PagesLinks;

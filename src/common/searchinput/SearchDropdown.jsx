import { PropTypes } from "prop-types";
import { IoSearch } from "react-icons/io5";
import { trendingTopics } from "../../constants/constants";

function SearchDropdown({ searchHistory, clearSearchHistory, handleSelect }) {
	return (
		<div className="search-history-dropdown">
			<button
				className="clear-search-btn"
				onClick={clearSearchHistory}
				type="button">
				Clear
			</button>
			{searchHistory.length ? (
				<div className="recent-search-wrapper">
					<h2>Recent Searches</h2>
					<div className="recent-searches">
						{searchHistory.map((item, index) => (
							<button
								key={index}
								type="button"
								className="recent-search-button"
								onClick={() => handleSelect(item)}>
								{item} <IoSearch />
							</button>
						))}
					</div>
				</div>
			) : null}
			<div className="trending-topics-wrapper">
				<h2>Trending Topics</h2>
				<div className="trending-topics">
					{trendingTopics.map((topic, index) => (
						<button
							key={index}
							type="button"
							className="category-btn"
							onClick={() => handleSelect(topic)}>
							{topic}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}

export default SearchDropdown;

SearchDropdown.propTypes = {
	searchHistory: PropTypes.array,
	clearSearchHistory: PropTypes.func,
	handleSelect: PropTypes.func
};

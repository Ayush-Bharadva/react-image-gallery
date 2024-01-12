import { useState } from "react";
import PropTypes from "prop-types";
// import { fetchSearchedImages } from "../services/services";
import { SearchContext } from "./searchContext";

function SearchProvider({ children }) {
	// const [searchedImages, setSearchedImages] = useState([]);
	// const [nextPageUrl, setNextPageUrl] = useState("");
	const [query, setQuery] = useState("");

	// useEffect(() => {
	// 	setQuery(query);
	// }, [query]);

	// async function onSearchQuery(query) {
	// 	console.log("query :", query);
	// 	setQuery(query);
	// 	// try {
	// 	// 	const { photos, next_page } = await fetchSearchedImages(nextPageUrl || query);
	// 	// 	console.log(photos);
	// 	// 	setSearchedImages([...photos]);
	// 	// 	setNextPageUrl(next_page);
	// 	// } catch (error) {
	// 	// 	console.error(error);
	// 	// }
	// }

	return <SearchContext.Provider value={{ query, setQuery }}>{children}</SearchContext.Provider>;
}

SearchProvider.propTypes = {
	children: PropTypes.node,
};

export default SearchProvider;

import { useState } from "react";
import PropTypes from "prop-types";
import { SearchContext } from "./searchContext";

function SearchProvider({ children }) {
	const [query, setQuery] = useState("");

	const onSetQuery = query => {
		console.log("ctx onSetQuery :", query);
		setQuery(query);
	};

	return <SearchContext.Provider value={{ query, onSetQuery }}>{children}</SearchContext.Provider>;
}

SearchProvider.propTypes = {
	children: PropTypes.element,
};

export default SearchProvider;

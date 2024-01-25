import { useState, createContext, useMemo } from "react";
import PropTypes from "prop-types";

export const ImageContext = createContext({
	query: "",
	modalImageInfo: {},
	setQuery: () => {},
	setModalImageInfo: () => {},
});

function SearchProvider({ children }) {
	const [query, setQuery] = useState("");
	const [modalImageInfo, setModalImageInfo] = useState(null);

	const contextValue = useMemo(() => {
		return {
			query,
			modalImageInfo,
			setQuery,
			setModalImageInfo,
		};
	}, [query, modalImageInfo, setQuery, setModalImageInfo]);

	return <ImageContext.Provider value={contextValue}>{children}</ImageContext.Provider>;
}

SearchProvider.propTypes = {
	children: PropTypes.element,
};

export default SearchProvider;

import { useState, createContext, useMemo } from "react";
import PropTypes from "prop-types";

export const ImageContext = createContext({
	query: "",
	modalImageInfo: {
		image: {},
		index: undefined,
		column: undefined
	},
	index: null,
	setQuery: () => {},
	setModalImageInfo: () => {}
});

function ImageProvider({ children }) {
	const [query, setQuery] = useState("");
	const [modalImageInfo, setModalImageInfo] = useState({
		image: {},
		index: undefined,
		column: undefined
	});

	const contextValue = useMemo(() => {
		return {
			query,
			modalImageInfo,
			setQuery,
			setModalImageInfo
		};
	}, [query, modalImageInfo, setQuery, setModalImageInfo]);

	return <ImageContext.Provider value={contextValue}>{children}</ImageContext.Provider>;
}

ImageProvider.propTypes = {
	children: PropTypes.element
};

export default ImageProvider;

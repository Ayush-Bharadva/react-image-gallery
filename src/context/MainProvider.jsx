import { useState, createContext, useMemo } from "react";
import PropTypes from "prop-types";

export const MainContext = createContext({
	query: "",
	modalImage: {},
	modalVideo: {},
	setQuery: () => {},
	setModalImage: () => {},
	setModalVideo: () => {}
});

function MainProvider({ children }) {
	const [query, setQuery] = useState("");
	const [modalImage, setModalImage] = useState({});
	const [modalVideo, setModalVideo] = useState({});

	const contextValue = useMemo(() => {
		return {
			query,
			modalImage,
			modalVideo,
			setQuery,
			setModalImage,
			setModalVideo
		};
	}, [query, modalImage, modalVideo]);

	return <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>;
}

MainProvider.propTypes = {
	children: PropTypes.element
};

export default MainProvider;

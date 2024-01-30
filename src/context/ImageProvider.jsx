import { useState, createContext, useMemo } from "react";
import PropTypes from "prop-types";

export const ImageContext = createContext({
	query: "",
	modalImageInfo: {
		image: {},
		index: undefined,
		column: undefined,
	},
	index: null,
	setQuery: () => {},
	setModalImageInfo: () => {},
});

function ImageProvider({ children }) {
	const [query, setQuery] = useState("");
	const [modalImageInfo, setModalImageInfo] = useState({
		image: {},
		index: undefined,
		column: undefined,
	});

	const contextValue = useMemo(() => {
		return {
			query,
			modalImageInfo,
			setQuery,
			setModalImageInfo,
		};
	}, [query, modalImageInfo, setQuery, setModalImageInfo]);

	return (
		<ImageContext.Provider value={contextValue}>
			{children}
		</ImageContext.Provider>
	);
}

ImageProvider.propTypes = {
	children: PropTypes.element,
};

export default ImageProvider;

/*
import { createContext, useMemo, useReducer } from "react";
import PropTypes from "prop-types";

export const ImageContext = createContext({
    query: "",
    modalImageInfo: {
        image: {},
        index: undefined,
        column: undefined,
    },
    setQuery: () => {},
    setModalImageInfo: () => {},
});

const initialState = {
    query: "",
    modalImageInfo: {
        image: {},
        index: undefined,
        column: undefined,
    },
};

function reducer(state, action) {
    switch (action.type) {
        case "SET_QUERY":
            return { ...state, query: action.payload };
        case "SET_MODAL_IMAGE_INFO":
            return { ...state, modalImageInfo: action.payload };
        default:
            return state;
    }
}

function ImageProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const contextValue = useMemo(() => {
        const { query, modalImageInfo } = state;
        const setQuery = (newQuery) => dispatch({ type: "SET_QUERY", payload: newQuery });
        const setModalImageInfo = (newInfo) =>
            dispatch({ type: "SET_MODAL_IMAGE_INFO", payload: newInfo });

        return {
            query,
            modalImageInfo,
            setQuery,
            setModalImageInfo,
        };
    }, [state]);

    return <ImageContext.Provider value={contextValue}>{children}</ImageContext.Provider>;
}

ImageProvider.propTypes = {
    children: PropTypes.element,
};

export default ImageProvider;

*/

import { useState, useCallback, useRef, useEffect } from "react";

const initialValue = [];

function useFetchData({ fetchFunction, initialData = initialValue, type, query }) {
	const [dataInfo, setDataInfo] = useState({
		data: initialData,
		hasMore: true,
		isLoading: false
	});
	const nextPageLink = useRef(null);
	const { data, hasMore, isLoading } = dataInfo;

	const fetchData = useCallback(async () => {
		try {
			setDataInfo(prev => ({ ...prev, isLoading: true }));
			const {
				photos = [],
				videos = [],
				next_page
			} = await fetchFunction(nextPageLink.current, query);

			if (!nextPageLink.current) {
				setDataInfo({
					data: type === "photos" ? [...photos] : [...videos],
					isLoading: false,
					hasMore: !!next_page
				});
			} else {
				setDataInfo(prev => ({
					...prev,
					data: type === "photos" ? [...prev.data, ...photos] : [...prev.data, ...videos],
					isLoading: false,
					hasMore: !!next_page
				}));
			}
			nextPageLink.current = next_page;
		} catch (_error) {
			setDataInfo(prev => ({ ...prev, hasMore: false, isLoading: false }));
		}
	}, [fetchFunction, query, type]);

	useEffect(() => {
		setDataInfo({
			data: [],
			hasMore: true,
			isLoading: false
		});
		nextPageLink.current = null;
	}, [query]);

	return { data, isLoading, hasMore, nextPageLink, setDataInfo, fetchData };
}

export default useFetchData;

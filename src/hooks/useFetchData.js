import { useState, useCallback, useRef, useEffect } from "react";

function useFetchData({ fetchFunction, initialData, type, query = "" }) {
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
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}, [fetchFunction, type, query]);

	useEffect(() => {
		setDataInfo({
			data: [],
			hasMore: true,
			isLoading: false
		});
		nextPageLink.current = null;
	}, [query]);

	useEffect(() => {
		if (!data.length && !isLoading && hasMore) {
			fetchData();
		}
	}, [data, isLoading, hasMore, fetchData]);

	return { data, isLoading, hasMore, nextPageLink, setDataInfo, fetchData };
}

export default useFetchData;

import { useState, useCallback, useRef } from "react";

function useFetchData({ fetchFunction, initialData, type }) {
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
			const { photos = [], videos = [], next_page } = await fetchFunction(nextPageLink.current);
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
	}, [fetchFunction, type]);

	const loadMore = useCallback(() => {
		if (!isLoading && hasMore) {
			fetchData();
		}
	}, [isLoading, hasMore, fetchData]);

	return { data, isLoading, hasMore, fetchData, loadMore };
}

export default useFetchData;

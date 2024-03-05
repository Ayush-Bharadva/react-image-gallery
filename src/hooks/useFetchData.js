import { useState, useCallback, useRef, useEffect } from "react";

const initialValue = [];

const useFetchData = ({ fetchFunction, initialData = initialValue, type, query }) => {
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

	
	const resetData = useCallback(() => {
		setDataInfo({
			data:[],
			hasMore: true,
			isLoading: false
		});
		if (nextPageLink.current) {
			nextPageLink.current = null;
		}
	},[]);
	
	useEffect(() => {
		resetData();
		fetchData();
	}, [resetData, fetchData]);
	
	const loadMore = useCallback(() => {
		console.log('isLoading', isLoading, 'hasMore', hasMore)
		if (!isLoading && hasMore) {
			fetchData();
		}
	},[fetchData, hasMore, isLoading]);

	return { data, isLoading, hasMore, loadMore, fetchData};
}

export default useFetchData;
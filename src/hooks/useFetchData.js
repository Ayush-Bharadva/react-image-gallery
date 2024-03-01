import { useState, useCallback, useRef, useEffect } from "react";
import { showToast } from "../utils/helper";
import { ToastIcons } from "../utils/constants";

const initialValue = [];

const controller = new AbortController();

function useFetchData({ fetchFunction, initialData = initialValue, type, query }) {
	const [dataInfo, setDataInfo] = useState({
		data: initialData,
		hasMore: true,
		isLoading: false
	});

	// const controller = useMemo(() => new AbortController(), []);
	const { signal } = controller;
	const nextPageLink = useRef(null);

	const { data, hasMore, isLoading } = dataInfo;

	// const controller = new AbortController();
	// const { signal } = controller;

	// console.log("controller :", controller);

	const fetchData = useCallback(async () => {
		// console.log("fetchData controller :", controller);
		// let signal;
		// if (controller) {
		// 	signal = controller.signal;
		// 	console.log("fetch data signal :", signal);
		// }
		try {
			setDataInfo(prev => ({ ...prev, isLoading: true }));
			const {
				photos = [],
				videos = [],
				next_page
			} = await fetchFunction(nextPageLink.current, query, signal);

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
			setDataInfo(prev => ({ ...prev, hasMore: false }));
			showToast(error, ToastIcons.error, "error");
		} finally {
			setDataInfo(prev => ({ ...prev, isLoading: false }));
		}
	}, [fetchFunction, query, type, signal]);

	useEffect(() => {
		setDataInfo({
			data: [],
			hasMore: true,
			isLoading: false
		});
		nextPageLink.current = null;

		// return () => {
		// 	// console.log("unmounting2");
		// 	controller.abort();
		// };
	}, [query]);

	return { data, isLoading, hasMore, nextPageLink, controller, setDataInfo, fetchData };
}

export default useFetchData;

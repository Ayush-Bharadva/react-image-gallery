import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

const apiKey = import.meta.env.VITE_API_KEY;

const headers = {
	Authorization: apiKey
};
const axiosInstance = axios.create({
	headers: headers
});

export async function sendAxiosRequest(url, nextPageLink) {
	const response = await axiosInstance.get(nextPageLink || url);
	if (response.status !== 200) {
		throw new Error("Something went wrong, failed to fetch data");
	}
	return response.data;
}

export default function useAxios(url) {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(false);
	const nextPageLink = useRef(null);

	const sendRequest = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await sendAxiosRequest(url, nextPageLink.current);
			if (!nextPageLink.current) {
				setData(response.data);
				setIsLoading(false);
				setHasMore(!!response.data.next_page);
			} else {
				setData(prev => [...prev, ...(response.photos || response.videos)]);
				setIsLoading(false);
				setHasMore(!!response.data.next_page);
			}
			nextPageLink.current = response.data.next_page;
		} catch (error) {
			setError(error || "Error fetching data");
		}
	}, [url]);

	useEffect(() => {
		sendRequest();
	}, [sendRequest]);

	console.log("data :", data);
	console.log("hasMore :", hasMore);
	console.log("nextPageLink :", nextPageLink);

	return { data, error, isLoading, hasMore, sendRequest };
}

import axios from "axios";
import { CuratedPhotosApiUrl, PopularVideosApiUrl, SearchPhotosApiUrl } from "../utils/constants";
const apiKey = import.meta.env.VITE_API_KEY;

const headers = {
	Authorization: apiKey
};
const axiosInstance = axios.create({
	headers: headers
});

let controller;
export const fetchSearchedImages = async (nextPageLink, query) => {
	if (controller) {
		controller.abort(); // Cancel the previous request
	}
	controller = new AbortController();
	const { signal } = controller;
	try {
		const apiUrl = nextPageLink || `${SearchPhotosApiUrl}${query}`;
		const response = await axiosInstance.get(apiUrl, { signal });
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		throw new Error(error);
	}
}

export const fetchCuratedPhotos = async (nextPageLink) => {
	try {
		const response = await axiosInstance.get(nextPageLink || CuratedPhotosApiUrl);
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		throw new Error(error);
	}
}

export const fetchPopularVideos = async (nextPageLink) => {
	try {
		const response = await axiosInstance.get(nextPageLink || PopularVideosApiUrl);
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		throw new Error(error);
	}
}

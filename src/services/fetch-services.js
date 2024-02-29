import axios from "axios";
import { CuratedPhotosApiUrl, PopularVideosApiUrl, SearchPhotosApiUrl } from "../utils/constants";
const apiKey = import.meta.env.VITE_API_KEY;

const headers = {
	Authorization: apiKey
};
const axiosInstance = axios.create({
	headers: headers
});

const controller = new AbortController();
const { signal } = controller;

export async function fetchSearchedImages(nextPageLink, query) {
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

export async function fetchCuratedPhotos(nextPageLink) {
	try {
		const response = await axiosInstance.get(nextPageLink || CuratedPhotosApiUrl);
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		throw new Error(error);
	}
}

export async function fetchPopularVideos(nextPageLink) {
	try {
		const response = await axiosInstance.get(nextPageLink || PopularVideosApiUrl);
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		throw new Error(error);
	}
}

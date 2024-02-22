import axios from "axios";
import { curatedPhotosApiUrl, popularVideosApiUrl, searchPhotosApiUrl } from "../utils/constants";
const apiKey = import.meta.env.VITE_API_KEY;

const headers = {
	Authorization: apiKey
};
const axiosInstance = axios.create({
	headers: headers
});

export async function fetchSearchedImages(nextPageLink, query) {
	try {
		const apiUrl = nextPageLink || `${searchPhotosApiUrl}${query}`;
		const response = await axiosInstance.get(apiUrl);
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		console.error("Service: Error fetching images", error);
	}
}

export async function fetchCuratedPhotos(nextPageLink) {
	try {
		const response = await axiosInstance.get(nextPageLink || curatedPhotosApiUrl);
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		throw new Error(error);
	}
}

export async function fetchPopularVideos(nextPageLink) {
	try {
		const response = await axiosInstance.get(nextPageLink || popularVideosApiUrl);
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		throw new Error(error);
	}
}

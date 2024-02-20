import axios from "axios";
const apiKey = import.meta.env.VITE_API_KEY;

const curatedPhotosApiUrl = "https://api.pexels.com/v1/curated?per_page=10";
const searchPhotosApiUrl = "https://api.pexels.com/v1/search/?query=";
const popularVideosApiUrl = "https://api.pexels.com/videos/popular?per_page=10";

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

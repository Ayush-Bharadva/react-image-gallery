import axios from "axios";
// const apiKey = "cIDDhLutgAm2CCVZQKyIElDBsCQ4nqzAzWL7qRRePGd8WmuWlFvHHqNA";
const apiKey = "8Q3TvNS14nRNAMnmbWoqRNCjb94REEfQhIf6XvpEhwJtIGuGQ1b93Rlm";

export const curatedPhotosUrl = "https://api.pexels.com/v1/curated?per_page=10";
const searchPhotosUrl = "https://api.pexels.com/v1/search/?query=";
const popularVideosUrl = "https://api.pexels.com/videos/popular";

const headers = {
	Authorization: apiKey
};
const axiosInstance = axios.create({
	headers: headers
});

export async function fetchSearchedImages(query, nextPageLink) {
	try {
		// console.log("query", query);
		const apiUrl = nextPageLink || `${searchPhotosUrl}${query}`;
		// const apiUrl = `${searchPhotosUrl}${query}`;
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
		const response = await axiosInstance.get(nextPageLink || curatedPhotosUrl);
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		throw new Error(error);
	}
}

export async function fetchPopularVideos(nextPageLink) {
	try {
		const response = await axiosInstance.get(nextPageLink || popularVideosUrl);
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		throw new Error(error);
	}
}

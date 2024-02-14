import axios from "axios";
// const apiKey = "cIDDhLutgAm2CCVZQKyIElDBsCQ4nqzAzWL7qRRePGd8WmuWlFvHHqNA";
const apiKey = "8Q3TvNS14nRNAMnmbWoqRNCjb94REEfQhIf6XvpEhwJtIGuGQ1b93Rlm";
const searchUrl = "https://api.pexels.com/v1/search/?query=";
const popularVideosUrl = "https://api.pexels.com/videos/popular";

const headers = {
	Authorization: apiKey
};
const axiosInstance = axios.create({
	headers: headers
});

export async function fetchSearchedImages(query, nextPageLink) {
	try {
		const apiUrl = nextPageLink || `${searchUrl}${query}`;
		const response = await axiosInstance.get(apiUrl);
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		console.error("Service: Error fetching images", error);
	}
}

export async function fetchCuratedImages(curatedImgUrl) {
	try {
		const response = await axiosInstance.get(curatedImgUrl);
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

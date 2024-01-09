import axios from "axios";
const apiKey = "cIDDhLutgAm2CCVZQKyIElDBsCQ4nqzAzWL7qRRePGd8WmuWlFvHHqNA";
const curatedImagesUrl = "https://api.pexels.com/v1/curated";

export async function fetchImagesData(url) {
	try {
		const response = await axios.get(url, {
			headers: {
				Authorization: apiKey,
			},
		});
		// console.log(response.data);
		if (response.status === 200) {
			return response.data; // {}
		}
	} catch (error) {
		console.log(error);
	}
}

export async function fetchCuratedImages() {
	try {
		const response = await axios.get(curatedImagesUrl, {
			headers: {
				Authorization: apiKey,
			},
		});
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		throw new Error(error);
	}
}

// export async function onDownloadImage(url) {
// 	const response = await axios.get(url);
// 	console.log(response);
// 	const url = window.URL.createObjectURL(response);
// }

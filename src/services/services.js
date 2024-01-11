import axios from "axios";
const apiKey = "cIDDhLutgAm2CCVZQKyIElDBsCQ4nqzAzWL7qRRePGd8WmuWlFvHHqNA";
const curatedImagesUrl = "https://api.pexels.com/v1/curated";
const baseSearchUrl = "https://api.pexels.com/v1/search/?page=1&per_page=5&";

const headers = {
	Authorization: apiKey,
};
const axiosInstance = axios.create({
	headers: headers,
});

export async function fetchImagesData(url) {
	try {
		const response = await axiosInstance.get(url);
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
		const response = await axios.get(curatedImagesUrl);
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		throw new Error(error);
	}
}

export async function fetchSearchedImages(query) {
	try {
		const response = await axios.get(`${baseSearchUrl}query=${query}`);
		if (response.status === 200) {
			console.log(response.data);
			return response.data;
		}
	} catch (error) {
		console.error(error);
	}
}

export async function onDownloadImage(imageSrc, downloadName = "my-image.jpeg") {
	const response = await fetch(imageSrc);
	const blobImage = await response.blob();
	const href = URL.createObjectURL(blobImage);

	const anchor = document.createElement("a");
	anchor.href = href;
	anchor.download = downloadName;

	document.body.appendChild(anchor);
	anchor.click();
	document.body.removeChild(anchor);
	URL.revokeObjectURL(href);
}

export const computeColumnsFromWidth = (allImages, columnsCount) => {
	// const columns = {
	// 	column1: [],
	// 	column2: [],
	// 	column3: [],
	// };

	const columns = {};
	for (let i = 1; i <= columnsCount; i++) {
		columns[`column${i}`] = [];
	}
	allImages.forEach((image, index) => {
		const columnIndex = index % columnsCount;
		columns[`column${columnIndex + 1}`].push(image);
	});
	// console.log(columns);

	return columns;
};

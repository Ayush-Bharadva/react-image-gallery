import axios from "axios";
const apiKey = "cIDDhLutgAm2CCVZQKyIElDBsCQ4nqzAzWL7qRRePGd8WmuWlFvHHqNA";

const headers = {
	Authorization: apiKey,
};
const axiosInstance = axios.create({
	headers: headers,
});

export async function fetchSearchedImages(query, nextPageLink) {
	try {
		const apiUrl = nextPageLink || `https://api.pexels.com/v1/search/?query=${query}`;
		// console.log("Service: Fetching searched images...", query, nextPageLink);

		const response = await axiosInstance.get(apiUrl);
		if (response.status === 200) {
			// console.log("Service: Images fetched successfully", response.data);
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

export async function fetchImagesData(url) {
	try {
		const response = await axiosInstance.get(url);
		if (response.status === 200) {
			return response.data; // {}
		}
	} catch (error) {
		console.log(error);
	}
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
	return columns;
};

export async function onDownloadImage(imageSrc, downloadName = "image.jpeg") {
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

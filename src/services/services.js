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

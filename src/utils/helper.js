import toast from "react-hot-toast";
import { ToastIcons } from "./constants";

export const showToast = (message, icon, type = "success") => {
	toast[type](message, { icon });
};

export const calculateColumns = containerWidth => {
	if (containerWidth < 400) {
		return 1;
	} else if (containerWidth < 700) {
		return 2;
	} else {
		return 3;
	}
};

export function arrangeImagesIntoColumns(containerWidth, columns, allImages) {
	const photos = [...allImages];
	const columnWidth = containerWidth / columns;

	let columnsHeight = new Array(columns).fill(0);
	const emptyArrays = Array.from({ length: 3 }, () => []);

	const updatedPhotos = photos.reduce((acc, photo, index) => {
		const minHeightIndex = columnsHeight.indexOf(Math.min(...columnsHeight));
		const newHeight = Math.floor((photo.height / photo.width) * columnWidth);

		acc[minHeightIndex] = [
			...(acc[minHeightIndex] || []),
			{ ...photo, height: newHeight, width: columnWidth, index }
		];
		columnsHeight[minHeightIndex] += newHeight;

		return acc;
	}, emptyArrays);

	return updatedPhotos;
}

export async function downloadMedia(mediaSrc, downloadName = "media") {
	try {
		const response = await fetch(mediaSrc);
		const blobResponse = await response.blob();
		const mediaUrl = URL.createObjectURL(blobResponse);

		const anchor = document.createElement("a");
		anchor.href = mediaUrl;
		anchor.download = downloadName;

		document.body.appendChild(anchor);
		anchor.click();
		document.body.removeChild(anchor);
		URL.revokeObjectURL(mediaUrl);
		showToast("downloaded successfully");
	} catch (error) {
		showToast("failed to download", ToastIcons.error, "error");
	}
}

export const onCopyToClipBoard = text => {
	try {
		navigator.clipboard.writeText(text);
	} catch (error) {
		showToast("failed copying to clipboard", ToastIcons.error, "error");
	}
};

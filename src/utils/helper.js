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

	const updatedPhotos = photos.reduce((acc, photo) => {
		const newHeight = Math.floor((photo.height / photo.width) * columnWidth);
		return [...acc, { ...photo, height: newHeight, width: columnWidth }];
	}, []);

	let columnsHeight = new Array(columns).fill(0);
	const emptyArrays = Array.from({ length: columns }, () => []);

	const [column1, column2, column3] = updatedPhotos.reduce((acc, photo) => {
		const minHeightIndex = columnsHeight.indexOf(Math.min(...columnsHeight));

		acc[minHeightIndex] = [...(acc[minHeightIndex] || []), photo];
		columnsHeight[minHeightIndex] += Math.floor(photo.height);

		return acc;
	}, emptyArrays);

	return [column1 || [], column2 || [], column3 || []];
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
	} catch (error) {
		console.error("downloading error:", error);
	}
}

export const onCopyToClipBoard = ({ target: { innerText: text } }) => {
	try {
		navigator.clipboard.writeText(text);
	} catch (error) {
		console.error("Error copying to clipboard:", error);
	}
};

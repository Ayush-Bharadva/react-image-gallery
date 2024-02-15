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

		acc[minHeightIndex] = [...acc[minHeightIndex], photo];

		columnsHeight[minHeightIndex] += Math.floor(photo.height);

		return acc;
	}, emptyArrays);

	return [column1 || [], column2 || [], column3 || []];
}

export const computeColumnsFromWidth = (allImages, columnsCount) => {
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

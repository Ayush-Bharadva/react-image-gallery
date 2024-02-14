export const calculateColumns = containerWidth => {
	if (containerWidth < 400) {
		return 1;
	} else if (containerWidth < 700) {
		return 2;
	} else {
		return 3;
	}
};

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

export function computeColumnLayout(containerWidth, columns, photos) {
	// console.log("columnCount CCL :", columns);

	const columnWidth = containerWidth / columns;
	// console.log("columnWidth :", columnWidth);

	const updatedPhotos = photos.reduce((acc, photo) => {
		const newHeight = (photo.height / photo.width) * columnWidth;
		return [...acc, { ...photo, height: newHeight, width: columnWidth }];
	}, []);

	// console.log("updatedPhotos :", updatedPhotos);

	// const columnsHeight = [0, 0, 0];
	const columnsHeight = new Array(columns).fill(0);
	const emptyArrays = Array.from({ length: columns }, () => []);
	// console.log("emptyArrays :", emptyArrays);
	console.log("columnsHeight :", columnsHeight);

	const [column1, column2, column3] = updatedPhotos.reduce(
		(acc, photo) => {
			const minHeightIndex = columnsHeight.indexOf(Math.min(...columnsHeight));
			acc[minHeightIndex].push(photo);
			columnsHeight[minHeightIndex] += photo.height;
			return acc;
		},
		[...emptyArrays]
	);

	console.log("ans :", column1, column2, column3);
	return [column1, column2, column3];
}

/* eslint-disable */

import { useEffect, useState, useCallback } from "react";

const YourComponent = () => {
	const [allImages, setAllImages] = useState([]);
	const [nextPageUrl, setNextPageUrl] = useState(imgUrl);
	const [isLoading, setIsLoading] = useState(false);
	const [columns, setColumns] = useState(1); // State to keep track of the number of columns

	const fetchImagesData = async url => {
		// Assume fetchImagesData is a function that fetches data from the API
		// and returns an object with 'photos' and 'next_page' properties
		const response = await fetch(url);
		const data = await response.json();
		return data;
	};

	const calculateColumns = () => {
		const windowWidth = window.innerWidth;
		if (windowWidth >= 300 && windowWidth < 700) {
			setColumns(1);
		} else if (windowWidth >= 700 && windowWidth < 1100) {
			setColumns(2);
		} else {
			setColumns(3);
		}
	};

	const fetchImages = useCallback(async () => {
		if (!isLoading) {
			try {
				setIsLoading(true);
				const { photos, next_page } = await fetchImagesData(nextPageUrl);
				console.log(photos, next_page);

				// Divide images based on the number of columns
				const dividedImages = Array.from({ length: columns }, (_, index) => photos.filter((_, i) => i % columns === index));

				setAllImages(prev => [...prev, dividedImages]);
				setNextPageUrl(next_page);
				setIsLoading(false);
			} catch (error) {
				throw new Error(error);
				// console.log(error);
			}
		}
	}, [isLoading, nextPageUrl, columns]);

	useEffect(() => {
		// Calculate columns initially and add a resize event listener
		calculateColumns();
		window.addEventListener("resize", calculateColumns);
		return () => {
			window.removeEventListener("resize", calculateColumns);
		};
	}, []);

	//   return (
	//     // Your component JSX
	//   );
};

export default YourComponent;

const dividedImages = Array.from({ length: columns }, (_, columnIndex) =>
	photos.reduce((column, item, index) => {
		if (index % columns === columnIndex) {
			return [...column, item];
		}
		return column;
	}, [])
);

/*
	const breakPoints = {
		large: 1100,
		medium: 700,
		small: 300,
	};
	const windowWidth = document.innerWidth;

	const onDivideIntoColumns = useMemo(
		(breakPoints, allImages) => {
			const windowWidth = document.innerWidth;
			const { large, medium, small } = breakPoints;

			console.log(large, medium, small);
			if (windowWidth > small && windowWidth <= medium) {
				return "small";
			} else if (windowWidth > medium && windowWidth <= large) {
				return "medium";
			} else if (windowWidth > large) {
				const { column1, column2, column3 } = allImages.reduce(
					(ans, obj, index) => {
						if (index % 3 === 0) {
							ans.column1.push(obj);
						} else if (index % 3 === 1) {
							ans.column2.push(obj);
						} else {
							ans.column3.push(obj);
						}
						return ans;
					},
					{ column1: [], column2: [], column3: [] }
				);
				return { column1, column2, column3 };
				// setAllImages(prev => ({ column1: [...prev.column1, ...column1], column2: [...prev.column2, ...column2], column3: [...prev.column3, ...column3] }));

				// return "large";
			}
		},
		[windowWidth]
	);
	// onDivideIntoColumns(breakPoints, allImages);
	*/

//divide images
// if (windowWidth >= 300 && windowWidth < 700) {
// 	setAllImages(prev => ({ column1: [...prev.column1, ...photos], column2: [], column3: [] }));
// } else if (windowWidth >= 700 && windowWidth < 1100) {
// 	const { column1, column2 } = photos.reduce(
// 		(ans, obj, index) => {
// 			if (index % 2 === 0) {
// 				ans.column1.push(obj);
// 			} else if (index % 2 === 1) {
// 				ans.column2.push(obj);
// 			}
// 			return ans;
// 		},
// 		{ column1: [], column2: [] }
// 	);
// 	setAllImages(prev => ({ column1: [...prev.column1, ...column1], column2: [...prev.column2, ...column2] }));
// } else if (windowWidth >= 1100) {
// 	const { column1, column2, column3 } = photos.reduce(
// 		(ans, obj, index) => {
// 			if (index % 3 === 0) {
// 				ans.column1.push(obj);
// 			} else if (index % 3 === 1) {
// 				ans.column2.push(obj);
// 			} else {
// 				ans.column3.push(obj);
// 			}
// 			return ans;
// 		},
// 		{ column1: [], column2: [], column3: [] }
// 	);
// 	setAllImages(prev => ({ column1: [...prev.column1, ...column1], column2: [...prev.column2, ...column2], column3: [...prev.column3, ...column3] }));
// 	setNextPageUrl(next_page);
// 	// setColumns(3);
// }

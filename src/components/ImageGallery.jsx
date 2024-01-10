import { PropTypes } from "prop-types";
import { useMemo, memo } from "react";
import "./ImageGallery.scss";
import Image from "./Image/Image";

const ImageGallery = ({ allImages = { column1: [], column2: [], column3: [] } }) => {
	const { column1, column2, column3 } = allImages;

	return (
		<div className="image-gallery-container">
			<div className="col-1">
				{column1.length &&
					column1.map(image => (
						<Image
							key={image.id}
							image={image}
						/>
					))}
			</div>
			<div className="col-2">
				{column2.length &&
					column2.map(image => (
						<Image
							key={image.id}
							image={image}
						/>
					))}
			</div>
			<div className="col-3">
				{column3.length &&
					column3.map(image => (
						<Image
							key={image.id}
							image={image}
						/>
					))}
			</div>
		</div>
	);
};

ImageGallery.propTypes = {
	allImages: PropTypes.arrayOf(PropTypes.shape({})),
};

export default ImageGallery;

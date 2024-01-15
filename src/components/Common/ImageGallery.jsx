import { PropTypes } from "prop-types";
import "./ImageGallery.scss";
import Image from "./Image";

function ImageGallery({ allImages }) {
	const { column1, column2, column3 } = allImages;
	// console.log(column1, column2, column3);

	return (
		<div className="image-gallery-container">
			{column1 && (
				<div
					key={crypto.randomUUID()}
					className="col-1">
					{column1.map(image => (
						<Image
							key={image.id}
							image={image}
						/>
					))}
				</div>
			)}
			{column2 && (
				<div
					key={crypto.randomUUID()}
					className="col-2">
					{column2.map(image => (
						<Image
							key={image.id}
							image={image}
						/>
					))}
				</div>
			)}
			{column3 && (
				<div
					key={crypto.randomUUID()}
					className="col-3">
					{column3.map(image => (
						<Image
							key={image.id}
							image={image}
						/>
					))}
				</div>
			)}
		</div>
	);
}

ImageGallery.propTypes = {
	allImages: PropTypes.object,
};

export default ImageGallery;

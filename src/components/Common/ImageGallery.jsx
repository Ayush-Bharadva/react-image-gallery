import { PropTypes } from "prop-types";
import "./ImageGallery.scss";
import Image from "./Image";

function ImageGallery({ allImages, onImageSelect }) {
	const { column1, column2, column3 } = allImages;

	return (
		<div
			className="image-gallery-container"
			key={crypto.randomUUID()}>
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
							onImageSelect={onImageSelect}
						/>
					))}
				</div>
			)}
		</div>
	);
}

ImageGallery.propTypes = {
	allImages: PropTypes.object,
	onImageSelect: PropTypes.func,
};

export default ImageGallery;

import { PropTypes } from "prop-types";
import "./ImageGallery.scss";
import Image from "./Image";
import { useContext, useRef } from "react";
import { SearchContext } from "../../context/SearchProvider";
import ImageDialog from "./ImageDialog";

function ImageGallery({ allImages }) {
	const { column1, column2, column3 } = allImages;
	const { setModalImageInfo } = useContext(SearchContext);
	const modal = useRef(null);

	const onImageClick = image => {
		console.log("click occur", modal.current);
		setModalImageInfo(image);
		console.log(modal.current);
		if (modal.current) {
			modal.current?.open();
			// modal.current.open();
		}
	};
	return (
		<>
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
								onImageClick={onImageClick}
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
								onImageClick={onImageClick}
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
								onImageClick={onImageClick}
							/>
						))}
					</div>
				)}
			</div>
			<ImageDialog ref={modal} />
		</>
	);
}

ImageGallery.propTypes = {
	allImages: PropTypes.object,
};

export default ImageGallery;

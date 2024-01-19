import { useContext, useRef } from "react";
import { PropTypes } from "prop-types";
import { SearchContext } from "../../context/SearchProvider";
import Image from "./Image";
import ImageDialog from "./ImageDialog";
import "./ImageGallery.scss";

function ImageGallery({ allImages }) {
	const { column1, column2, column3 } = allImages;
	const { setModalImageInfo } = useContext(SearchContext);
	const modal = useRef(null);

	const onImageClick = (image) => {
		setModalImageInfo(image);
		if (modal.current) {
			modal.current.open();
		}
	};
	return (
		<>
			<div className="image-gallery-container" key={crypto.randomUUID()}>
				{column1 && (
					<div key={crypto.randomUUID()} className="col-1">
						{column1.map((image) => (
							<Image
								key={image.id}
								image={image}
								onImageClick={onImageClick}
							/>
						))}
					</div>
				)}
				{column2 && (
					<div key={crypto.randomUUID()} className="col-2">
						{column2.map((image) => (
							<Image
								key={image.id}
								image={image}
								onImageClick={onImageClick}
							/>
						))}
					</div>
				)}
				{column3 && (
					<div key={crypto.randomUUID()} className="col-3">
						{column3.map((image) => (
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
	allImages: PropTypes.shape({
		column1: PropTypes.arrayOf(PropTypes.object),
		column2: PropTypes.arrayOf(PropTypes.object),
		column3: PropTypes.arrayOf(PropTypes.object),
	}),
};

export default ImageGallery;

/*
  const renderColumn = (column) => (
    <div key={crypto.randomUUID()} className={`col-${column}`}>
      {allImages[column].map((image) => (
        <Image key={image.id} image={image} onImageClick={onImageClick} />
      ))}
    </div>
  );

  return (
    <>
      <div className="image-gallery-container" key={crypto.randomUUID()}>
        {column1 && renderColumn(1)}
        {column2 && renderColumn(2)}
        {column3 && renderColumn(3)}
      </div>
      <ImageDialog ref={modal} />
    </>
  );
*/

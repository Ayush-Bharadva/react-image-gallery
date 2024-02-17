import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import './RelatedCategories.scss'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RelatedCategoriesItems } from '../../../utils/constants';

function RelatedCategories() {

  const navigate = useNavigate();
  const categoriesRef = useRef();

  const fetchCategoryImages = ({ target: { value: category } }) => {
    // setSearchState({
    //   fetchedImages: [],
    //   nextPageLink: null,
    //   hasMore: true,
    //   isLoading: false
    // });
    navigate(`/search/${category}`);
  };

  const scrollCategories = scrollOffset => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <div className="related-categories-container">
      <FaAngleLeft
        className="move-left-icon"
        onClick={() => scrollCategories(-500)}
      />
      <div
        className="related-categories"
        ref={categoriesRef}>
        {RelatedCategoriesItems.map(category => (
          <button
            key={category}
            onClick={fetchCategoryImages}
            value={category}>
            {category}
          </button>
        ))}
      </div>
      <FaAngleRight
        className="move-right-icon"
        onClick={() => scrollCategories(300)}
      />
    </div>
  )
}

export default RelatedCategories
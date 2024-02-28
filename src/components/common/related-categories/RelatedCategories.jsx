import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import './RelatedCategories.scss'
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RelatedCategoriesItems } from '../../../utils/constants';

function RelatedCategories() {

  const navigate = useNavigate();
  const categoriesRef = useRef();
  const leftBtnRef = useRef();
  const rightBtnRef = useRef();

  const fetchCategoryImages = ({ target: { value: category } }) => {
    navigate(`/search/${category}`);
  };

  useEffect(() => {

    const scrollLength = categoriesRef.current.scrollWidth - categoriesRef.current.clientWidth;

    function checkScroll() {
      const currentScroll = categoriesRef.current.scrollLeft;
      if (currentScroll === 0) {
        leftBtnRef.current.style.display = "none";
      } else if (currentScroll === scrollLength) {
        rightBtnRef.current.style.display = "none";
      } else {
        leftBtnRef.current.style.display = "block";
        rightBtnRef.current.style.display = "block";
      }
    }
    categoriesRef.current.addEventListener("scroll", checkScroll);
  }, []);

  function scrollList(scrollValue) {
    categoriesRef.current.scrollBy({
      left: scrollValue,
    })
  }

  return (
    <div className="related-categories-container">
      <button className='scroll-left-btn' ref={leftBtnRef} onClick={() => scrollList(-200)}>
        <FaAngleLeft />
      </button>
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
      <button className='scroll-right-btn' ref={rightBtnRef} onClick={() => scrollList(200)}>
        <FaAngleRight />
      </button>
    </div>
  )
}

export default RelatedCategories
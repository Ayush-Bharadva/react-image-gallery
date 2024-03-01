import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "./RelatedCategories.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RelatedCategoriesItems } from "../../../utils/constants";

function RelatedCategories() {
  const navigate = useNavigate();
  const categoriesRef = useRef();

  const [scrollButtons, setScrollButtons] = useState({
    leftButton: true,
    rightButton: true,
  })

  const { leftButton, rightButton } = scrollButtons;

  const fetchCategoryImages = (category) => {
    navigate(`/search/${category}`);
  };

  const handleScroll = useCallback(() => {
    const { scrollWidth, clientWidth, scrollLeft } = categoriesRef.current;
    const isAtStart = scrollLeft === 0;
    const isAtEnd = scrollLeft + clientWidth >= scrollWidth;

    setScrollButtons({
      leftButton: !isAtStart,
      rightButton: !isAtEnd,
    });
  }, []);

  useEffect(() => {
    const categoriesElement = categoriesRef.current;
    categoriesElement.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      categoriesElement.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  function scrollList(toScroll) {
    categoriesRef.current.scrollBy({
      left: toScroll,
    });
  }

  return (
    <div className="related-categories-container">
      {leftButton && <button className="scroll-left-btn" onClick={() => scrollList(-categoriesRef.current.clientWidth)}>
        <FaAngleLeft />
      </button>}
      <div className="related-categories" ref={categoriesRef}>
        {RelatedCategoriesItems.map((category) => (
          <button className="category-button" key={category} onClick={() => fetchCategoryImages(category)} value={category}>
            {category}
          </button>
        ))}
      </div>
      {rightButton && <button className="scroll-right-btn" onClick={() => scrollList(categoriesRef.current.clientWidth)}>
        <FaAngleRight />
      </button>}
    </div>
  );
}

export default RelatedCategories;

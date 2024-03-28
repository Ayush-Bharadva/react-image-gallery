import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "./RelatedCategories.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RelatedCategoriesItems } from "../../../utils/constants";

const RelatedCategories = () => {
  const navigate = useNavigate();
  const categoriesRef = useRef();

  const [scrollButtons, setScrollButtons] = useState({
    leftButton: true,
    rightButton: true,
  })

  const { leftButton, rightButton } = scrollButtons;

  const fetchCategoryImages = category => {
    navigate(`/search/${category}`);
  };

  const handleScroll = useCallback(() => {
    if (categoriesRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = categoriesRef.current;
      const isAtStart = scrollLeft === 0;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth;

      setScrollButtons({
        leftButton: !isAtStart,
        rightButton: !isAtEnd,
      });
    }
  }, []);

  useEffect(() => {
    const categoriesElement = categoriesRef?.current;
    handleScroll();
    if (categoriesRef.current) {
      categoriesElement.addEventListener("scroll", handleScroll);
    }
    return () => {
      categoriesElement.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  const scrollList = toScroll => {
    if (categoriesRef.current) {
      categoriesRef.current.scrollBy({
        left: toScroll,
      });
    }
  }

  const scrollLeft = () => scrollList(-categoriesRef.current.clientWidth);
  const scrollRight = () => scrollList(categoriesRef.current.clientWidth);

  return (
    <div className="related-categories-container">
      {leftButton && <button className="scroll-left-btn" onClick={scrollLeft}>
        <FaAngleLeft />
      </button>}
      <div className="related-categories" ref={categoriesRef}>
        {RelatedCategoriesItems.map((category) => (
          <button className="category-button" key={category} value={category} onClick={() => fetchCategoryImages(category)}>
            {category}
          </button>
        ))}
      </div>
      {rightButton && <button className="scroll-right-btn" onClick={scrollRight}>
        <FaAngleRight />
      </button>}
    </div>
  );
}

export default RelatedCategories;

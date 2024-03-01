import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "./RelatedCategories.scss";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RelatedCategoriesItems } from "../../../utils/constants";
import { useState } from "react";

function RelatedCategories() {
  const navigate = useNavigate();
  const categoriesRef = useRef();

  const [navigateButtons, setNavigateButtons] = useState({
    leftButton: true,
    rightButton: true,
  })

  const { leftButton, rightButton } = navigateButtons;

  const fetchCategoryImages = ({ target: { value: category } }) => {
    navigate(`/search/${category}`);
  };

  useEffect(() => {
    function checkScroll() {
      const scrollLength = categoriesRef.current.scrollWidth - categoriesRef.current.clientWidth;
      const currentScroll = Math.ceil(categoriesRef.current.scrollLeft);

      if (currentScroll === 0) {
        setNavigateButtons(prev => ({ ...prev, leftButton: false }));
      } else if (currentScroll >= scrollLength) {
        setNavigateButtons(prev => ({ ...prev, rightButton: false }));
      } else {
        setNavigateButtons({ leftButton: true, rightButton: true });
      }
    }
    categoriesRef.current.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

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
          <button className="category-button" key={category} onClick={fetchCategoryImages} value={category}>
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

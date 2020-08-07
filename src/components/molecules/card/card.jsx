import { Link, navigate } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import styles from "./card.module.scss";

const Card = ({
  albumPosts,
  categories,
  history,
  image,
  price,
  slugId,
  title
}) => (
  <Link
    data-testid="card"
    className={styles.card}
    to={`/a/${slugId}/`}
    state={{
      albumPosts,
      previousPathname: history.pathname,
      previousScrollY: history.scrollY,
      previousAmountToShow: history.amountToShow,
      defaultCategoryFilterScrollLeft: history.defaultCategoryFilterScrollLeft
    }}
  >
    <img src={image.childImageSharp.fluid.src} alt={title} />
    <p data-testid="card-title" className={styles.title}>
      {title}
    </p>
    <div className={styles.additionalInfo}>
      <div>
        {categories.map((category, i) => (
          <div
            data-testid="category"
            key={i}
            onClick={e => {
              e.preventDefault();
              navigate(`/a/category/${category}/`);
            }}
            className={styles.iconButton}
          >
            <i className={`font-icon-category-${category}`} />
          </div>
        ))}
      </div>
      {price && <p>{`$${price}`}</p>}
    </div>
  </Link>
);
Card.propTypes = {
  albumPosts: PropTypes.array,
  categories: PropTypes.array,
  history: PropTypes.object,
  image: PropTypes.object,
  price: PropTypes.number,
  slugId: PropTypes.string,
  title: PropTypes.string
};
Card.defaultProps = {
  albumPosts: [],
  categories: [],
  history: {}
};
export default Card;

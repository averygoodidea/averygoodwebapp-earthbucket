import { Card, TaxonomyFilter } from "molecules";
import PropTypes from "prop-types";
import React, { Component } from "react";
import styles from "./card-collection.module.scss";

let amountIterator;
class CardCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountToShow: 3
    };
    amountIterator = this.state.amountToShow;
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    this.shouldUpdate = true;
    this.update();
    const { state } = this.props.location;
    if (state && state.hasOwnProperty("defaultAmountToShow")) {
      const { defaultAmountToShow, defaultScrollY } = state;
      this.setState({ amountToShow: defaultAmountToShow }, () => {
        // adding window.scrollTo in requestAnimationFrame enables the window.scrollTo to work on mobile breakpoints.
        requestAnimationFrame(() => {
          window.scrollTo(0, defaultScrollY);
        });
      });
    }
  }
  update() {
    const distanceToBottom =
      document.documentElement.offsetHeight -
      (window.scrollY + window.innerHeight);
    if (distanceToBottom < 100) {
      this.setState({ amountToShow: this.state.amountToShow + amountIterator });
    }
    this.ticking = false;
    requestAnimationFrame(() => {
      this.setState({ scrollY: window.scrollY });
    });
  }
  handleScroll = () => {
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(() => {
        if (this.shouldUpdate) {
          this.update();
        }
      });
    }
  };
  componentWillUnmount() {
    this.shouldUpdate = false;
  }
  render() {
    const { albumPosts, location, s3, taxonomies } = this.props;
    const { amountToShow, scrollY } = this.state;
    const posts = albumPosts.slice(0, amountToShow);
    const history = {
      amountToShow,
      pathname: location.pathname,
      scrollY
    };
    // retain default category filter scroll left position so when this card collection component
    // triggers the layout to re-render, the category scroll left position is retaineed
    if (location.state && location.state.defaultCategoryFilterScrollLeft) {
      history.defaultCategoryFilterScrollLeft =
        location.state.defaultCategoryFilterScrollLeft;
    }
    return (
      <div data-testid="card-collection">
        {taxonomies.length > 0 && (
          <TaxonomyFilter
            baseRoute="/a/category/"
            defaultScrollLeftPropName="defaultCategoryFilterScrollLeft"
            indexRoute="/"
            fontIcon="index"
            location={location}
            taxonomies={taxonomies}
          />
        )}
        <div className={styles.cardCollection}>
          {posts.map(
            ({ node: { id, slugId, title, images, categories, price } }, i) => (
              <Card
                key={i}
                categories={categories}
                history={history}
                image={s3[images[0]]} // grab the first image in the images array
                albumPosts={posts}
                price={price}
                slugId={slugId}
                title={title}
              />
            )
          )}
        </div>
      </div>
    );
  }
}
CardCollection.propTypes = {
  albumPosts: PropTypes.array,
  location: PropTypes.object,
  s3: PropTypes.object,
  taxonomies: PropTypes.array
};
CardCollection.defaultProps = {
  albumPosts: [],
  location: { pathname: "" },
  s3: {},
  taxonomies: []
};
export default CardCollection;

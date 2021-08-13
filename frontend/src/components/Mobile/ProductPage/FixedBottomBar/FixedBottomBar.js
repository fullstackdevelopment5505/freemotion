import React, { useState, useEffect } from "react";
import styles from "./FixedBottomBar.module.scss";
import ScaleIcon from "../../../../svgs/scale.svg";
import EmptyHeartIcon from "../../../../svgs/empty_heart.svg";
import FullHeartIcon from "../../../../svgs/full_heart.svg";
import EmptyCartIcon from "../../../../svgs/empty_cart.svg";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ReactSVG } from "react-svg";
import {
  addItemToWishlist,
  removeWishlistItem,
} from "../../../../actions/wishlistActions";
import { addToCart } from "../../../../actions/shoppingCartActions";
import {
  addToComparison,
  removeFromComparison,
} from "../../../../actions/comparisonActions";

const isInCart = (products, productId) => {
  let inCart = false;
  for (let i = 0; i < products.length; i++)
    if (products[i].productId == productId) {
      inCart = true;
      break;
    }

  return inCart;
};

export default function FixedBottomBar({ id }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const wishlistProductsIds = useSelector((state) => state.wishlist.items);
  const shoppingCartProductsIds = useSelector(
    (state) => state.shoppingCart.products,
  );
  const comparisonProductsIds = useSelector((state) => state.comparison.items);

  const [wishlistProduct, setWishlistProduct] = useState(false);
  const [comparisonProduct, setComparisonProduct] = useState(false);
  const [cartProduct, setCartProduct] = useState(false);

  useEffect(() => {
    setWishlistProduct(wishlistProductsIds.includes(id));
    setComparisonProduct(comparisonProductsIds.includes(id));
    setCartProduct(isInCart(shoppingCartProductsIds, id));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.optionBlock}>
        {comparisonProduct ? (
          <ReactSVG
            className={styles.compared__icon}
            beforeInjection={(svg) => {
              svg.setAttribute("style", `width: 1rem`);
              svg.setAttribute("style", `height: 1rem`);
              svg.setAttribute("style", `margin-bottom: -6px`);
              svg.children[0].setAttribute("style", `stroke: #ff5722`);
            }}
            src={ScaleIcon}
            onClick={() => {
              setComparisonProduct(false);
              dispatch(removeFromComparison(id));
            }}
          />
        ) : (
          <ReactSVG
            className={styles.compare__icon}
            src={ScaleIcon}
            beforeInjection={(svg) => {
              svg.setAttribute("style", `width: 1rem`);
              svg.setAttribute("style", `height: 1rem`);
              svg.setAttribute("style", `margin-bottom: -6px`);
            }}
            onClick={() => {
              setComparisonProduct(true);
              dispatch(addToComparison(id));
            }}
          />
        )}
      </div>
      <div className={styles.optionBlock}>
        {wishlistProduct ? (
          <ReactSVG
            beforeInjection={(svg) => {
              svg.setAttribute("style", `width: 1rem`);
              svg.setAttribute("style", `height: 1rem`);
              svg.setAttribute("style", `margin-bottom: -6px`);
              svg.children[0].setAttribute("style", `stroke: #ff5722`);
            }}
            src={FullHeartIcon}
            onClick={() => {
              setWishlistProduct(false);
              dispatch(removeWishlistItem(id));
            }}
          />
        ) : (
          <ReactSVG
            beforeInjection={(svg) => {
              svg.setAttribute("style", `width: 1rem`);
              svg.setAttribute("style", `height: 1rem`);
              svg.setAttribute("style", `margin-bottom: -6px`);
            }}
            src={EmptyHeartIcon}
            onClick={() => {
              setWishlistProduct(true);
              dispatch(addItemToWishlist(id));
            }}
          />
        )}
      </div>
      <div className={styles.cartButton}>
        <ReactSVG
          src={EmptyCartIcon}
          beforeInjection={(svg) =>
            svg.children[0].setAttribute("style", `stroke: #fff`)
          }
        />
        <span>Add To Cart</span>
      </div>
    </div>
  );
}

import React, { useState, useEffect, Suspense, useRef } from "react";
import axios from "axios";
import InputDropdown2 from "../UI-Components/InputDropdown2/InputDropdown2";
import styles from "./ProductPage.module.scss";
import Layout from "../Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../UI-Components/Button/Button";
import Button2 from "../UI-Components/Button2/Button2";
import FAQSection from "./FAQSection/FAQSection";
import ReviewSection from "./ReviewSection/ReviewSection";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import Parameters from "../ProductsPage/Parameters/Parameters";
import AddedToCartModal from "../AddedToCartModal/AddedToCartModal";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { objectedProperties, capitalizeOptions } from "./helpers";
import {
  addItemToWishlist,
  removeWishlistItem,
} from "../../actions/wishlistActions";
import { renderCurrencyLocale } from "../../helpers/renderCurrency";
import { addToCart } from "../../actions/shoppingCartActions";
import { addToComparison } from "../../actions/comparisonActions";
import { useDispatch, useSelector } from "react-redux";
import ScaleIcon from "../../svgs/scale.svg";
import EmptyHeartIcon from "../../svgs/empty_heart.svg";
import FullHeartIcon from "../../svgs/full_heart.svg";
import { ReactSVG } from "react-svg";
import BundlePack from "../UI-Components/BundlePack/BundlePack";
import { default as MobileBundlePack } from "../Mobile/BundlePack/BundlePack";
import QualityAssuranceBanner from "./QualityAssuranceBanner/QualityAssuranceBanner";
import ProductOptionsModal from "../Mobile/ProductPage/ProductOptionsModal/ProductOptionsModal";
import ShareIcon from "../../svgs/ic_share.svg";
import ProductOptions from "../Mobile/ProductPage/ProductOptions/ProductOptions";
import ReviewModal from "./ReviewModal/ReviewModal";
import ChangeProductModal from "./ChangeProductModal/ChangeProductModal";
import { withFirebase } from "../Firebase";
import PhotosVideosSection from "../ProductPage/PhotosVideosSection/PhotosVideosSection";
import { default as MobilePhotosVideosSection } from "../Mobile/ProductPage//PhotosVideosSection/PhotosVideosSection";
import { LazyLoadImage } from "react-lazy-load-image-component";
import EmptyStarIcon from "../../svgs/empty_star.svg";
import StarIcon from "../../svgs/full_star.svg";
import FixedBottomBar from "../Mobile/ProductPage/FixedBottomBar/FixedBottomBar";
import MobileThumbnailGallery from "../Mobile/ProductPage/ThumbnailGallery/ThumbnailGallery";

import G_KLARNA from "../../svgs/product_page/kl_gr.svg";
import G_PAYBRIGHT from "../../svgs/product_page/pb_gr.svg";
import G_DUTY_FREE from "../../svgs/product_page/df_gr.svg";
import ThumbnailGallery from "./ThumbnailGallery/ThumbnailGallery";

const contentful = require("contentful");
require("dotenv").config();

function ProductPage({ firebase, currency }) {
  console.log(currency);
  const dispatch = useDispatch();

  const wishlistProductsId = useSelector((state) => state.wishlist.items);

  const [highlightedProperties, setHighlightedProperties] = useState({});

  const [options, setOptions] = useState([]);
  const [optionsType, setOptionsType] = useState("");
  const [wishlistProduct, setWishlistProduct] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [productItemId, setProductItemId] = useState("");
  const [product, setProduct] = useState({});
  const [numProducts, setNumProducts] = useState(1);
  const [quantityError, setQuantityError] = useState(null);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [showChangeProductModal, setShowChangeProductModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [secondaryProductId, setSecondaryProductId] = useState("");
  const [showProductOptionsModal, setShowProductOptionsModal] = useState(false);

  const [productBundles, setProductBundles] = useState([]);
  const [activeBundle, setActiveBundle] = useState({});
  const [bundleTotal, setBundleTotal] = useState(0);

  // First Product Available Option
  const [selectedColor, setSelectedColor] = useState("Black");

  // First Product Available Option
  const [wheelSize, setWheelSize] = useState("80mm Slick Wheels");

  let discountPercentage = 30;
  let discountValue = 990;

  const quantityValidator = (numStockProducts, currentQuantity, process) => {
    if (process === "minus")
      if (currentQuantity > 1) {
        setNumProducts((prevNumProducts) => prevNumProducts - 1);
        setQuantityError(null);
      } else
        setQuantityError("You can't purchase a null number of products...");
    else if (currentQuantity === numStockProducts)
      setQuantityError(
        "There are not that many products in stock right now... Try again later.",
      );
    else {
      setNumProducts((prevNumProducts) => prevNumProducts + 1);
      setQuantityError(null);
    }
  };

  const buyNowClickHandler = () => {};

  const addToCartClickHandler = (id, numProducts) => {
    console.log(id, numProducts);
    dispatch(addToCart(id, numProducts));
  };

  useEffect(() => {
    let url = window.location.href.split("/");
    const productId = url[url.length - 1];
    setProductItemId(productId);

    const fetchProductBundles = async () => {
      const bundleQuery = `
        query {
          bundleCollection(where:{mainProductId: "${productId}"}) {
            items {
              mainProductId
              secondaryProductId
              bundlePrice
            }
          }
        }
      `;

      const result = await axios({
        method: "post",
        url: `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}?access_token=EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
        data: JSON.stringify({ query: bundleQuery }),
        headers: {
          Authorization: `Bearer EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
          "Content-Type": "application/json",
        },
      });

      setProductBundles(result.data.data.bundleCollection.items);
      setActiveBundle(result.data.data.bundleCollection.items[0]);
    };

    const fetchProductImage = async (assetId) => {
      const asset = await axios({
        method: "get",
        url: `https://cdn.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/assets/${assetId}`,
        headers: {
          Authorization: `Bearer EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
        },
      });

      return asset.data.fields.file.url;
    };

    const fetchProductReviews = async () => {
      const reviews = await firebase.productReviews(productId);

      if (!reviews.empty) {
        let reviewSum = 0;
        let numReviews = 0;

        reviews.forEach((review) => {
          setReviews((prevState) => [...prevState, review.data()]);
          reviewSum = reviewSum + review.data().rating;
          numReviews++;
        });

        setRating((reviewSum / numReviews).toFixed(1));
      }
    };

    const fetchProduct = async () => {
      const result = await axios({
        method: "get",
        url: `https://cdn.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/entries?select=sys.id,fields&sys.id=${productId}`,
        headers: {
          Authorization: `Bearer EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
        },
      });

      const productImage = await fetchProductImage(
        result.data.items[0].fields.productImage.sys.id,
      );

      setHighlightedProperties({
        topSpeed: result.data.items[0].fields.maxSpeedInMiles,
        maxLoad: result.data.items[0].fields.maxLoadInPounds,
        battery: "100v",
      });

      setBundleTotal(result.data.items[0].fields.currentPrice);

      setProduct({
        ...result.data.items[0].fields,
        id: result.data.items[0].sys.id,
        productImage: productImage,
      });
    };

    fetchProduct();
    fetchProductReviews();
    setWishlistProduct(wishlistProductsId.includes(productId));
    fetchProductBundles();
  }, []);

  const toCapitalSpace = (string) => {
    var result = string.replace(/([A-Z])/g, " $1");
    var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  };

  const client = contentful.createClient({
    space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
    accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
    environment: process.env.REACT_APP_CONTENTFUL_ENVIRONMENT_ID,
  });

  const blogContentOptions = {
    renderNode: {
      "embedded-asset-block": (node) => {
        client.getAsset(node.data.target.sys.id).then((asset) => {
          console.log(asset);
          const alt = asset.fields.title;
          const url = asset.fields.file.url;
          return <img alt={alt} src={url} />;
        });
      },
    },
  };

  console.log(product);

  // Refs
  const descriptionRef = useRef(null);
  const parametersRef = useRef(null);
  const shipping_warrantyRef = useRef(null);
  const faqRef = useRef(null);
  const photos_videosRef = useRef(null);
  const reviewsRef = useRef(null);

  const scrollToNavOption = (refName) => {
    refName.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navigationViews = [
    { name: "Description", ref: descriptionRef },
    { name: "Parameters", ref: parametersRef },
    { name: "Shipping & Warranty", ref: shipping_warrantyRef },
    { name: "FAQ", ref: faqRef },
    { name: "Photos & Videos", ref: photos_videosRef },
    { name: "Reviews", ref: reviewsRef },
  ];

  return (
    <Layout>
      {Object.keys(product).length ? (
        <div className={styles.productPage__container}>
          <div className={styles.product__overview}>
            <div className={styles.top__wrapper}>
              {window.screen.width > 768 ? (
                <ThumbnailGallery />
              ) : (
                <MobileThumbnailGallery />
              )}
              <div className={styles.right__col}>
                <React.Suspense fallback={<h2>Loading Product Images...</h2>}>
                  {window.screen.width < 768 && (
                    <React.Fragment>
                      <div className={styles.skuShare__wrapper}>
                        <div>
                          <span>SKU: </span>
                          <span>{product.sku}</span>
                        </div>
                        <div>
                          <ReactSVG src={ShareIcon} />
                          <span>Share</span>
                        </div>
                      </div>
                      <h3>{product.productName}</h3>
                      <div className={styles.reviewsOverview__wrapper}>
                        {rating > 0 ? (
                          <React.Fragment>
                            <span>{rating}/5</span>
                            <div className={styles.stars__wrapper}>
                              {[...Array(Math.round(rating))].map(
                                (_, index) => (
                                  <ReactSVG src={StarIcon} key={index} />
                                ),
                              )}
                              {[...Array(5 - Math.round(rating))].map(
                                (_, index) => (
                                  <ReactSVG src={EmptyStarIcon} key={index} />
                                ),
                              )}
                            </div>
                            <FontAwesomeIcon
                              className={styles.down}
                              icon={faChevronDown}
                            />
                            <React.Suspense
                              fallback={<span>Loading Ratings...</span>}>
                              <span>
                                {reviews.length
                                  ? `${reviews.length} Ratings`
                                  : "No Ratings"}
                              </span>
                            </React.Suspense>
                          </React.Fragment>
                        ) : (
                          <span style={{ marginLeft: 0 }}>No ratings</span>
                        )}
                      </div>
                    </React.Fragment>
                  )}
                </React.Suspense>
              </div>
              <div className={styles.details__wrapper}>
                <div className={styles.header}>
                  <div className={styles.skuShare__wrapper}>
                    <div>
                      <span>SKU: </span>
                      <span>{product.sku}</span>
                    </div>
                    <div>
                      <ReactSVG src={ShareIcon} />
                      <span>Share</span>
                    </div>
                  </div>
                  <h3>{product.productName}</h3>
                  <div className={styles.reviewsOverview__wrapper}>
                    {rating > 0 ? (
                      <React.Fragment>
                        <span>{rating}/5</span>
                        <div className={styles.stars__wrapper}>
                          {[...Array(Math.round(rating))].map((_, index) => (
                            <ReactSVG src={StarIcon} key={index} />
                          ))}
                          {[...Array(5 - Math.round(rating))].map(
                            (_, index) => (
                              <ReactSVG src={EmptyStarIcon} key={index} />
                            ),
                          )}
                        </div>
                        <FontAwesomeIcon
                          className={styles.down}
                          icon={faChevronDown}
                        />
                        <React.Suspense
                          fallback={<span>Loading Ratings...</span>}>
                          <span>
                            {reviews.length
                              ? `${reviews.length} Ratings`
                              : "No Ratings"}
                          </span>
                        </React.Suspense>
                      </React.Fragment>
                    ) : (
                      <span style={{ marginLeft: 0 }}>No ratings</span>
                    )}
                  </div>
                  <div className={styles.price__wrapper}>
                    <div className={styles.newPrice}>
                      <span>{renderCurrencyLocale(product.currentPrice)}</span>
                    </div>
                    <div className={styles.wrapper}>
                      <div className={styles.oldPrice}>
                        <span>{renderCurrencyLocale(product.oldPrice)}</span>
                        <div className={styles.bar} />
                      </div>
                      <div className={styles.discount__wrapper}>
                        <span className={styles.discount__percentage}>
                          -{discountPercentage} %
                        </span>
                        <span className={styles.discount__value}>
                          C${discountValue} OFF
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.footer}>
                  {window.screen.width < 768 ? (
                    <ProductOptions
                      quantityValidator={quantityValidator}
                      numAvailableColors={3}
                      selectedColor={selectedColor}
                      wheelSize={wheelSize}
                      numAvailableProducts={12}
                      numProducts={numProducts}
                      quantityError={quantityError}
                      setOptionsType={setOptionsType}
                      setOptions={setOptions}
                      setShowProductOptionsModal={setShowProductOptionsModal}
                    />
                  ) : (
                    <React.Fragment>
                      <div className={styles.specs__wrapper}>
                        <div className={styles.colors__wrapper}>
                          <div className={styles.wrapper}>
                            <span>Colors: </span>
                            <span>(3 available)</span>
                          </div>
                          <InputDropdown2
                            options={capitalizeOptions(product.colorOptions)}
                          />
                        </div>
                        <div className={styles.wheels}>
                          <InputDropdown2
                            options={capitalizeOptions(product.wheelOptions)}
                          />
                        </div>
                      </div>
                      <div className={styles.quantity__wrapper}>
                        <p>Quantity:</p>
                        <div className={styles.wrapper}>
                          <div className={styles.counter}>
                            <button
                              onClick={() =>
                                quantityValidator(
                                  product.itemsInStock,
                                  numProducts,
                                  "minus",
                                )
                              }>
                              <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <span>{numProducts}</span>
                            <button
                              onClick={() =>
                                quantityValidator(
                                  product.itemsInStock,
                                  numProducts,
                                  "plus",
                                )
                              }>
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          </div>
                          <div className={styles.stock}>
                            <span>{product.itemsInStock}</span>
                            <span>In Stock</span>
                          </div>
                          {quantityError && (
                            <p className={styles.error__wrapper}>
                              {quantityError}
                            </p>
                          )}
                        </div>
                      </div>
                    </React.Fragment>
                  )}
                  {window.screen.width >= 768 ? (
                    <div className={styles.buy__wrapper}>
                      <Button content={"Buy It Now"} />
                      <Button2
                        content={"Add To Cart"}
                        handleClick={() =>
                          addToCartClickHandler(product.id, numProducts)
                        }
                      />
                      <div className={styles.options__wrapper}>
                        {wishlistProduct ? (
                          <ReactSVG
                            beforeInjection={(svg) => {
                              svg.setAttribute("style", `width: 1.1rem`);
                              svg.setAttribute("style", `height: 1.1rem`);
                              svg.setAttribute("style", `margin-bottom: -6px`);
                              svg.children[0].setAttribute(
                                "style",
                                `stroke: #ff5722`,
                              );
                            }}
                            src={FullHeartIcon}
                            onClick={() => {
                              setWishlistProduct(false);
                              dispatch(removeWishlistItem(product.id));
                            }}
                          />
                        ) : (
                          <ReactSVG
                            beforeInjection={(svg) => {
                              svg.setAttribute("style", `width: 1.1rem`);
                              svg.setAttribute("style", `height: 1.1rem`);
                              svg.setAttribute("style", `margin-bottom: -6px`);
                            }}
                            src={EmptyHeartIcon}
                            onClick={() => {
                              setWishlistProduct(true);
                              dispatch(addItemToWishlist(product.id));
                            }}
                          />
                        )}
                        <ReactSVG
                          src={ScaleIcon}
                          onClick={() => dispatch(addToComparison(product.id))}
                        />
                      </div>
                    </div>
                  ) : (
                    <FixedBottomBar id={product.id} />
                  )}
                </div>
                <div className={styles.logos__wrapper}>
                  <ReactSVG src={G_PAYBRIGHT} />
                  <ReactSVG src={G_KLARNA} />
                  <ReactSVG src={G_DUTY_FREE} />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.options__description__wrapper}>
            {/* Assurance Parameters */}
            <QualityAssuranceBanner />
            {productBundles.length > 0 ? (
              window.screen.width < 768 ? (
                <MobileBundlePack
                  setShowChangeProductModal={setShowChangeProductModal}
                  secondaryProductId={activeBundle.secondaryProductId}
                  mainProductData={product}
                  bundleTotal={bundleTotal}
                  setBundleTotal={setBundleTotal}
                />
              ) : (
                <BundlePack
                  setShowChangeProductModal={setShowChangeProductModal}
                  secondaryProductId={activeBundle.secondaryProductId}
                  mainProductData={product}
                  bundleTotal={bundleTotal}
                  setBundleTotal={setBundleTotal}
                />
              )
            ) : null}
            <div className={styles.navigation__wrapper}>
              <ul>
                {navigationViews.map((view, index) => (
                  <li key={index} onClick={() => scrollToNavOption(view.ref)}>
                    <span>{view.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div ref={descriptionRef} className={styles.description}>
              <h4>Description</h4>
              {documentToReactComponents(
                product.description,
                blogContentOptions,
              )}
            </div>
            <div className={styles.proprieties}>
              {Object.keys(highlightedProperties).map((property, index) => (
                <div key={index} className={styles.propriety__block}>
                  <span className={styles.propriety__name}>
                    {property == "topSpeed"
                      ? highlightedProperties[property] + "+"
                      : highlightedProperties[property]}
                  </span>
                  <span className={styles.propriety}>
                    {toCapitalSpace(property)}
                  </span>
                </div>
              ))}
            </div>
            <div ref={parametersRef} className={styles.parameters}>
              <h4>Parameters</h4>
              <Parameters parameters={objectedProperties(product)} />
            </div>
            <div className={styles.shipping__warranty}>
              <h4>Shipping & Warranty</h4>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but
              </p>
            </div>
            <div ref={faqRef} className={styles.faq}>
              <h4>Frequently Asked Questions</h4>
              <FAQSection
                faqContent={product.frequentlyAskedQuestions.content}
              />
            </div>
            <div className={styles.photos__videos}>
              {window.screen.width >= 768 ? (
                <React.Fragment>
                  <h4>Photos & Videos</h4>
                  <PhotosVideosSection />
                </React.Fragment>
              ) : (
                <MobilePhotosVideosSection />
              )}
            </div>
            <div ref={reviewsRef} className={styles.reviews}>
              <h4>Verified Reviews</h4>
              <Suspense fallback={<h2>Loading Reviews...</h2>}>
                <ReviewSection
                  setShowReviewModal={setShowReviewModal}
                  reviews={reviews}
                />
              </Suspense>
            </div>
            <div className={styles.relatedProducts}>
              <RelatedProducts category={product.category} />
            </div>
          </div>
        </div>
      ) : (
        <h3>Loading Product Data...</h3>
      )}
      {!!showProductOptionsModal && (
        <ProductOptionsModal
          optionsType={optionsType}
          options={options}
          setShowProductOptionsModal={setShowProductOptionsModal}
          setSelectedColor={setSelectedColor}
          setWheelSize={setWheelSize}
          selectedColor={selectedColor}
          wheelSize={wheelSize}
        />
      )}
      {!!showReviewModal && (
        <ReviewModal
          setShowReviewModal={setShowReviewModal}
          productId={productItemId}
        />
      )}
      {!!showChangeProductModal && (
        <ChangeProductModal
          setShowChangeProductModal={setShowChangeProductModal}
          setSecondaryProductId={setSecondaryProductId}
        />
      )}
    </Layout>
  );
}

ProductPage = withFirebase(ProductPage);

export default ProductPage;

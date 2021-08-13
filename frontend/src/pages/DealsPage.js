import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import styles from "../styles/DealsPage.module.scss";
import FilterMenu from "../components/ProductsPage/FilterMenu/FilterMenu";
import Pagination from "../components/ProductsPage/Pagination/Pagination";
import FilterModal from "../components/Mobile/ProductsPage/FilterModal/FilterModal";
import SortModal from "../components/Mobile/ProductsPage/SortModal/SortModal";
import MobileHeader from "../components/Mobile/ProductsPage/MobileHeader/MobileHeader";
import ProductsContainer from "../components/ProductsPage/ProductsContainer/ProductsContainer";
import { useDispatch, useSelector } from "react-redux";
import AddedToCartModal from "../components/AddedToCartModal/AddedToCartModal";
import axios from "axios";
import { addFilter } from "../actions/filtersActions";
import SortMenu from "../components/ProductsPage/SortMenu/SortMenu";
import { generateQuery } from "../helpers/filteredQueryGenerator";

require("dotenv").config();

export default function DealsPage() {
  const filters = useSelector((state) => state.filters.filters);
  const dispatch = useDispatch();

  const [listOrder, setListOrder] = useState(false);
  const [products, setProducts] = useState([]);
  const [queryFilters, setQueryFilters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [configuredFilters, setConfiguredFilters] = useState(null);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showATCModal, setShowATCModal] = useState(false);
  const [modalProductId, setModalProductId] = useState("");

  const [maxPrice, setMaxPrice] = useState(0);

  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(maxPrice);

  // Filters
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [maxSpeed, setMaxSpeed] = useState([]);
  const [maxLoad, setMaxLoad] = useState([]);
  const [colors, setColors] = useState([]);
  const [orderBy, setOrderBy] = useState("productName_ASC");

  // Pagination
  const [numPages, setNumPages] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [numItemsPerPage, setNumItemsPerPage] = useState(12);
  const [pageProducts, setPageProducts] = useState([]);

  const [query, setQuery] = useState(
    `
      query {
        productCollection(where: { dealProduct: true }) {
          items {
            dealProduct
            productName
            productImage {
              url
            }
            sku
            oldPrice
            brand
            currentPrice
            sys {
              id
            }
          }
        }
      }
    `,
  );

  const fetchProducts = async () => {
    const result = await axios({
      method: "post",
      url: `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}?access_token=EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
      data: JSON.stringify({ query }),
      headers: {
        Authorization: `Bearer EeOXfLaUiF9j7e-yDu2cQv3rQi8exn4uYZaz64djcWU`,
        "Content-Type": "application/json",
      },
    });

    setProducts(result.data.data.productCollection.items);
  };

  useEffect(() => {
    showSortMenu && document.body.setAttribute("style", "overflow: hidden");
    !showSortMenu && document.body.setAttribute("style", "overflow: unset");
  }, [showSortMenu]);

  useEffect(() => {
    showFilterMenu && document.body.setAttribute("style", "overflow: hidden");
    !showFilterMenu && document.body.setAttribute("style", "overflow: unset");
  }, [showFilterMenu]);

  useEffect(() => {
    showATCModal && document.body.setAttribute("style", "overflow: hidden");
    !showATCModal && document.body.setAttribute("style", "overflow: unset");
  }, [showATCModal]);

  useEffect(() => {
    setNumPages(Math.ceil(products.length / numItemsPerPage));
  }, [products, numItemsPerPage]);

  useEffect(() => {
    let prevPage = currentPage - 1;
    let lastPageLastProductIndex = prevPage * numItemsPerPage;
    let currentPageIndex = currentPage * numItemsPerPage;
    setPageProducts(products.slice(lastPageLastProductIndex, currentPageIndex));
    console.log(lastPageLastProductIndex, currentPageIndex);
  }, [currentPage, numPages]);

  useEffect(() => {
    fetchProducts();
    setLoading(false);
  }, [listOrder, configuredFilters, query]);

  const filterProducts = (orderBy) => {
    const query = generateQuery(filters, orderBy);
    setQuery(query);
    fetchProducts();
    dispatch(addFilter("minPrice", 0));
    dispatch(addFilter("maxPrice", maxPrice));
  };

  const calculateMaxPrice = (items) => {
    let maxPrice = 0;

    for (let i = 0; i < items.length; i++)
      if (items[i].currentPrice > maxPrice) maxPrice = items[i].currentPrice;

    setMaxPrice(parseFloat(maxPrice));

    dispatch(addFilter("maxPrice", maxPrice));
  };

  useEffect(() => {
    filterProducts(orderBy);
  }, [orderBy]);

  useEffect(() => {
    dispatch(addFilter("minPrice", low));
    dispatch(addFilter("maxPrice", high));
  }, [low, high]);

  return (
    <Layout>
      <div className={styles.productsPage__container}>
        <FilterMenu
          listOrder={listOrder}
          setListOrder={setListOrder}
          queryFilters={queryFilters}
          setConfiguredFilters={setConfiguredFilters}
          stateCategories={categories}
          setCategories={setCategories}
          stateBrands={brands}
          setBrands={setBrands}
          maxSpeed={maxSpeed}
          setMaxSpeed={setMaxSpeed}
          maxLoad={maxLoad}
          setMaxLoad={setMaxLoad}
          colors={colors}
          setColors={setColors}
          orderBy={orderBy}
          filterProducts={filterProducts}
          maxPrice={maxPrice}
          low={low}
          high={high}
          setLow={setLow}
          setHigh={setHigh}
        />
        <div className={styles.products__wrapper}>
          {window.screen.width > 768 ? (
            <SortMenu
              listOrder={listOrder}
              setListOrder={setListOrder}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
              numItems={products?.length && products?.length}
              numItemsPerPage={numItemsPerPage}
              currentPage={currentPage}
              setNumItemsPerPage={setNumItemsPerPage}
            />
          ) : (
            <MobileHeader
              setShowSortMenu={setShowSortMenu}
              setShowFilterMenu={setShowFilterMenu}
              numItems={products?.length && products?.length}
              numItemsPerPage={numItemsPerPage}
              currentPage={currentPage}
              setNumItemsPerPage={setNumItemsPerPage}
            />
          )}
          <React.Suspense fallback={<h2>Loading Products...</h2>}>
            <ProductsContainer
              listOrder={listOrder}
              products={pageProducts}
              setShowATCModal={setShowATCModal}
              setModalProductId={setModalProductId}
            />
            <Pagination
              numPages={numPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </React.Suspense>
        </div>
      </div>
      {showSortMenu && <SortModal setShowSortMenu={setShowSortMenu} />}
      {showFilterMenu && (
        <FilterModal
          setShowFilterMenu={setShowFilterMenu}
          setConfiguredFilters={setConfiguredFilters}
        />
      )}
      {!!showATCModal && (
        <AddedToCartModal
          modalProductId={modalProductId}
          setShowATCModal={setShowATCModal}
        />
      )}
    </Layout>
  );
}

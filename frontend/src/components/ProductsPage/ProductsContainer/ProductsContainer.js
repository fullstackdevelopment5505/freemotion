import React, { useEffect, useState } from "react";
import ListProduct from "./ListProduct/ListProduct";
import styles from "./ProductsContainer.module.scss";
import { filterTagsGenerator } from "../../../helpers/generateFilterTags";
import ProductImage from "../../../images/e-Unicycles 5.png";
import { useSelector } from "react-redux";

// Normal Product
import Product from "./Product/Product";
// Mobile View Product
import { default as MobileProduct } from "../../Mobile/ProductsPage/Product/Product";

import { objectedProperties } from "../../ProductPage/helpers";

export default function ProductsContainer({
  listOrder,
  products,
  setShowATCModal,
  setModalProductId,
}) {
  const [isMobile, setIsMobile] = useState(false);
  const filters = useSelector((state) => state.filters.filters);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const getScreenWidth = () => {
      if (window.screen.width < 768) setIsMobile(true);
    };

    getScreenWidth();
  }, [listOrder]);

  return (
    <div
      className={styles.products__container}
      style={{
        flexDirection: listOrder === true ? "column" : "row",
      }}>
      {!!products &&
        products.length &&
        products.map((product, index) =>
          isMobile ? (
            <MobileProduct
              key={index}
              name={product.productName}
              oldPrice={product.oldPrice}
              newPrice={product.currentPrice}
              brand={product.brand}
              SKU={product.sku}
              discountPercentage={30}
              productImage={product.productImage?.url}
              id={product.sys?.id}
              setShowATCModal={setShowATCModal}
              setModalProductId={setModalProductId}
            />
          ) : listOrder === true ? (
            <ListProduct
              key={index}
              name={product.productName}
              oldPrice={product.oldPrice}
              newPrice={product.currentPrice}
              SKU={product.sku}
              discountPercentage={30}
              productImage={product.productImage?.url}
              expanded={expanded}
              setExpanded={setExpanded}
              index={index}
              id={product.sys?.id}
              setShowATCModal={setShowATCModal}
              setModalProductId={setModalProductId}
            />
          ) : (
            <Product
              key={index}
              name={product.productName}
              oldPrice={product.oldPrice}
              newPrice={product.currentPrice}
              brand={product.brand}
              description={product.description}
              specs={objectedProperties(product)}
              SKU={product.sku}
              discountPercentage={30}
              productImage={product.productImage?.url}
              id={product.sys?.id}
              setShowATCModal={setShowATCModal}
              setModalProductId={setModalProductId}
            />
          ),
        )}
    </div>
  );
}

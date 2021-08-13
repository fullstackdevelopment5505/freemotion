import React, { useState, useEffect } from "react";
import styles from "./ComparedProductsContainer.module.scss";
import Product from "./Product/Product";
import { useSelector } from "react-redux";
import { objectedProperties } from "../../ProductPage/helpers";
import EmptyComparisonSpace from "./EmptyComparisonSpace/EmptyComparisonSpace";

export default function ComparedProductsContainer({
  setShowModal,
  setProductId,
  products,
  setShowDescriptionModal,
}) {
  const [renderEmptyColumns, setRenderEmptyColumns] = useState(true);
  const [numEmptyColumns, setNumEmptyColumns] = useState(3);

  useEffect(() => {
    if (products.length >= 3) setRenderEmptyColumns(false);
    else setNumEmptyColumns(3 - products.length);
  }, [products]);

  return (
    <div className={styles.products__container}>
      <React.Suspense fallback={<p>Loading Data...</p>}>
        {products.length > 0 &&
          products.map((product, index) => (
            <Product
              productId={product.sys.id}
              key={index}
              sku={product.sku}
              oldPrice={product.oldPrice}
              newPrice={product.currentPrice}
              productName={product.productName}
              stock={product.itemsInStock}
              productImage={product.productImage.url}
              productDescription={product.description}
              specs={objectedProperties(product)}
              discountPercentage={30}
              setProductId={setProductId}
              setShowDescriptionModal={setShowDescriptionModal}
              colors={product.colorOptions}
            />
          ))}
      </React.Suspense>
      {!!renderEmptyColumns &&
        [...Array(numEmptyColumns)].map((_, index) => (
          <EmptyComparisonSpace key={index} setShowModal={setShowModal} />
        ))}
    </div>
  );
}

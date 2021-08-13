import React from "react";
import { ReactSVG } from "react-svg";
import styles from "./BrandsContainerHero.module.scss";
const SVGSFilePath = require.context("../../../svgs/brands", true, /\.svg$/);

export default function BrandsContainerHero() {
  let svgFiles = SVGSFilePath.keys().reduce((svgs, path) => {
    svgs[path] = SVGSFilePath(path);
    return svgs;
  }, {});

  console.log(
    svgFiles["./currus.svg"].default
      .split("/media")[1]
      .split(".")[0]
      .substring(1),
  );

  return (
    <div className={styles.container}>
      {Object.keys(svgFiles).map((brand, index) => (
        <div key={index} className={styles.brand__wrapper}>
          <div className={styles.wrapper}>
            <ReactSVG src={svgFiles[brand].default} />
            <span>
              {svgFiles[brand].default
                .split("/media")[1]
                .split(".")[0]
                .substring(1)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

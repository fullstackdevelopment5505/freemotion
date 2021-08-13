import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./OrderSteps.module.scss";

export const Step = ({ step, stage, currentStep, setCurrentStep }) => {
  const history = useHistory();

  return (
    <div
      className={styles.stepBlock}
      onClick={() => {
        setCurrentStep(step);
        history.push(`/checkout/${step}`);
      }}
      style={
        step === currentStep
          ? { borderBottom: "1px solid #212121", opacity: 1 }
          : {}
      }>
      <div className={styles.step__wrapper}>
        <span>{step}</span>
      </div>
      <span>{stage}</span>
    </div>
  );
};

export default function OrderSteps({ currentStep, setCurrentStep }) {
  let stages = [
    "Shipping",
    "Payment",
    window.screen.width < 575.98 ? "Complete" : "Complete Order",
  ];

  // let stages = window.screen.width < 575.98 ? mobileStages : desktopStages;

  return (
    <div className={styles.stepsContainer__wrapper}>
      <div className={styles.steps__container}>
        {stages.map((stage, index) => (
          <Step
            key={index}
            step={index + 1}
            stage={stage}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        ))}
      </div>
    </div>
  );
}

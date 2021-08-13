import React from "react";
import styles from "./GuideContent.module.scss";

import CostIcon from "../../../svgs/buying_guide/ic_cost.svg";
import EaseOfUseIcon from "../../../svgs/buying_guide/ic_easy_to_use.svg";
import ComfortIcon from "../../../svgs/buying_guide/ic_comfort.svg";
import SafetyIcon from "../../../svgs/buying_guide/ic_safety.svg";
import RangeIcon from "../../../svgs/buying_guide/ic_range.svg";
import BatteryIcon from "../../../svgs/buying_guide/ic_battery.svg";
import GuideBlock from "./GuideBlock/GuideBlock";

export default function GuideContent() {
  const guideContent = [
    {
      icon: CostIcon,
      title: "Cost",
      content:
        "Starting around $750, Electric Scooters are within the reach of just about anyone, with an acquisition cost less than the yearly maintenance cost of an automobile. ",
      note:
        "It is possible to find electric scooters far cheaper than the above-quoted price. At this price point expect under-powered motors, low capacity batteries, small wheels, and worst of all weak brakes. Any scooters in this LOW BUDGET class are not recommended for anything but minimal or light recreational use, and then only with close attention to safety. A few dollars pays for a lot of safety. ",
    },
    {
      icon: EaseOfUseIcon,
      title: "Easy to use",
      content:
        "The Electric Scooter is also one of the easiest personal electric vehicles to operate, with a minimal learning curve. The new customer can be up and riding, safely, in no time. Speak with FreeMotion, we can help. ",
      note: "",
    },
    {
      icon: ComfortIcon,
      title: "Comfort",
      content:
        "Avoid Electric Scooters without either suspension or air tires. They can be practically unrideable even on normal pavement. Every bump in the road is transmitted up through the handle-bars to the hands and through the base to the feet. A smooth ride is a comfortable ride. The higher-end electric scooters are as smooth as a luxury car. ",
      note: "",
    },
    {
      icon: SafetyIcon,
      title: "Safety",
      content:
        "Electric Scooters should have a minimal play or “give” in the vertical handle-bar which can cause wobbling at any velocity. A good eScooter will feel firm, predictable, and stable while cruising at speed or standing still. Firm control is safe to control. Brakes should be easy to reach, firm, and effective. ",
      note: "",
    },
    {
      icon: RangeIcon,
      title: "Range",
      content:
        "The reality of range can be confusing as there are so many real-life variables which have a dramatic effect on the range. Predicting eScooter range can be a guessing game. The rider’s weight, height, as well as wind load, terrain, and topography (hills) all have effects on the range. If one commute involves much stopping and starting, this too can affect range. Feel free to contact us to discuss your needs.",
      note: "",
    },
    {
      icon: BatteryIcon,
      title: "Battery",
      content:
        "The capacity of a battery is measured in Watt-hours (Wh). This represents the amount of energy stored in the battery. Many manufacturers will quote the battery size in Ah, or Amp Hours which is a measure of current. This is only useful for comparisons if the nominal voltage output of the batteries compared is the same. This is somewhat misleading as one needs to do a calculation to make comparisons. If the battery voltage is known, the Watt-hour figure can be derived by multiplying the Amp-hour rating by the nominal voltage. (Ah x Voltage = Wh). A better specification of the capacity of the battery is Watt-hours. We can give you this information for all of our products. ",
      note: "",
    },
  ];

  return (
    <div className={styles.container}>
      {guideContent.map((block, index) => (
        <GuideBlock
          key={index}
          icon={block.icon}
          title={block.title}
          content={block.content}
          note={block.note}
        />
      ))}
    </div>
  );
}

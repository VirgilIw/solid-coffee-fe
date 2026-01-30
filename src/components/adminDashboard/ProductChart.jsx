import React from "react";

import CupIcon from "../../assets/adminDashborad/CircleWithCup.svg";
import TruckIcon from "../../assets/adminDashborad/TruckWithCup.svg";
import UserIcon from "../../assets/adminDashborad/CircleWithUserIcon.svg";
import ArrowRise from "../../assets/adminDashborad/Arrow-rise.svg";

function ProductChart() {
  return (
    <div className="p-5">
      <div className="grid grid-cols-3 gap-4 text-white">
        <div className="flex flex-col justify-center gap-2 rounded-lg border-0 bg-green-700 p-4">
          <div className="flex items-center gap-2">
            <div>
              <img src={CupIcon} alt="cup-icon" />
            </div>
            <div>
              <p>Order On Progress</p>
            </div>
          </div>
          <div>
            <p>
              200{" "}
              <span>
                +11.01%{" "}
                <img
                  className="inline w-fit"
                  src={ArrowRise}
                  alt="arrow-rise"
                />
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2 rounded-lg border-0 bg-blue-800 p-4">
          <div className="flex items-center gap-2">
            <div>
              <img src={TruckIcon} alt="truck-icon" />
            </div>
            <div>
              <p>Order Shipping</p>
            </div>
          </div>
          <div>
            <p>
              100{" "}
              <span>
                +4.01%{" "}
                <img
                  className="inline w-fit"
                  src={ArrowRise}
                  alt="arrow-rise"
                />
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2 rounded-lg border-0 bg-violet-800 p-4">
          <div className="flex items-center gap-2">
            <div>
              <img src={UserIcon} alt="user-icon" />
            </div>
            <div>
              <p>Order Done</p>
            </div>
          </div>
          <div>
            <p>
              50{" "}
              <span>
                +2.01%{" "}
                <img
                  className="inline w-fit"
                  src={ArrowRise}
                  alt="arrow-rise"
                />
              </span>
            </p>
          </div>
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
}

export default ProductChart;

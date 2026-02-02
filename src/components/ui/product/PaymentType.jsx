import bri from "../../../assets/product/Bank-BRI.svg";
import dana from "../../../assets/product/logo-DANA.svg";
import bca from "../../../assets/product/Bank-BCA.svg";
import gopay from "../../../assets/product/logo-GoPay.svg";
import ovo from "../../../assets/product/Ovo.svg";
import paypal from "../../../assets/product/logo_paypal.svg";

export function PaymentType() {
  return (
    <div>
      <div>
        <p className="text-md mb-3 text-gray-600">We Accept</p>
        <div className="mb-3 flex items-center justify-around lg:gap-10">
          <label className="cursor-pointer">
            <input
              type="radio"
              name="payment_type"
              value="bri"
              className="peer sr-only appearance-none"
            />
            <div className="peer-checked:bg-brand-orange p-2 peer-checked:rounded">
              <img src={bri} alt="bank-bri" />
            </div>
          </label>

          <label className="cursor-pointer">
            <input
              type="radio"
              name="payment_type"
              value="dana"
              className="peer sr-only appearance-none"
            />
            <div className="peer-checked:bg-brand-orange rounded px-2 py-4">
              <img src={dana} alt="dana" />
            </div>
          </label>

          <label className="cursor-pointer">
            <input
              type="radio"
              name="payment_type"
              value="bca"
              className="peer sr-only appearance-none"
            />
            <div className="peer-checked:bg-brand-orange rounded px-2 py-4">
              <img src={bca} alt="bank-bca" />
            </div>
          </label>

          <label className="cursor-pointer">
            <input
              type="radio"
              name="payment_type"
              value="gopay"
              className="peer sr-only appearance-none"
            />
            <div className="peer-checked:bg-brand-orange rounded">
              <img src={gopay} alt="gopay" className="rounded px-2 py-4" />
            </div>
          </label>
          <label className="cursor-pointer">
            <input
              type="radio"
              name="payment_type"
              value="ovo"
              className="peer sr-only appearance-none"
            />
            <div className="peer-checked:bg-brand-orange rounded px-2 py-4">
              <img src={ovo} alt="ovo" />
            </div>
          </label>
          <label className="cursor-pointer">
            <input
              type="radio"
              name="payment_type"
              value="paypal"
              className="peer sr-only appearance-none"
            />
            <div className="peer-checked:bg-brand-orange rounded px-2 py-2">
              <img src={paypal} alt="paypal" />
            </div>
          </label>
        </div>
        <p className="text-md text-gray-500">
          *Get Discount if you pay with Bank Central Asia
        </p>
      </div>
    </div>
  );
};

export default PaymentType;

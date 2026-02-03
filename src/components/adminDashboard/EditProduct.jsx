import { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import Xicon from "../../assets/adminDashborad/XCircle.svg";
import Image from "../../assets/adminDashborad/Image.svg";

function EditProduct({ isEditbarOpen, toggleEditbar, selectProduct }) {
  useEffect(() => {
    return () => {
      selectProduct;
    };
  }, [selectProduct]);

  const [editProduct, setEditProduct] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    photo: [],
    photoPreview: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditProduct((prev) => ({
          ...prev,
          photo: file,
          photoPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Edit Product:", editProduct);

    setEditProduct({
      name: "",
      price: "",
      description: "",
      stock: "",
      photo: null,
      photoPreview: null,
    });
    toggleEditbar();
  };

  return (
    <div>
      <div
        className={`fixed top-0 right-0 z-40 h-full w-full transform bg-white py-10 shadow-2xl transition-transform duration-300 ease-in-out md:w-96 ${isEditbarOpen ? "translate-x-0" : "translate-x-full"} `}
      >
        <div className="flex h-full flex-col overflow-y-auto p-6">
          <div className="flex items-center justify-between py-4">
            <h2 className="text-xl font-bold text-gray-800">Edit Product</h2>
            <button
              onClick={toggleEditbar}
              className="rounded-lg bg-white p-2 hover:brightness-75"
            >
              <img src={Xicon} alt="x-icon" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <p className="mb-4 text-lg font-semibold text-gray-800">
                Photo Product
              </p>
              <div className="flex flex-col">
                <div className="mb-4">
                  {selectProduct.photo ? (
                    <div className="relative">
                      <img
                        src={selectProduct.photo}
                        alt="Product preview"
                        className="h-48 w-48 rounded-lg border-2 border-gray-200 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setEditProduct((prev) => ({
                            ...prev,
                            photo: null,
                            photoPreview: null,
                          }))
                        }
                        className="absolute -top-2 -right-2 rounded-full bg-white p-1 hover:brightness-75"
                      >
                        <img src={Xicon} alt="x-icon" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex h-15 w-15 flex-col items-center justify-center rounded-lg border-2 border-gray-300 bg-gray-50">
                      <img src={Image} alt="image-icon" />
                    </div>
                  )}
                </div>

                <label className="cursor-pointer">
                  <div className="bg-brand-orange flex w-fit items-center gap-2 rounded-lg px-6 py-3 font-medium text-white shadow-sm transition-colors hover:brightness-75">
                    <Upload size={20} />
                    <span>Upload</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Product name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  placeholder={selectProduct.name}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Price
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="price"
                    onChange={handleInputChange}
                    placeholder={selectProduct.price}
                    className="w-full rounded-lg border border-gray-300 p-3 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  onChange={handleInputChange}
                  placeholder={selectProduct.description}
                  rows="4"
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  onChange={handleInputChange}
                  placeholder={selectProduct.stock}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-brand-orange w-full rounded-lg p-2 font-medium text-black shadow-sm transition-colors hover:brightness-75"
                >
                  Edit Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;

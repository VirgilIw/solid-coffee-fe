import { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import Xicon from "../../assets/adminDashborad/XCircle.svg";
import Image from "../../assets/adminDashborad/Image.svg";
import { useDispatch } from "react-redux";
import { insertMenu } from "../../redux/slices/menu.slice";
import Modal from "../modal/Modal";

function AddMenu({ isAddbarOpen, toggleAddbar }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const dispatch = useDispatch();
  const [newMenu, setNewMenu] = useState({
    menu_name: "",
    price: "",
    description: "",
    stock: "",
    images_file: [],
    photoPreview: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMenu((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewMenu((prev) => ({ ...prev, images_file: files }));
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setNewMenu((prev) => ({
      ...prev,
      photoPreview: previewUrls,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("menu_name", newMenu.menu_name);
    formData.append("price", newMenu.price);
    formData.append("description", newMenu.description);
    newMenu.images_file.map((file) => formData.append("images_file", file));
    try {
      dispatch(insertMenu(formData));

      setNewMenu({
        menu_name: "",
        price: "",
        description: "",
        stock: "",
        images_file: [],
        photoPreview: [],
      });
      toggleAddbar();
      openModal();
    } catch {
      return;
    }
  };

  useEffect(() => {
    return () => {
      newMenu.photoPreview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [newMenu.photoPreview]);

  return (
    <div>
      <div
        className={`fixed top-0 right-0 z-40 h-full w-full transform bg-white py-10 shadow-2xl transition-transform duration-300 ease-in-out md:w-96 ${isAddbarOpen ? "translate-x-0" : "translate-x-full"} `}
      >
        <div className="flex h-full flex-col overflow-y-auto p-6">
          <div className="flex items-center justify-between py-4">
            <h2 className="text-xl font-bold text-gray-800">Add Menu</h2>
            <button
              onClick={toggleAddbar}
              className="rounded-lg bg-white p-2 hover:brightness-75"
            >
              <img src={Xicon} alt="x-icon" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <p className="mb-4 text-lg font-semibold text-gray-800">
                Photo Menu
              </p>
              <div className="flex flex-col">
                <div className="mb-4 flex flex-wrap gap-4">
                  {newMenu.photoPreview.length > 0 ? (
                    <div className="relative">
                      {newMenu.photoPreview.map((file, index) => (
                        <img
                          key={index}
                          src={file}
                          alt="menu preview"
                          className="h-48 w-48 rounded-lg border-2 border-gray-200 object-cover"
                        />
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          setNewMenu((prev) => ({
                            ...prev,
                            images_file: [],
                            photoPreview: [],
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
                    name="images_file"
                    multiple
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
                  menu name
                </label>
                <input
                  type="text"
                  name="menu_name"
                  value={newMenu.menu_name}
                  onChange={handleInputChange}
                  placeholder="Enter Menu Name"
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
                    value={newMenu.price}
                    onChange={handleInputChange}
                    placeholder="Enter Menu Price"
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
                  value={newMenu.description}
                  onChange={handleInputChange}
                  placeholder="Enter Menu Description"
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
                  value={newMenu.stock}
                  onChange={handleInputChange}
                  placeholder="Enter Menu Stock"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <button
                  // onClick={openModal}
                  type="submit"
                  className="bg-brand-orange w-full rounded-lg p-2 font-medium text-black shadow-sm transition-colors hover:brightness-75"
                >
                  Save Menu
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex h-fit w-fit">
          <p>Test</p>
        </div>
        <div className="flex w-full items-center justify-center">
          <button
            onClick={closeModal}
            type="submit"
            className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition-colors duration-200 ease-in-out select-none peer-checked:bg-blue-600 peer-checked:text-white hover:bg-gray-100 peer-checked:hover:bg-blue-700"
          >
            Ok
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default AddMenu;
import React from "react";
import EyeClose from "../components/ui/EyeClose";
import EyeOpen from "../components/ui/EyeOpen";

export default function Profile() {
  const [isPass, setIsPass] = React.useState(false);
  const [avatar, setAvatar] = React.useState("");
  const [preview, setPreview] = React.useState("");
  const [show, setShow] = React.useState({
    old: false,
    new: false,
  });
  const [errMessage, setErrMessage] = React.useState("");
  const [formData, setFormData] = React.useState({
    fullName: "Ghaluh Wizard",
    email: "ghaluhwiz@gmail.com",
    phone: "0821603438",
    address: "Griya Bandung Indah",
    oldPassword: "",
    newPassword: "",
  });
  const [successMsg, setSuccesMsg] = React.useState("");
  const API_URL = import.meta.env.VITE_SOLID_API_URL;

  const toggleEye = (key) => {
    setShow((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleNewPassword = () => {
    setIsPass(!isPass);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (preview) URL.revokeObjectURL(preview);

      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      // ===== UPDATE PROFILE DATA =====
      const form = new FormData();
      form.append("fullname", formData.fullName);
      form.append("phone", formData.phone);
      form.append("address", formData.address);

      // kalau pilih foto baru
      const fileInput = document.getElementById("profile");
      if (fileInput.files[0]) {
        form.append("photo", fileInput.files[0]);
      }

      const resProfile = await fetch(`${API_URL}/user/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      const dataProfile = await resProfile.json();

      if (!resProfile.ok) {
        throw new Error(dataProfile.message);
      }

      // ===== UPDATE PASSWORD (kalau diaktifkan) =====
      if (isPass) {
        const resPass = await fetch(`${API_URL}/user/password/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            old_password: formData.oldPassword,
            new_password: formData.newPassword,
          }),
        });

        const dataPass = await resPass.json();

        if (!resPass.ok) {
          throw new Error(dataPass.message);
        }
      }

      setSuccesMsg("Update Profile Success 🎉");
      setTimeout(() => setSuccesMsg(""), 3000);
    } catch (err) {
      setErrMessage(err.message);
    }
  };

  React.useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  React.useEffect(() => {
    const url = `${API_URL}/user/`;
    const token = localStorage.getItem("token");

    (async () => {
      try {
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const data = await res.json();
       
        // mapping data dari backend ke state
        setFormData((prev) => ({
          ...prev,
          fullName: data.data.fullname,
          email: data.data.email,
          phone: data.data.phone,
          address: data.data.address,
        }));

        setAvatar(data.data.avatar);
      } catch (err) {
        console.error(err.message);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 flex justify-center text-3xl font-semibold text-gray-800 lg:relative lg:top-0 lg:justify-start">
          Profile
        </h1>
        {successMsg && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-green-500 px-6 py-3 text-white shadow-lg">
            {successMsg}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT CARD - Profile Info */}
          <div className="h-fit rounded-2xl bg-white p-6 shadow-lg lg:sticky lg:top-20">
            <div className="text-center">
              {/* Profile Image */}
              <div className="relative mx-auto mb-4 h-32 w-32">
                <div className="h-full w-full overflow-hidden rounded-full bg-gray-200 ring-4 ring-orange-100">
                  <img
                    src={preview || avatar || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* User Info */}
              <h3 className="text-xl font-semibold text-gray-800">
                {formData.fullName}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{formData.email}</p>

              {/* Upload Button */}
              <label
                htmlFor="profile"
                className="mt-6 block cursor-pointer rounded-lg bg-orange-500 px-6 py-2.5 text-center font-medium text-white transition hover:bg-orange-600 active:bg-orange-700"
              >
                Upload New Photo
              </label>
              <input
                type="file"
                id="profile"
                name="profile"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              {/* Member Since */}
              <p className="mt-6 text-center text-sm text-gray-400">
                Member since 20 January 2022
              </p>
            </div>
          </div>

          {/* RIGHT FORM - Edit Profile */}
          <div className="rounded-2xl bg-white p-8 shadow-lg lg:col-span-2">
            <h2 className="mb-6 text-2xl font-semibold text-gray-800">
              Edit Profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-sm font-medium text-orange-500 transition hover:text-orange-600 hover:underline"
                    onClick={handleNewPassword}
                  >
                    {isPass ? "Cancel" : "Set New Password"}
                  </button>
                </div>

                {isPass ? (
                  <div className="space-y-4">
                    {/* OLD PASSWORD */}
                    <div className="relative">
                      <input
                        type={show.old ? "text" : "password"}
                        name="oldPassword"
                        placeholder="Old Password"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-12 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
                        value={formData.oldPassword}
                        onChange={handleInputChange}
                      />

                      <button
                        type="button"
                        onClick={() => toggleEye("old")}
                        className="absolute top-1/2 right-3 -translate-y-1/2"
                      >
                        {show.old ? <EyeOpen /> : <EyeClose />}
                      </button>
                    </div>

                    {/* NEW PASSWORD */}
                    <div className="relative">
                      <input
                        type={show.new ? "text" : "password"}
                        name="newPassword"
                        placeholder="New Password"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-12 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                      />

                      <button
                        type="button"
                        onClick={() => toggleEye("new")}
                        className="absolute top-1/2 right-3 -translate-y-1/2"
                      >
                        {show.new ? <EyeOpen /> : <EyeClose />}
                      </button>
                    </div>
                  </div>
                ) : (
                  <input
                    type="password"
                    value="••••••••"
                    disabled
                    className="w-full cursor-not-allowed rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-gray-500"
                  />
                )}
              </div>

              {/* Address */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
                  placeholder="Enter your address"
                />
              </div>
              {errMessage && (
                <p className="text-md text-red-500">{errMessage}</p>
              )}
              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white shadow-md transition hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none active:bg-orange-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser, fetchUsers } from "../../../redux/slices/user.slice";
import XCircle from "../../../assets/adminDashborad/XCircle.svg"

export default function DeleteUser({ isOpen, onClose, user }) {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDelete = async () => {
    if (!user) return;
    
    setIsDeleting(true);
    try {
      await dispatch(deleteUser(user.id)).unwrap();
      setIsSuccess(true);
      dispatch(fetchUsers());
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert(error || "Failed to delete user");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-70 flex items-end sm:items-center justify-center bg-black/50 p-4 transition-opacity duration-300">
      <div className="animate-in fade-in slide-in-from-bottom-10 sm:slide-in-from-bottom-5 flex w-full max-w-sm flex-col overflow-hidden rounded-[2.5rem] sm:rounded-3xl border border-gray-100 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] duration-300">
        <div className={isSuccess ? "bg-green-500 h-4 w-full sm:h-5" : "bg-[#D00000] h-4 w-full sm:h-5"}></div>

        <div className="flex flex-col p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4 mb-4">
                <p className="font-bold text-xl text-gray-800">Delete User</p>
                {!isSuccess && (
                  <button onClick={handleClose} className="cursor-pointer p-1">
                      <img src={XCircle} alt="Close" className="w-6 h-6 hover:scale-110 duration-300" /> 
                  </button>
                )}
            </div>

            <div className="mt-4">
                {isSuccess ? (
                  <div className="flex flex-col items-center py-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <p className="text-center text-xl font-bold text-green-600">Delete User Success</p>
                    <p className="text-center text-gray-500 mt-2 text-sm italic">
                      User <span className="font-bold text-gray-700">"{user?.fullname || user?.username}"</span> has been removed.
                    </p>
                    <button 
                      onClick={handleClose}
                      className="mt-8 bg-gray-100 text-gray-700 text-lg py-2 px-8 rounded-full hover:bg-gray-200 transition-colors w-full">
                      Done
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-center text-xl font-semibold text-[#D00000]">Are you sure?</p>
                    <p className="text-center text-gray-500 mt-2 text-sm italic">
                      You are about to delete <span className="font-bold text-gray-700">"{user?.fullname || user?.username}"</span>
                    </p>
                    <div className="flex justify-center gap-4 mt-8">
                        <button 
                          onClick={handleDelete}
                          disabled={isDeleting}
                          className="bg-[#D00000] text-white text-lg py-2 px-8 rounded-full hover:bg-red-700 transition-colors disabled:opacity-50 min-w-25">
                          {isDeleting ? "Deleting..." : "Yes"}
                        </button>
                        <button 
                          onClick={handleClose}
                          disabled={isDeleting}
                          className="bg-[#4F566533] text-[#4F5665] text-lg py-2 px-8 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 min-w-25">
                          No
                        </button>
                    </div>
                  </>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}

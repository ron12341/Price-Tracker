import { useState, useEffect } from "react";
import { useAuth } from "@context/AuthContext";

import Narvbar from "./components/Navbar";

const UserProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });

  // Update form data when user changes
  useEffect(() => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    });
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await updateUserProfile(user.id, formData, user.token);
      // setIsEditing(false);
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="min-h-screen max-w-screen flex flex-col items-center bg-[#f2f2f2] font-sans">
      <Narvbar />
      <div className="max-w-lg w-full mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">User Profile</h1>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className=" text-sm font-medium mb-1">First Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded border-gray-400"
                  required
                />
              </div>

              <div>
                <label className=" text-sm font-medium mb-1">Last Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded border-gray-400"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded border-gray-400"
                required
                disabled
              />
            </div>
            <div className="flex space-x-3">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-medium">Name</h2>
              <p className="mt-1">
                {user?.firstName} {user?.lastName}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-medium">Email</h2>
              <p className="mt-1">{user?.email}</p>
            </div>
            <div className="flex space-x-3 pt-4">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

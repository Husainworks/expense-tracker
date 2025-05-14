import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { ProfilePhotoSelector } from "../ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

export const UpdateImageModal = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { user, updateUser } = useContext(UserContext);

  const updateProfileImg = async () => {
    try {
      if (!profilePic) {
        setError("Please select an image.");
        return;
      }

      const formData = new FormData();
      formData.append("image", profilePic);
      formData.append("userId", user._id); // Send the user's ID along with the image

      const response = await axiosInstance.post(
        API_PATHS.IMAGE.UPLOAD_IMAGE,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { imageURL, updatedUser } = response.data;

      if (imageURL) {
        setSuccess("Profile image updated successfully.");

        // Update the user's profile image in the context
        updateUser(updatedUser); // Assuming `updateUser` updates the user context or state
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setError(err?.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div>
      <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

      {error && <p className="text-red-500 text-sm mx-auto mt-2">{error}</p>}
      {success && (
        <p className="text-green-500 text-sm mx-auto mt-2">{success}</p>
      )}

      <button
        className="card-btn mx-auto mt-5"
        onClick={updateProfileImg}
        disabled={!profilePic}
      >
        Update
      </button>
    </div>
  );
};

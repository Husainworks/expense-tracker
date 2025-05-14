import React, { useState } from "react";
import { getInitials } from "../../utils/helper";
import { Modal } from "../Modal/Modal";
import { UpdateImageModal } from "../UpdateImageModal/UpdateImageModal";

const CharAvatar = ({ fullName, width, height, style }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  return (
    <>
      <div
        className={`${width || "w-12"} ${height || "h-12"} ${
          style || ""
        } flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100`}
        onClick={() => setShowUpdateModal(true)}
      >
        {getInitials(fullName || "")}
      </div>

      <Modal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        title="Update Profile Photo"
      >
        <UpdateImageModal />
      </Modal>
    </>
  );
};

export default CharAvatar;

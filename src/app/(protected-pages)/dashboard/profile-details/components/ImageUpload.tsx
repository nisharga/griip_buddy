"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Avatar from "../../../components/avatar/Avatar";

const ImageUpload = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <motion.div
        className="p-2 border-2 border-dashed rounded-xl mb-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Avatar
          data-testid="profile-details-avatar"
          src={selectedImage || "/auth_user/user.png"}
          className="w-full h-auto"
        />
      </motion.div>

      <button
        onClick={handleButtonClick}
        data-testid="profile-details-change-button"
        className="w-full border border-purple-500 text-purple-500 
        rounded-xl py-2 hover:bg-purple-500 hover:text-white transition-colors"
      >
        Change
      </button>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageChange}
      />
    </>
  );
};

export default ImageUpload;

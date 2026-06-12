import React, { useState } from "react";

const ImageUploadForm = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div>
      <h1>Upload and Display Image</h1>
      <form>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </form>
      {image && (
        <div>
          <h2>Preview:</h2>
          <img src={image} alt="Uploaded preview" style={{ width: "300px" }} />
        </div>
      )}
    </div>
  );
};

export default ImageUploadForm;

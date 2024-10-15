import React from "react";
import { ImageUploadLogoForm } from "../../components/provider-components/ImageUploadLogoForm";

export const ImageUploadCamping = () => {
  return (
    <div className="container mt-5">
      <div>
      <h2 className="text-center">Subir Imágenes del Camping</h2>
      </div>
    
      <div className="row mt-12">
        <div className="col-md-12">
          <ImageUploadLogoForm />
        </div>
      </div>
    </div>
  );
};

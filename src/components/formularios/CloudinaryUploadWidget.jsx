import React, { useEffect } from 'react';

const CloudinaryUploadWidget = ({ onUpload }) => {
  useEffect(() => {
    if (!window.cloudinary) {
      console.error('Cloudinary library not loaded.');
      return;
    }

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dnrb5m9es',
        uploadPreset: 'imgCamping',
        folder: 'imgCamping',
        cropping: true,
        croppingAspectRatio: 1,
        multiple: false,
        resourceType: 'image',
        clientAllowedFormats: ['jpg', 'png'],
        maxImageFileSize: 5000000,
        showSkipCropButton: false,
        singleUploadAutoClose: false,
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          const croppedImageUrl = result.info.secure_url;
          const publicId = result.info.public_id;

          console.log('Imagen subida exitosamente:', croppedImageUrl);
          console.log('Public ID:', publicId);

          // Llamar a la función onUpload pasando la URL de la imagen
          onUpload(croppedImageUrl);
        } else if (error) {
          console.error('Error al subir la imagen:', error);
        }
      }
    );

    const uploadButton = document.getElementById('upload_widget');
    const handleClick = () => widget.open();

    uploadButton.addEventListener('click', handleClick);

    return () => {
      uploadButton.removeEventListener('click', handleClick);
    };
  }, [onUpload]);

  return (
    <button id="upload_widget" className="btn btn-primary">
      Subir Imagen
    </button>
  );
};

export default CloudinaryUploadWidget;

import React from 'react';
import { FaTrash } from 'react-icons/fa';

const DeleteUpload = ({ publicId, onDelete }) => {
  const handleDelete = async () => {
    if (!publicId) {
      console.error('No se proporcionó el public_id para eliminar la imagen');
      alert('No se proporcionó el public_id para eliminar la imagen.');
      return;
    }

    try {
      // Llamar a la función onDelete que será proporcionada desde el componente padre
      await onDelete(publicId);
    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
      alert('Error al eliminar la imagen.');
    }
  };

  return (
    <button type="button" className="btn btn-danger mt-2" onClick={handleDelete}>
      <FaTrash /> Borrar Imagen
    </button>
  );
};

export default DeleteUpload;

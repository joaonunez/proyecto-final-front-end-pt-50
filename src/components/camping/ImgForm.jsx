/*
import React, { useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { FormGroup, Label, Input, Button } from 'reactstrap'; // Asegnomúrate de tener reactstrap instalado
import axios from 'axios';

const ImgForm = () => {
    const cld = new Cloudinary({ cloud: { cloudName: 'dnrb5m9es' } });

    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Por favor, selecciona un archivo.');
            return;
        }

        setUploading(true);
        setError('');

        // Subir a Cloudinary
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // Reemplaza con tu upload preset

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/dnrb5m9es/image/upload`, formData);
            const imageUrl = response.data.secure_url;

            // Enviar la URL a tu API para almacenar en la base de datos
            await axios.post('YOUR_API_ENDPOINT', { url: imageUrl }); // Reemplaza YOUR_API_ENDPOINT con tu endpoint real
            alert('Imagen subida y URL almacenada correctamente.');

        } catch (error) {
            console.error('Error al subir la imagen:', error);
            setError('Error al subir la imagen. Inténtalo de nuevo.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <FormGroup>
                <Label for="fileUpload">Subir foto de camping</Label>
                <Input
                    id="fileUpload"
                    name="file"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </FormGroup>
            <Button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Subiendo...' : 'Subir Archivo'}
            </Button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default ImgForm;
*/
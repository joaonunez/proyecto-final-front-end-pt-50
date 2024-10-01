
import { useState, useEffect, useContext} from 'react';
import { Link} from 'react-router-dom';
import { Context } from '../../store/context';



export function FormEditCamping  ({id})  {
    const { store: { campingVisitForEdit }, actions } = useContext(Context);
    const [formData, setFormData] = useState({
        campingName: campingVisitForEdit?.name,
        razonSocial: campingVisitForEdit?.razon_social,
        rut: campingVisitForEdit?.camping_rut,
        email: campingVisitForEdit?.email,
        telefono: campingVisitForEdit?.phone,
        direccion: campingVisitForEdit?.address,
        precio: campingVisitForEdit?.precio,
        paginaWeb: campingVisitForEdit?.url_web,
        descripcion: campingVisitForEdit?.description,
        googleMaps: campingVisitForEdit?.url_google_maps,
    });
    useEffect(() => {
        actions.setCampingFoundToEdit(id)
    }, []);

    const comunasData = {
        "Arica y Parinacota": ["Arica", "Putre"],
        "Tarapacá": ["Iquique", "Alto Hospicio", "Pica", "Huara"],
        "Antofagasta": ["Antofagasta", "Calama", "Tocopilla", "Mejillones"],
        "Atacama": ["Copiapó", "Chañaral", "Vallenar", "Tierra Amarilla"],
        "Coquimbo": ["La Serena", "Coquimbo", "Vicuña", "Illapel"],
        "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "San Antonio"],
        "Metropolitana": ["Alhué", "Buin", "Calera de Tango", "Cerrillos", "Cerro Navia", "Colina", "Conchalí", " Curacaví", "El Monte", "Estación Central", "Huechuraba", "Independencia", "Isla de Maipo", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Lampa", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "María Pinto", "Melipilla", "Ñuñoa", "Padre Hurtado", "Paine", "Pedro Aguirre Cerda", "Peñaflor", "Peñalolén", "Pirque", "Providencia", "Puente Alto", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Bernardo", "San Joaquín", "San José de Maipo", "San Miguel", "San Pedro", "San Ramón", "Santiago", "Talagante", "Til Til"],
        "Libertador General Bernardo O'Higgins": ["Rancagua", "Machalí", "Pichidegua"],
        "Maule": ["Talca", "Curicó", "Linares", "Maule"],
        "Ñuble": ["Chillán", "San Carlos", "Pemuco"],
        "Biobío": ["Concepción", "Talcahuano", "Los Ángeles"],
        "La Araucanía": ["Temuco", "Pucón", "Villarrica"],
        "Los Ríos": ["Valdivia", "La Unión", "Lago Ranco"],
        "Los Lagos": ["Puerto Montt", "Puerto Varas", "Osorno"],
        "Aysén": ["Coyhaique", "Puerto Aysén"],
        "Magallanes y de la Antártica Chilena": ["Punta Arenas", "Puerto Natales"],
    };

    const [region, setRegion] = useState('');
    const [comuna, setComuna] = useState('');


    const handleRegionChange = (e) => {
        setRegion(e.target.value);
        setComuna('');
    };

    const handleChange = (e) => {
        const { id: inputId, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [inputId]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (

        <>
        <div className='Fcamping'>
            <div className="titulo">
                <h3>Datos del Camping</h3>
            </div>
            <form className="row g-4 mt-5" onSubmit={handleSubmit}>
                <div className="col-md-5">
                    <label htmlFor="campingName" className="form-label">Nombre del Camping</label>
                    <input type="text" className="form-control" id="campingName" required value={formData.campingName} onChange={handleChange} />
                </div>
                <div className="col-md-5">
                    <label htmlFor="razonSocial" className="form-label">Razón Social</label>
                    <input type="text" className="form-control" id="razonSocial" required value={formData.razonSocial} onChange={handleChange} />
                </div>
                <div className="col-md-5">
                    <label htmlFor="rut" className="form-label">Rut</label>
                    <input type="text" className="form-control" id="rut" required value={formData.rut} onChange={handleChange} />
                </div>
                <div className="col-md-5">
                    <label htmlFor="region" className="form-label">Región</label>
                    <select className="form-control" id="region" required value={region} onChange={handleRegionChange}>
                        <option value="" disabled>Seleccione una región</option>
                        {Object.keys(comunasData).map((reg) => (
                            <option key={reg} value={reg}>{reg}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-5">
                    <label htmlFor="comuna" className="form-label">Comuna</label>
                    <select className="form-control" id="comuna" required value={comuna} onChange={(e) => setComuna(e.target.value)}>
                        <option value="" disabled>Seleccione una comuna</option>
                        {region && comunasData[region].map((com) => (
                            <option key={com} value={com}>{com}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-5">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" required value={formData.email} onChange={handleChange} />
                </div>
                <div className="col-md-5">
                    <label htmlFor="telefono" className="form-label">Teléfono</label>
                    <input type="tel" className="form-control" id="telefono" required value={formData.telefono} onChange={handleChange} />
                </div>
                <div className="col-md-5">
                    <label htmlFor="direccion" className="form-label">Dirección</label>
                    <input type="text" className="form-control" id="direccion" required value={formData.direccion} onChange={handleChange} />
                </div>
                <div className="col-md-5">
                    <label htmlFor="precio" className="form-label">Precio</label>
                    <input type="number" className="form-control" id="precio" required value={formData.precio} onChange={handleChange} />
                </div>
                <div className="col-md-5">
                    <label htmlFor="paginaWeb" className="form-label">Página Web</label>
                    <input type="url" className="form-control" id="paginaWeb" required value={formData.paginaWeb} onChange={handleChange} />
                </div>
                <div className="col-md-5">
                    <label htmlFor="logo" className="form-label">Logo</label>
                    <input type="file" className="form-control" id="logo" />
                </div>
                <div className="col-md-5">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <textarea className="form-control" id="descripcion" required value={formData.descripcion} onChange={handleChange}></textarea>
                </div>
                <div className="col-md-5">
                    <label htmlFor="galeriaFotos" className="form-label">Galería de Fotos</label>
                    <input type="file" className="form-control" id="galeriaFotos" />
                </div>
                <div className="col-md-5">
                    <label htmlFor="googleMaps" className="form-label">Google Maps</label>
                    <input type="url" className="form-control" id="googleMaps" required value={formData.googleMaps} onChange={handleChange} />
                </div>
                <div className="col-12">
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button className="btn btn-warning me-md-2" type="submit"onClick={handleSubmit}>Save Camping</button>
                        <Link to="/provider-dashboard/">
                            <button className="btn btn-warning me-md-2" type="button">Volver</button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    </>
);
}

export default FormEditCamping;
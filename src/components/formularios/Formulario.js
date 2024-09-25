
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Formulario = () => {

    const [region, setRegion] = useState('');
    const [comuna, setComuna] = useState('');

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

    const handleRegionChange = (e) => {
        setRegion(e.target.value);
        setComuna('');
    };

    return (
        <>
          <div className='Fcamping'>
                <div className="titulo">
                    <h3>Datos del Camping</h3>
                </div>
                <form class="row g-4 mt-5">
                    <div className="col-md-5">
                        <label htmlFor="campingName" className="form-label">Nombre del Camping</label>
                        <input type="text" className="form-control" id="campingName" required />
                    </div>
                    <div className="col-md-5">
                        <label htmlFor="razonSocial" className="form-label">Razón Social</label>
                        <input type="text" className="form-control" id="razonSocial" required />
                    </div>
                    <div className="col-md-5">
                        <label htmlFor="rut" className="form-label">Rut</label>
                        <input type="text" className="form-control" id="rut" required />
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
                        <input type="email" className="form-control" id="email" required />
                    </div>
                    <div className="col-md-5">
                        <label htmlFor="telefono" className="form-label">Teléfono</label>
                        <input type="tel" className="form-control" id="telefono" required />
                    </div>
                    <div className="col-md-5">
                        <label htmlFor="direccion" className="form-label">Dirección</label>
                        <input type="text" className="form-control" id="direccion" required />
                    </div>
                    <div className="col-md-5">
                        <label htmlFor="precio" className="form-label">Precio</label>
                        <input type="number" className="form-control" id="precio" required />
                    </div>
                    <div className="col-md-5">
                        <label htmlFor="paginaWeb" className="form-label">Página Web</label>
                        <input type="url" className="form-control" id="paginaWeb" required />
                    </div>
                    <div className="col-md-5">
                        <label htmlFor="logo" className="form-label">Logo</label>
                        <input type="file" className="form-control" id="logo" required />
                    </div>
                    <div className="col-md-5">
                        <label htmlFor="descripcion" className="form-label">Descripción</label>
                        <textarea className="form-control" id="descripcion" required></textarea>
                    </div>
                    <div className="col-md-5">
                        <label htmlFor="galeriaFotos" className="form-label">Galería de Fotos</label>
                        <input type="file" className="form-control" id="galeriaFotos" multiple required />
                    </div>
                    <div className="col-md-5">
                        <label htmlFor="googleMaps" className="form-label">Google Maps</label>
                        <input type="url" className="form-control" id="googleMaps" required />
                    </div>
                    <div class="col-12">
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button class="btn btn-warning me-md-2" type="submit">Crear Camping</button>
                            <Link to="/provider-dashboard">
                            <button class="btn btn-warning me-md-2" type="submit">volver</button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Formulario
import React, { useState, useEffect } from "react";
import { Collapse } from 'react-bootstrap';

export function ReservationDetails({ reservationId, actions }) {
  const [details, setDetails] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await actions.getReservationDetails(reservationId);
      if (data) {
        setDetails(data);
      } else {
        console.error("No se pudieron obtener los detalles de la reserva.");
      }
    };
    fetchDetails();
  }, [reservationId, actions]);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="btn btn-primary mt-2" onClick={toggleCollapse}>
        {isOpen ? 'Ocultar Detalles' : 'Ver Detalles'}
      </button>
      <Collapse in={isOpen}>
        <div className="reservation-details mt-3 p-3 border rounded bg-light">
          {details ? (
            <>
              <h5><strong>Detalles de la Reserva</strong></h5>
              <p><strong>ID Reserva:</strong> {details.id}</p>
              <p><strong>Cliente:</strong> {details.user?.first_name} {details.user?.last_name}</p>
              <p><strong>Camping:</strong> {details.site?.camping_name || details.camping?.name}</p>
              <p><strong>Dirección:</strong> {details.site?.camping?.address || details.camping?.address}</p>
              <p><strong>Fecha Inicio:</strong> {details.start_date}</p>
              <p><strong>Fecha Fin:</strong> {details.end_date}</p>
              <p><strong>Número de Personas:</strong> {details.number_of_people}</p>
              <p><strong>Servicios Seleccionados:</strong></p>
              {details.selected_services?.length > 0 ? (
                <ul>
                  {details.selected_services.map((service, index) => (
                    <li key={index}>{service.name} - ${service.price}</li>
                  ))}
                </ul>
              ) : (
                <p>No hay servicios seleccionados.</p>
              )}
              <p><strong>Monto Total:</strong> ${details.total_amount}</p>
              <p><strong>Descripción del Camping:</strong> {details.camping?.description || 'No disponible'}</p>
              <p><strong>Servicios del Camping:</strong> {JSON.stringify(details.camping?.services || details.site?.camping_services || {})}</p>
              <p><strong>Imágenes del Camping:</strong></p>
              {(details.camping?.images || details.site?.camping?.images)?.length > 0 ? (
                <ul>
                  {(details.camping?.images || details.site?.camping?.images).map((image, index) => (
                    <li key={index}>
                      <img src={image} alt={`Camping Image ${index}`} style={{ maxWidth: "100%" }} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay imágenes disponibles.</p>
              )}
              <p><strong>Información del Proveedor:</strong></p>
              <ul>
                <li><strong>Nombre:</strong> {details.camping?.provider?.first_name} {details.camping?.provider?.last_name || 'No disponible'}</li>
                <li><strong>RUT:</strong> {details.camping?.provider?.rut || 'No disponible'}</li>
                <li><strong>Email:</strong> {details.camping?.provider?.email || 'No disponible'}</li>
                <li><strong>Teléfono:</strong> {details.camping?.provider?.phone || 'No disponible'}</li>
                <li><strong>Rol:</strong> {details.camping?.provider?.role?.name || 'No disponible'}</li>
              </ul>
            </>
          ) : (
            <p>Cargando detalles de la reserva...</p>
          )}
        </div>
      </Collapse>
    </>
  );
}

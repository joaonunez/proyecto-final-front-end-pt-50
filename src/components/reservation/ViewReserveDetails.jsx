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
      <button className="reservation-details-toggle-btn" onClick={toggleCollapse}>
        {isOpen ? 'Ocultar Detalles' : 'Ver Detalles'}
      </button>
      <Collapse in={isOpen}>
        <div className="reservation-details-container">
          {details ? (
            <>
              <h5 className="reservation-details-title"><strong>Detalles de la Reserva</strong></h5>
              <p className="reservation-details-item"><strong>ID Reserva:</strong> {details.id}</p>
              <p className="reservation-details-item"><strong>Cliente:</strong> {details.user?.first_name} {details.user?.last_name}</p>
              <p className="reservation-details-item"><strong>Camping:</strong> {details.site?.camping_name || details.camping?.name}</p>
              <p className="reservation-details-item"><strong>Dirección:</strong> {details.site?.camping?.address || details.camping?.address}</p>
              <p className="reservation-details-item"><strong>Fecha Inicio:</strong> {details.start_date}</p>
              <p className="reservation-details-item"><strong>Fecha Fin:</strong> {details.end_date}</p>
              <p className="reservation-details-item"><strong>Número de Personas:</strong> {details.number_of_people}</p>
              <p className="reservation-details-item"><strong>Servicios Seleccionados:</strong></p>
              {details.selected_services?.length > 0 ? (
                <ul className="reservation-details-list">
                  {details.selected_services.map((service, index) => (
                    <li key={index} className="reservation-details-list-item">
                      {service.name} - ${service.price}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="reservation-details-item">No hay servicios seleccionados.</p>
              )}
              <p className="reservation-details-item"><strong>Monto Total:</strong> ${details.total_amount}</p>
              <p className="reservation-details-item"><strong>Descripción del Camping:</strong> {details.camping?.description || 'No disponible'}</p>
              <p className="reservation-details-item"><strong>Servicios del Camping:</strong> {JSON.stringify(details.camping?.services || details.site?.camping_services || {})}</p>
              <p className="reservation-details-item"><strong>Imágenes del Camping:</strong></p>
              {(details.camping?.images || details.site?.camping?.images)?.length > 0 ? (
                <ul className="reservation-details-image-list">
                  {(details.camping?.images || details.site?.camping?.images).map((image, index) => (
                    <li key={index} className="reservation-details-image-item">
                      <img src={image} alt={`Camping Image ${index}`} className="reservation-details-image" />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="reservation-details-item">No hay imágenes disponibles.</p>
              )}
              <p className="reservation-details-item"><strong>Información del Proveedor:</strong></p>
              <ul className="reservation-details-provider-info">
                <li className="reservation-details-provider-item"><strong>Nombre:</strong> {details.camping?.provider?.first_name} {details.camping?.provider?.last_name || 'No disponible'}</li>
                <li className="reservation-details-provider-item"><strong>RUT:</strong> {details.camping?.provider?.rut || 'No disponible'}</li>
                <li className="reservation-details-provider-item"><strong>Email:</strong> {details.camping?.provider?.email || 'No disponible'}</li>
                <li className="reservation-details-provider-item"><strong>Teléfono:</strong> {details.camping?.provider?.phone || 'No disponible'}</li>
                <li className="reservation-details-provider-item"><strong>Rol:</strong> {details.camping?.provider?.role?.name || 'No disponible'}</li>
              </ul>
            </>
          ) : (
            <p className="reservation-details-loading">Cargando detalles de la reserva...</p>
          )}
        </div>
      </Collapse>
    </>
  );
}

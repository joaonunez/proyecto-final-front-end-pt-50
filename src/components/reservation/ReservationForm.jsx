import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/context";

const ReservationForm = () => {
  const { store, actions } = useContext(Context);
  const [formData, setFormData] = useState({
    site_id: "",
    user_id: store.user ? store.user.id : "",
    start_date: "",
    end_date: "",
    number_of_people: 1,
    total_amount: 0,
    selected_services: [], 
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (store.selectedSite) {
      setFormData((prevData) => ({
        ...prevData,
        site_id: store.selectedSite.id,
        number_of_people: store.selectedSite.max_of_people,
      }));
    }
  }, [store.selectedSite]);

  const calculateTotalAmount = () => {
    if (formData.start_date && formData.end_date && store.selectedSite) {
      const startDate = new Date(formData.start_date);
      const endDate = new Date(formData.end_date);
      const numNights = (endDate - startDate) / (1000 * 3600 * 24);
      if (numNights > 0) {
        let total = numNights * store.selectedSite.price;

        // Calcular costo adicional por servicios seleccionados si existen
        if (store.selectedSite.camping_services) {
          formData.selected_services.forEach((service) => {
            if (store.selectedSite.camping_services[service]) {
              total += store.selectedSite.camping_services[service];
            }
          });
        }

        setTotalAmount(total);
        setFormData((prevData) => ({
          ...prevData,
          total_amount: total,
        }));
      } else {
        setTotalAmount(0);
      }
    }
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [
    formData.start_date,
    formData.end_date,
    formData.selected_services,
    store.selectedSite,
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      let selectedServices = [...formData.selected_services];
      if (checked) {
        selectedServices.push(value);
      } else {
        selectedServices = selectedServices.filter(
          (service) => service !== value
        );
      }
      setFormData({
        ...formData,
        selected_services: selectedServices,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Datos enviados para la reserva:", formData);
    if (
      !formData.site_id ||
      !formData.user_id ||
      !formData.start_date ||
      !formData.end_date ||
      !formData.total_amount
    ) {
      alert(
        "Por favor, completa todos los campos antes de enviar el formulario."
      );
      return;
    }

    const success = await actions.makeReservation(formData);
    if (success) {
      navigate("/my-reservations");
    } else {
      alert(
        "Hubo un problema al realizar la reserva. Por favor, intenta de nuevo."
      );
    }
  };

  const formatFacilities = (facilities) => {
    if (typeof facilities === "object" && facilities !== null) {
      const availableFacilities = Object.entries(facilities)
        .filter(([key, value]) => value === true)
        .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1));
      return availableFacilities.length > 0
        ? availableFacilities.join(", ")
        : "Ninguna facilidad disponible";
    }
    return "Información no disponible";
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Realizar Reserva</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group mb-3">
          <label>Fecha de Inicio</label>
          <input
            type="date"
            name="start_date"
            className="form-control"
            value={formData.start_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Fecha de Término</label>
          <input
            type="date"
            name="end_date"
            className="form-control"
            value={formData.end_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Número de Personas</label>
          <input
            type="number"
            name="number_of_people"
            className="form-control"
            value={formData.number_of_people}
            onChange={handleChange}
            min="1"
            max={store.selectedSite ? store.selectedSite.max_of_people : 1}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Facilidades Gratuitas del Sitio</label>
          <div className="mb-3">
            <p>
              {store.selectedSite
                ? formatFacilities(store.selectedSite.facilities)
                : "No hay facilidades disponibles."}
            </p>
          </div>
        </div>

        <div className="form-group mb-3">
          <label>Servicios Adicionales</label>
          <div>
            {store.selectedSite &&
            store.selectedSite.camping_services &&
            Object.keys(store.selectedSite.camping_services).length > 0 ? (
              Object.keys(store.selectedSite.camping_services).map(
                (service, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      name="selected_services"
                      value={service}
                      onChange={handleChange}
                      className="form-check-input"
                    />
                    <label className="form-check-label">
                      {service} - $
                      {store.selectedSite.camping_services[service]}
                    </label>
                  </div>
                )
              )
            ) : (
              <p>No hay servicios adicionales disponibles.</p>
            )}
          </div>
        </div>

        <div className="form-group mb-3">
          <label>Monto Total:</label>
          <p>${totalAmount}</p>
        </div>
        <input
          type="submit"
          className="btn btn-primary btn-lg d-block mx-auto mt-4" value={"Confirmar Reserva"}/>
      
      </form>
    </div>
  );
};

export default ReservationForm;

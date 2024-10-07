import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/context";

const ReservationForm = () => {
  const { store, actions } = useContext(Context); // obtiene el store y las acciones del contexto global
  const [formData, setFormData] = useState({ // define el estado inicial de los datos del formulario
    site_id: "", // id del sitio de camping seleccionado
    user_id: store.user ? store.user.id : "", // id del usuario logueado, si existe
    start_date: "", // fecha de inicio de la reserva
    end_date: "", // fecha de termino de la reserva
    number_of_people: 1, // numero de personas para la reserva, por defecto 1
    total_amount: 0, // monto total a pagar por la reserva
    selected_services: [], // servicios adicionales seleccionados
  });
  const [totalAmount, setTotalAmount] = useState(0); // estado para manejar el total de la reserva
  const [minEndDate, setMinEndDate] = useState(""); // controla la fecha minima para la fecha de termino
  const [unavailableDates, setUnavailableDates] = useState([]); // fechas no disponibles
  const navigate = useNavigate(); // hook para redirigir a otras paginas

  // este useEffect se ejecuta cuando se selecciona un sitio, actualiza el formData y trae las fechas ocupadas
  useEffect(() => {
    if (store.selectedSite) { // si hay un sitio seleccionado en el store
      setFormData((prevData) => ({
        ...prevData, // copia los datos actuales del formulario
        site_id: store.selectedSite.id, // actualiza el id del sitio seleccionado
        number_of_people: store.selectedSite.max_of_people, // actualiza el numero maximo de personas permitido por el sitio
      }));

      // llama la accion para obtener las fechas no disponibles del sitio seleccionado
      actions.getUnavailableDates(store.selectedSite.id);
    }
  }, [store.selectedSite]); // dependencias del useEffect, se ejecuta si cambia el sitio seleccionado

  // este useEffect se ejecuta cuando cambian las fechas no disponibles en el store
  useEffect(() => {
    if (store.unavailableDates) { // si hay fechas no disponibles en el store
      console.log("Fechas no disponibles actualizadas en el store:", store.unavailableDates); // imprime en consola
      setUnavailableDates(store.unavailableDates); // actualiza el estado de fechas no disponibles
    }
  }, [store.unavailableDates]); // dependencias, se ejecuta si cambian las fechas no disponibles

  // funcion que verifica si una fecha esta dentro de un rango de fechas no disponibles
  const isDateUnavailable = (date) => {
    return unavailableDates.some(
      (range) =>
        new Date(date) >= new Date(range.start_date) && // verifica si la fecha es mayor o igual a la fecha de inicio ocupada
        new Date(date) <= new Date(range.end_date) // verifica si la fecha es menor o igual a la fecha de fin ocupada
    );
  };

  // funcion que obtiene un array con todas las fechas deshabilitadas (ocupadas)
  const getDisabledDates = () => {
    const disabledDates = unavailableDates.map((range) => {
      const startDate = new Date(range.start_date); // convierte la fecha de inicio en objeto Date
      const endDate = new Date(range.end_date); // convierte la fecha de fin en objeto Date
      const dates = [];

      // recorre desde la fecha de inicio hasta la de fin y agrega cada fecha al array
      for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d).toISOString().split("T")[0]); // agrega la fecha en formato yyyy-mm-dd
      }
      return dates; // retorna el array de fechas ocupadas para ese rango
    }).flat(); // aplana el array para que sea una lista de fechas unicas

    return disabledDates; // retorna el array con todas las fechas deshabilitadas
  };

  // calcula el monto total de la reserva en base a las fechas y servicios seleccionados
  const calculateTotalAmount = () => {
    let total = 0;

    // si se seleccionaron fechas, calcula el costo de las noches
    if (formData.start_date && formData.end_date && store.selectedSite) {
      const startDate = new Date(formData.start_date);
      const endDate = new Date(formData.end_date);
      const numNights = (endDate - startDate) / (1000 * 3600 * 24); // diferencia de noches en milisegundos a dias
      if (numNights > 0) {
        total += numNights * store.selectedSite.price; // multiplica el precio por noche por el numero de noches
      }
    }

    // suma el precio de los servicios seleccionados
    formData.selected_services.forEach((selectedServiceName) => {
      const service = store.selectedSite.camping_services.find(
        (s) => s.name === selectedServiceName // busca el servicio por nombre
      );
      if (service) {
        total += parseInt(service.price); // suma el precio del servicio al total
      }
    });

    setTotalAmount(total); // actualiza el estado del monto total
    setFormData((prevData) => ({
      ...prevData,
      total_amount: total, // actualiza el monto total en el formData
    }));
  };

  // este useEffect se ejecuta cuando cambian las fechas o los servicios seleccionados para recalcular el monto total
  useEffect(() => {
    calculateTotalAmount(); // recalcula el monto total
  }, [
    formData.start_date,
    formData.end_date,
    formData.selected_services,
    store.selectedSite,
  ]); // dependencias, se ejecuta si cambian las fechas, servicios o el sitio

  // maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target; // obtiene el nombre, valor, tipo y estado del checkbox del evento
    if (type === "checkbox") { // si el tipo es checkbox
      let selectedServices = [...formData.selected_services]; // copia los servicios seleccionados
      if (checked) {
        selectedServices.push(value); // agrega el servicio si fue seleccionado
      } else {
        selectedServices = selectedServices.filter(
          (service) => service !== value // remueve el servicio si fue desmarcado
        );
      }
      setFormData({
        ...formData,
        selected_services: selectedServices, // actualiza los servicios seleccionados en el formData
      });
    } else {
      setFormData({
        ...formData,
        [name]: value, // actualiza el campo correspondiente en el formData
      });

      // si el campo cambiado es la fecha de inicio
      if (name === "start_date") {
        const startDateValue = new Date(value);
        if (startDateValue) {
          const minEndDateValue = new Date(startDateValue);
          minEndDateValue.setDate(minEndDateValue.getDate() + 1); // establece la fecha minima de termino como un dia despues de la de inicio
          setMinEndDate(minEndDateValue.toISOString().split("T")[0]); // actualiza el estado de minEndDate

          // si ya habia una fecha de termino seleccionada, la reinicia
          if (formData.end_date) {
            setFormData((prevData) => ({
              ...prevData,
              end_date: "", // reinicia la fecha de termino
              total_amount: 0, // reinicia el monto total
            }));
            setTotalAmount(0); // reinicia el estado del monto total
          }
        }
      }
    }
  };

  // maneja el envio del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // evita que el formulario se envie de manera predeterminada

    // validacion de fechas, la fecha de inicio debe ser anterior a la de termino
    if (new Date(formData.start_date) >= new Date(formData.end_date)) {
      alert("La fecha de inicio debe ser anterior a la fecha de termino.");
      return;
    }

    // verifica si las fechas seleccionadas estan ocupadas
    if (isDateUnavailable(formData.start_date) || isDateUnavailable(formData.end_date)) {
      alert("La fecha seleccionada ya esta ocupada.");
      return;
    }

    console.log("Datos enviados para la reserva:", formData); // imprime los datos del formulario
    if (
      !formData.site_id ||
      !formData.user_id ||
      !formData.start_date ||
      !formData.end_date ||
      !formData.total_amount
    ) {
      alert("Por favor, completa todos los campos antes de enviar el formulario."); // valida que todos los campos esten llenos
      return;
    }

    const success = await actions.makeReservation(formData); // llama la accion para hacer la reserva
    if (success) {
      navigate("/my-reservations"); // redirige a la pagina de reservas si la reserva fue exitosa
    } else {
      alert("Hubo un problema al realizar la reserva. Por favor, intenta de nuevo."); // muestra un mensaje de error si fallo
    }
  };

  // formatea las facilidades disponibles en el sitio
  const formatFacilities = (facilities) => {
    if (typeof facilities === "object" && facilities !== null) {
      const availableFacilities = Object.entries(facilities)
        .filter(([key, value]) => value === true) // filtra las facilidades disponibles
        .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1)); // convierte el primer caracter a mayuscula
      return availableFacilities.length > 0
        ? availableFacilities.join(", ") // une las facilidades con comas
        : "Ninguna facilidad disponible"; // si no hay facilidades, retorna este mensaje
    }
    return "Informacion no disponible"; // si no hay facilidades, retorna este mensaje
  };

  // formatea el monto total
  const formatAmount = (amount) => {
    return amount.toLocaleString("es-ES"); // formatea el monto total en formato de moneda chilena
  };

  // obtiene la fecha actual en formato yyyy-mm-dd
  const today = new Date().toISOString().split("T")[0];

  const disabledDates = getDisabledDates(); // obtiene las fechas deshabilitadas

  return (
    <div className="reservation-form-container mt-4">
      <h2 className="reservation-form-title text-center">Realizar Reserva</h2>
      <form onSubmit={handleSubmit} className="reservation-form mt-4">
        <div className="form-group-custom mb-3">
          <label className="form-label-custom">Fecha de Inicio</label>
          <input
            type="date"
            name="start_date"
            className="form-input-custom"
            value={formData.start_date}
            onChange={handleChange}
            min={today} // no permite seleccionar fechas anteriores a la actual
            required
            // no deshabilitamos el campo, solo mostramos una advertencia si la fecha esta ocupada
          />
          {isDateUnavailable(formData.start_date) && (
            <p className="error-message">Fecha no disponible.</p> // muestra un mensaje de error si la fecha esta ocupada
          )}
        </div>
        <div className="form-group-custom mb-3">
          <label className="form-label-custom">Fecha de Termino</label>
          <input
            type="date"
            name="end_date"
            className="form-input-custom"
            value={formData.end_date}
            onChange={handleChange}
            min={minEndDate} // no permite seleccionar una fecha anterior a la de inicio
            required
          />
          {isDateUnavailable(formData.end_date) && (
            <p className="error-message">Fecha no disponible.</p> // muestra un mensaje de error si la fecha esta ocupada
          )}
        </div>
        <div className="form-group-custom mb-3">
          <label className="form-label-custom">Numero de Personas</label>
          <input
            type="number"
            name="number_of_people"
            className="form-input-custom"
            value={formData.number_of_people}
            onChange={handleChange}
            min="1"
            max={store.selectedSite ? store.selectedSite.max_of_people : 1} // define el maximo de personas permitidas
            required
          />
        </div>

        <div className="form-group-custom mb-3">
          <label className="form-label-custom">
            Facilidades Gratuitas del Sitio
          </label>
          <div className="facilities-custom mb-3">
            <p>
              {store.selectedSite
                ? formatFacilities(store.selectedSite.facilities) // muestra las facilidades disponibles
                : "No hay facilidades disponibles."}
            </p>
          </div>
        </div>

        <div className="form-group-custom mb-3">
          <label className="form-label-custom">Servicios Adicionales</label>
          <div className="services-custom">
            {store.selectedSite &&
            store.selectedSite.camping_services &&
            store.selectedSite.camping_services.length > 0 ? (
              store.selectedSite.camping_services.map((service, index) => (
                <div key={index} className="form-check-custom">
                  <input
                    type="checkbox"
                    name="selected_services"
                    value={service.name} // asigna el nombre del servicio como valor
                    onChange={handleChange}
                    className="form-check-input-custom"
                  />
                  <label className="form-check-label-custom">
                    {service.name} - $
                    {parseInt(service.price).toLocaleString("es-ES")} // muestra el precio del servicio
                  </label>
                </div>
              ))
            ) : (
              <p>No hay servicios adicionales disponibles.</p>
            )}
          </div>
        </div>

        <div className="form-group-custom mb-3">
          <label className="form-label-custom">Monto Total:</label>
          <p className="total-amount-custom">${formatAmount(totalAmount)}</p>
        </div>
        <input
          type="submit"
          className="btn-custom btn-primary btn-lg d-block mx-auto mt-4"
          value="Confirmar Reserva"
        />
      </form>
    </div>
  );
};

export default ReservationForm;

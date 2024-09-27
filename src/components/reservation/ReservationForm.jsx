import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../store/context';

const ReservationForm = () => {
  const { store, actions } = useContext(Context);
  const [formData, setFormData] = useState({
    site_id: '',
    user_id: store.user ? store.user.id : '',
    start_date: '',
    end_date: '',
    number_of_people: 1,
    total_amount: 0, 
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
        const total = numNights * store.selectedSite.price;
        setTotalAmount(total);
        setFormData((prevData) => ({
          ...prevData,
          total_amount: total
        }));
      } else {
        setTotalAmount(0);
      }
    }
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [formData.start_date, formData.end_date, store.selectedSite]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await actions.makeReservation(formData);
    if (success) {
      navigate('/my-reservations');
    }
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
          <label>Monto Total:</label>
          <p>${totalAmount}</p>
        </div>
        <button type="submit" className="btn btn-primary">Confirmar Reserva</button>
      </form>
    </div>
  );
};

export default ReservationForm;

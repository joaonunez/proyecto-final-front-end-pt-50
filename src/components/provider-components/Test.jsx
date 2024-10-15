import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/context";
import { FaTrash } from "react-icons/fa";

export function CreateSiteForm() {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  // Estado inicial para los datos del formulario
  const [formData, setFormData] = useState({
    tasks: [], // Lista de sitios
  });

  const [newTask, setNewTask] = useState({
    name: "",
    max_of_people: "",
    price: "",
    dimensions: { length: "", width: "" },
    url_photo_site: "",
    facilities: [], // Campo para almacenar las instalaciones seleccionadas
  });

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    if (name === "length" || name === "width") {
      setNewTask((prevState) => ({
        ...prevState,
        dimensions: {
          ...prevState.dimensions,
          [name]: value,
        },
      }));
    } else {
      setNewTask((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Opciones para el dropdown de instalaciones
  const facilitiesOptions = [
    "Techo", "Quincho", "Fógon", "Mesa", "Tinaja", "Lugar de Fogata",
    "Baños Privado", "Agua Potable", "Lavadero", "Ducha", "Otro"
  ];

  // Manejar la selección múltiple de instalaciones
  const handleFacilitiesChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setNewTask((prevState) => ({
      ...prevState,
      facilities: selectedOptions,
    }));
  };

  const addTask = () => {
    if (
      newTask.name &&
      newTask.max_of_people &&
      newTask.price &&
      newTask.dimensions.length &&
      newTask.dimensions.width &&
      newTask.url_photo_site
    ) {
      setFormData((prevState) => ({
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      }));
      setNewTask({
        name: "",
        max_of_people: "",
        price: "",
        dimensions: { length: "", width: "" },
        url_photo_site: "",
        facilities: [], // Limpiar las instalaciones seleccionadas
      });
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = formData.tasks.filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      tasks: updatedTasks,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const created = await actions.createSite(formData); // Acción para crear un sitio
    if (created) {
      navigate("/provider-dashboard");
    } else {
      alert("Error al crear el sitio.");
    }
  };

  return (
    <div className="edit-camping-form">
      <h3 className="create-camping-title text-center">Registrar nuevo Sitio</h3>
      <form className="row g-4 mt-5" onSubmit={handleSubmit}>

        {/* Primera línea de campos */}
        <div className="col-md-12 d-flex justify-content-between">
          <div className="col-md-2">
            <label className="form-label">Numero o Nombre</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={newTask.name}
              onChange={handleTaskChange}
              required
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">Máximo de Personas</label>
            <input
              type="number"
              className="form-control"
              name="max_of_people"
              value={newTask.max_of_people}
              onChange={handleTaskChange}
              required
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">Precio</label>
            <input
              type="text"
              className="form-control"
              name="price"
              value={newTask.price}
              onChange={handleTaskChange}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Dimensiones (Largo x Ancho)</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                name="length"
                value={newTask.dimensions.length}
                onChange={handleTaskChange}
                placeholder="Largo"
                required
              />
              <input
                type="text"
                className="form-control"
                name="width"
                value={newTask.dimensions.width}
                onChange={handleTaskChange}
                placeholder="Ancho"
                required
              />
            </div>
          </div>
        </div>

        {/* Segunda línea para URL de la foto del sitio y el campo de instalaciones */}
        <div className="col-md-6">
          <label className="form-label">URL de la Foto del Sitio</label>
          <input
            type="url"
            className="form-control"
            name="url_photo_site"
            value={newTask.url_photo_site}
            onChange={handleTaskChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Instalaciones</label>
          <select
            className="form-control"
            multiple
            value={newTask.facilities}
            onChange={handleFacilitiesChange}
          >
            {facilitiesOptions.map((facility) => (
              <option key={facility} value={facility}>
                {facility}
              </option>
            ))}
          </select>
        </div>

        {/* Botón Agregar al final, alineado a la derecha */}
        <div className="col-md-12 d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="button" className="btn btn-success" onClick={addTask}>
            Agregar Sitio
          </button>
        </div>

        {/* Tabla de sitios agregados */}
        <div className="siteList table-responsive  mt-3">
          <table className="table table-bordered table-striped">
            <thead className="table-light text-bg-success p-3">
              <tr>
                <th>Numero o Nombre</th>
                <th>Capacidad de personas</th>
                <th>Precio por noche</th>
                <th>Dimensiones (LxA)</th>
                <th>Foto</th>
                <th>Instalaciones</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {formData.tasks.map((task, index) => (
                <tr key={index} style={{ backgroundColor: "white" }}>
                  <td>{task.name}</td>
                  <td>{task.max_of_people}</td>
                  <td>{task.price}</td>
                  <td>{`${task.dimensions.length}x${task.dimensions.width}`}</td>
                  <td>{task.url_photo_site}</td>
                  <td>{task.facilities.join(", ")}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteTask(index)}
                    >
                      <FaTrash /> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-12 d-grid gap-2 d-md-flex justify-content-md-end">
          <button className="btn btn-primary" type="submit">
            Registrar Sitios
          </button>
        </div>
      </form>
    </div>
  );
}

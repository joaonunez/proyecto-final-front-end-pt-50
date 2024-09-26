import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Context } from "../../store/context";
import { FaEdit } from "react-icons/fa";


function DatosPersonales() {
  const { store, actions } = useContext(Context);
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState(store.user.first_name);
  const [lastName, setLastName] = useState(store.user.last_name);
  const [currentPassword, setCurrentPassword] = useState("");

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setFirstName(store.user.first_name);
    setLastName(store.user.last_name);
    setCurrentPassword("");
  };

  const handleSave = async () => {
    const success = await actions.updateUser({
      first_name: firstName,
      last_name: lastName,
      current_password: currentPassword,
    });
    if (success) {
      setEditing(false);
      alert("Datos actualizados correctamente.");
    } else {
      alert("Error al actualizar los datos. Verifique su contraseña.");
    }
  };

  return (
    <div className="datos-personales-container">
      <Form>
        <Form.Group controlId="firstName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            disabled={!editing}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            disabled={!editing}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>

        {editing && (
          <Form.Group controlId="currentPassword">
            <Form.Label>Contraseña Actual</Form.Label>
            <Form.Control
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </Form.Group>
        )}

        {!editing ? (
          <Button variant="primary" onClick={handleEditClick}>
            Editar <FaEdit />
          </Button>
        ) : (
          <>
            <Button variant="success" onClick={handleSave}>
              Guardar
            </Button>{" "}
            <Button variant="secondary" onClick={handleCancel}>
              Cancelar
            </Button>
          </>
        )}
      </Form>
    </div>
  );
}

export default DatosPersonales;

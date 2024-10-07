import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { Context } from "../../store/context";

function Seguridad() {
  const { store, actions } = useContext(Context);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);
  const [email, setEmail] = useState(store.user.email);
  const [phone, setPhone] = useState(store.user.phone || "");
  const [currentPasswordEmail, setCurrentPasswordEmail] = useState("");
  const [currentPasswordPhone, setCurrentPasswordPhone] = useState("");
  const [currentPasswordPassword, setCurrentPasswordPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdateEmail = async () => {
    const success = await actions.updateEmail({
      email,
      current_password: currentPasswordEmail,
    });
    if (success) {
      setEditingEmail(false);
      setCurrentPasswordEmail("");
      alert("Email actualizado correctamente.");
    } else {
      alert("Error al actualizar el email. Verifique su contraseña.");
    }
  };

  const handleUpdatePhone = async () => {
    const success = await actions.updatePhone({
      phone,
      current_password: currentPasswordPhone,
    });
    if (success) {
      setEditingPhone(false);
      setCurrentPasswordPhone("");
      alert("Teléfono actualizado correctamente.");
    } else {
      alert("Error al actualizar el teléfono. Verifique su contraseña.");
    }
  };

  const handleUpdatePassword = async () => {
    const success = await actions.updatePassword({
      current_password: currentPasswordPassword,
      new_password: newPassword,
    });
    if (success) {
      setEditingPassword(false);
      setCurrentPasswordPassword("");
      setNewPassword("");
      alert("Contraseña actualizada correctamente.");
    } else {
      alert("Error al actualizar la contraseña. Verifique su contraseña actual.");
    }
  };

  const obscureEmail = (email) => {
    const [user, domain] = email.split("@");
    const obscuredUser = user[0] + "****" + user.slice(-1);
    return obscuredUser + "@" + domain;
  };

  return (
    <div className="seguridad-container">
      <Form>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            value={editingEmail ? email : obscureEmail(store.user.email)}
            disabled={!editingEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        {editingEmail && (
          <Form.Group controlId="currentPasswordEmail">
            <Form.Label>Contraseña Actual</Form.Label>
            <Form.Control
              type="password"
              value={currentPasswordEmail}
              onChange={(e) => setCurrentPasswordEmail(e.target.value)}
            />
          </Form.Group>
        )}
        {!editingEmail ? (
          <Button variant="warning" onClick={() => setEditingEmail(true)}>
            Editar Email
          </Button>
        ) : (
          <>
            <Button variant="warning" onClick={handleUpdateEmail}>
              Guardar Email
            </Button>{" "}
            <Button variant="warning" onClick={() => { setEditingEmail(false); setCurrentPasswordEmail(""); }}>
              Cancelar
            </Button>
          </>
        )}

        <hr />

        <Form.Group controlId="warning">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="text"
            value={phone}
            disabled={!editingPhone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
        {editingPhone && (
          <Form.Group controlId="currentPasswordPhone">
            <Form.Label>Contraseña Actual</Form.Label>
            <Form.Control
              type="warning"
              value={currentPasswordPhone}
              onChange={(e) => setCurrentPasswordPhone(e.target.value)}
            />
          </Form.Group>
        )}
        {!editingPhone ? (
          <Button variant="warning" onClick={() => setEditingPhone(true)}>
            Editar Teléfono
          </Button>
        ) : (
          <>
            <Button variant="warning" onClick={handleUpdatePhone}>
              Guardar Teléfono
            </Button>{" "}
            <Button variant="warning" onClick={() => { setEditingPhone(false); setCurrentPasswordPhone(""); }}>
              Cancelar
            </Button>
          </>
        )}

        <hr />
        <Form.Group controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" value="********" disabled />
        </Form.Group>
        {editingPassword && (
          <>
            <Form.Group controlId="currentPasswordPwd">
              <Form.Label>Contraseña Actual</Form.Label>
              <Form.Control
                type="password"
                value={currentPasswordPassword}
                onChange={(e) => setCurrentPasswordPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="newPassword">
              <Form.Label>Nueva Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
          </>
        )}
        {!editingPassword ? (
          <Button variant="warning" onClick={() => setEditingPassword(true)}>
            Cambiar Contraseña
          </Button>
        ) : (
          <>
            <Button variant="warning" onClick={handleUpdatePassword}>
              Guardar Contraseña
            </Button>{" "}
            <Button variant="warning" onClick={() => { setEditingPassword(false); setCurrentPasswordPassword(""); setNewPassword(""); }}>
              Cancelar
            </Button>
          </>
        )}
      </Form>
    </div>
  );
}

export default Seguridad;

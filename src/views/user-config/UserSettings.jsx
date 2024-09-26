import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import DatosPersonales from "../../components/user-config/DatosPersonales";
import Seguridad from "../../components/user-config/Seguridad";
export function UserSettings() {
  return (
    <div className="user-settings-container">
      <Tabs className="user-settings-tabs" defaultActiveKey="datosPersonales" id="user-settings-tabs">
        <Tab eventKey="datosPersonales" title="Datos Personales">
          <DatosPersonales />
        </Tab>
        <Tab eventKey="seguridad" title="Seguridad">
          <Seguridad />
        </Tab>
      </Tabs>
    </div>
  );
}

import React from 'react';
import { CustomerRegisterForm } from '../../components/register/CustomerRegisterForm'; 
export function Register() {
  return (
    <>
      <div className="register-page">
        <div className="register-form-container">
          <CustomerRegisterForm /> 
        </div>
      </div>
    </>
  );
}

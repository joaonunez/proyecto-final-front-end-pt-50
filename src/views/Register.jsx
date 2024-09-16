import React from 'react';
import { RegisterForm } from '../components/register/RegisterForm'; 
export function Register() {
  return (
    <>
      <div className="register-page">
        <div className="register-form-container">
          <RegisterForm /> 
        </div>
      </div>
    </>
  );
}

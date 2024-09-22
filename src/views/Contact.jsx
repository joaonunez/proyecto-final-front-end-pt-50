import React from "react";
import { ContactForm } from "../components/contact/ContactForm";
import { ContactInfo } from "../components/contact/ContactInfo";

export function Contact() {
  return (
    <div className="contact-container">
      <ContactForm />
      <ContactInfo />
    </div>
  );
}

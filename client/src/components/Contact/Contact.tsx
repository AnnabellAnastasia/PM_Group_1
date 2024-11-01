import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact py-5 bg-light">
      {/* Contact Information Section */}
      <section className="contact-info container bg-success text-white p-4 rounded mb-5">
        <div className="row">
          <div className="contact-item col-md-4 text-center">
            <div className="contact-icon fs-1 mb-2">📍</div>
            <h3>ADDRESS</h3>
            <p>1234 Example Street<br />City, State 12345</p>
            <p>Other Office:<br />5678 Another Road<br />City, State 67890</p>
          </div>
          
          <div className="contact-item col-md-4 text-center">
            <div className="contact-icon fs-1 mb-2">📞</div>
            <h3>PHONE</h3>
            <p>Main: (123) 456-7890<br />Support: (987) 654-3210</p>
          </div>

          <div className="contact-item col-md-4 text-center">
            <div className="contact-icon fs-1 mb-2">✉️</div>
            <h3>EMAIL</h3>
            <p>contact@example.com<br />support@example.com</p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form container bg-white p-5 rounded shadow-sm">
        <h2 className="mb-4">Message Us</h2>
        <p>If you wish to be considered for employment or have any other inquiries, please fill out the form below.</p>

        <form>
          <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" className="form-control" />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" className="form-control" />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="comments">Comments</label>
            <textarea id="comments" name="comments" className="form-control" rows={4}></textarea>

          </div>
          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      </section>
    </div>
  );
}

export default Contact;

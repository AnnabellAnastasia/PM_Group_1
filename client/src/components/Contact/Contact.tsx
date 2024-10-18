import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact">
      <section className="contact-info">
        <div className="contact-item">
          <div className="contact-icon">📍</div>
          <h3>ADDRESS</h3>
          <p>1234 Example Street<br />City, State 12345</p>
          <p>Other Office:<br />5678 Another Road<br />City, State 67890</p>
        </div>
        
        <div className="contact-item">
          <div className="contact-icon">📞</div>
          <h3>PHONE</h3>
          <p>Main: (123) 456-7890<br />Support: (987) 654-3210</p>
        </div>

        <div className="contact-item">
          <div className="contact-icon">✉️</div>
          <h3>EMAIL</h3>
          <p>contact@example.com<br />support@example.com</p>
        </div>
      </section>

      <section className="contact-form">
        <h2>Message Us</h2>
        <p>If you wish to be considered for employment or have any other inquiries, please fill out the form below.</p>

        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="comments">Comments</label>
            <textarea id="comments" name="comments"></textarea>
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </section>
    </div>
  );
}

export default Contact;

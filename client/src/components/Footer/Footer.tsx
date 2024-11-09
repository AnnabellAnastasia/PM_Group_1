import React from 'react';
import './Footer.css'; // Optional: if you plan to style the footer in a separate CSS file

const Footer: React.FC = () => {
    return (
        <footer className="footer bg-light text-center py-3 w-100 mt-auto"> {/* mt-auto for bottom alignment */}
            <p>&copy; 2024 Niner Networking. All Rights Reserved.</p>
            <p>
                <a href="/about">About Us</a> | 
                <a href="/contact">Contact</a> | 
                <a href="/privacy">Privacy Policy</a>
            </p>
        </footer>
    );
};

export default Footer;

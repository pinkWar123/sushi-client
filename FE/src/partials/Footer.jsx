import './Footer.css';

function Footer() {
    return (
        <div className="footer">
            <div className="footer-container grid grid-cols-3 gap-4 text-center">
                <div className="footer-item">
                    <h4>Column 1</h4>
                    <p>Some text or links for column 1.</p>
                </div>
                <div className="footer-item">
                    <h4>Column 2</h4>
                    <p>Some text or links for column 2.</p>
                    <div className="social-icons flex justify-between items-center flex-col">
                        <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon text-2xl p-2">
                            <i className="fab fa-facebook-f"></i> Facebook
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon text-2xl p-2">
                            <i className="fab fa-instagram"></i> Instagram
                        </a>
                    </div>
                </div>
                <div className="footer-item">
                    <h4>Column 3</h4>
                    <p>Some text or links for column 3.</p>
                </div>
            </div>
            <div className="footer-bottom text-center">

                <p>© 2024 Your Website. All rights reserved.</p>
            </div>
        </div>
    );
}

export default Footer;

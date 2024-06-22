import { Link } from "react-router-dom";
import "./Footer.css";
// import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className="footer" id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    {/* <img src={assets.logo} alt="" /> */}
                    <p>Discover endless possibilities at Shopping.io, your ultimate destination for seamless online shopping. From the latest tech gadgets to trendy fashion, find everything you need in one convenient place.</p>
                    <div className="footer-social-icons">
                        {/* <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" /> */}
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <Link to="/">Home</Link> <br />
                        <Link to="/about">About Us</Link> <br />
                        <Link to="/delivery">Delivery</Link> <br />
                        <Link to="/privacy">Privacy Policy</Link>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91 987745661</li>
                        <li>shopping.io@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <div className="footer-copyright">
                <p>Copyright 2024 &copy; shoppingIo.com - All Right Reserved</p>
            </div>
        </div>
    )
}

export default Footer;

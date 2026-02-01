// src/components/SocialIcons.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import "./SocialIcons.css";

export default function SocialIcons() {
  return (
    <div className="social-icons-footer">
      <a
        href="https://www.facebook.com/yourpage"
        target="_blank"
        rel="noopener noreferrer"
        title="Facebook"
      >
        <FontAwesomeIcon icon={faFacebookF} />
      </a>
      <a
        href="https://www.instagram.com/yourpage"
        target="_blank"
        rel="noopener noreferrer"
        title="Instagram"
      >
        <FontAwesomeIcon icon={faInstagram} />
      </a>
      <a
        href="https://www.tiktok.com/@yourpage"
        target="_blank"
        rel="noopener noreferrer"
        title="TikTok"
      >
        <FontAwesomeIcon icon={faTiktok} />
      </a>
    </div>
  );
}

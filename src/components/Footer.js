// import d'une image
import leReacteurLogo from "../assets/img/logo.png";

const Footer = () => {
  return (
    <div className="footer">
      By Sébastien&nbsp;
      <img src={leReacteurLogo} alt="LeReacteur logo" />
    </div>
  );
};

export default Footer;

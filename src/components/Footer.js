// import d'une image
import leReacteurLogo from "../assets/img/logo.png";

const Footer = () => {
  return (
    <div className="footer">
      By Sébastien&nbsp;
      <br />
      <p>
        <img src={leReacteurLogo} alt="LeReacteur logo" />
      </p>
    </div>
  );
};

export default Footer;

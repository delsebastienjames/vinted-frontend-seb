import { Link } from "react-router-dom";

const Header = ({ userToken, setUser }) => {
  return (
    <div className="header">
      Vinted
      {userToken ? (
        <button className="connecter" onClick={() => setUser(null)}>
          Se déconnecter
        </button>
      ) : (
        <>
          <Link className="inscrire" to="/signup">
            S'inscrire
          </Link>
          <Link className="connecter" to="/login">
            Se connecter
          </Link>
        </>
      )}
    </div>
  );
};
export default Header;

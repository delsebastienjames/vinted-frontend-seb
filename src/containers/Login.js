import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // requête axios pour se loguer
      const response = await axios.post(
        "https://my-backend-vinted-seb.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.token) {
        // Enregistrer le token dans un Cookie
        setUser(response.data.token);
        // Rediriger vers la page Home
        history.push("/");
      }
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMessage(
          <span className="vinted"> Mauvais email et/ou mot de passe </span>
        );
      }
      console.log(error.message);
    }
  };

  return (
    <div style={{ padding: 60 }} className="form-connecter">
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
        />
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
        />
        <span>{errorMessage}</span>
        <input className="connecter" type="submit" value="Se connecter" />
      </form>
    </div>
  );
};

export default Login;

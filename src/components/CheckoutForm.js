import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import Cookies from "js-cookie";

const CheckoutForm = ({ data }) => {
  const [disabled, setDisabled] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const userId = Cookies.get("userId");
  //console.log(userId);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setDisabled(true);

      // Récupérer les éléments de CardElement
      const cardElements = elements.getElement(CardElement);
      // Requête à l'API Stripe pour obtenir un token
      const stripeResponse = await stripe.createToken(cardElements, {
        name: userId,
      });

      //console.log(stripeResponse);
      // Requête au serveur pour créer le paiement
      //const stripeToken = stripeResponse.token.id;
      // Envoyer le token au serveur
      const response = await axios.post(
        "https://my-backend-vinted-seb.herokuapp.com/payment",
        {
          title: data.product_name,
          amount: data.product_price,
          token: stripeResponse.token.id,
        }
      );
      console.log(response);
      if (response.data.status === "succeeded") {
        // rediriger vers une page de confirmation
        alert("ok");
      }
      console.log(response.data);
    } catch (error) {
      // console.log(error.message);
      console.log(error.response);
    }
  };

  return (
    <div className="card-payment">
      <form onSubmit={handleSubmit}>
        <div className="visa">
          <CardElement />
        </div>
        <input type="submit" value="Acheter" disabled={disabled} />
      </form>
    </div>
  );
};

export default CheckoutForm;

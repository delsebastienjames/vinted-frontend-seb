import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";

const CheckoutForm = ({ data }) => {
  const [disabled, setDisabled] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const userId = Cookies.get("userId");
  //   console.log(userId);

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

      console.log(stripeResponse);
      // Requête au serveur pour créer la paiement
      //const stripeToken = stripeResponse.token.id;
      // Envoyer le token au serveur
      const response = await axios.post(
        "https://my-backend-vinted-seb.herokuapp.com/payment",
        {
          token: stripeResponse.token.id,
          title: data.product_name,
          amount: data.product_price,
        }
      );
      if (response.status === "succeeded") {
        // rediriger vers une page de confirmation
        // history.push("/confirm")
      }
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="card-payment">
      <form onSubmit={handleSubmit}>
        <CardElement />
        {/* <input type="submit" value="Acheter" /> */}
        <input type="submit" value="Acheter" disabled={disabled} />
      </form>
    </div>
  );
};

export default CheckoutForm;

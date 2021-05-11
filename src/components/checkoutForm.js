import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // Récupérer les données du formulaire
      const cardElements = elements.getElement(CardElement);
      // Envoyer ces données à l'API Stripe
      const stripeResponse = await stripe.createToken(cardElements, {
        name: "l'id de l'acheteur",
      });
      console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;
      // Envoyer le token au serveur
      const response = await axios.post("http://localhost:3000/payment", {
        stripeToken: stripeToken,
      });
      if (response.status === 200) {
        setSuccessMessage("Paiement Validé");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <input type="submit" />
      </form>
      {successMessage}
    </div>
  );
};

export default CheckoutForm;

import React from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

// Clé publique à envoyer à l'API Stripe
const stripePromise = loadStripe(
  "pk_test_51Ipz9pJ4chTsmqwAz7TIRCUoaq1xWpQCQ5ZuROWpRervhaiFMUUWm3KhnAc3DkwG0iEJyCnwRYyFfztXcH962SaW00sGzUZnij"
);
const Payment = () => {
  const location = useLocation();
  return (
    // Tout ce qui est contenu dans Elements a accès à l'API Stripe
    <Elements stripe={stripePromise}>
      <CheckoutForm data={location.state.data} />
    </Elements>
  );
};

export default Payment;

import { Link } from "react-router-dom";

const OfferCard = ({ offer }) => {
  return (
    <Link key={offer._id} to={`/offer/${offer._id}`}>
      <div style={{ border: "1px solid black" }}>
        <h4>{offer.product_name}</h4>
        <span>{offer.product_price}</span>
        <img
          style={{ height: 50 }}
          src={offer.product_image.secure_url}
          alt={offer.product_name}
        />
      </div>
    </Link>
  );
};

export default OfferCard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import OfferCard from "../components/OfferCard";
// import { Link } from "react-router-dom"; // permet de rendre clickable
import Offer from "./Offer";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://my-backend-vinted-seb.herokuapp.com/offers"
        );
        //console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <p>En cours de chargement ...</p>
  ) : (
    <div>
      {data.results.map((offer) => {
        return <OfferCard key={Offer._id} offer={offer} />;
        // <Link to={`/offer/${offer._id}`} key={offer._id}>
        //   <div className="air">
        //     <div>{offer.product_name}</div>
        //     <div>{offer.product_description}</div>
        //     <div className="product_price">{offer.product_price} €</div>
        //     <img
        //       style={{ height: 140 }}
        //       src={offer.product_image.secure_url}
        //       alt={data.product_name}
        //     />
        //   </div>
        // </Link>
        //); // key très important (enlève également un warning du au .map)
      })}
    </div>
  );
};

export default Home;

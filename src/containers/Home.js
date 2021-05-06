import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // permet de rendre clickable

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://my-backend-vinted-seb.herokuapp.com/offers"
      );
      //console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return isLoading ? (
    <p>En cours de chargement ...</p>
  ) : (
    <div>
      {data.results.map((offer, index) => {
        return (
          <Link to={`/offer/${offer._id}`} key={offer._id}>
            {/* <div className="air"> */}
            <div>{offer.product_name}</div>
            <div>{offer.product_description}</div>
            <div className="product_price">{offer.product_price} €</div>
            <img
              style={{ height: 70 }}
              src={offer.product_image.secure_url}
              alt={data.product_name}
            />
            {/* </div> */}
          </Link>
        ); // key très important (enlève également un warning du au .map)
      })}
    </div>
  );
};

export default Home;

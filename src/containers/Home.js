import React, { useState, useEffect } from "react";
import axios from "axios";

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
          <div key={offer._id}>
            <div>{offer.product_name}</div>
            <div>{offer.product_description}</div>
            {offer.product_price}

            <div>
              <img
                style={{ height: 50 }}
                src={offer.product_image.secure_url}
                alt={data.product_name}
              />
            </div>
          </div>
        ); // key très important (enlève également un warning du au .map)
      })}
    </div>
  );
};

export default Home;

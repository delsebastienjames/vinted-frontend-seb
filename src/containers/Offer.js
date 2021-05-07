import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // useParams renvoie un object
import axios from "axios";

const Offer = () => {
  const { id } = useParams(); // destructuring
  //console.log(id);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // requête axios
        const response = await axios.get(
          `https://my-backend-vinted-seb.herokuapp.com/offer/${id}`
        );

        //console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);
  // Ternaire
  return isLoading ? (
    <p>En cours de chargement...</p>
  ) : (
    <div>
      <p>{data.product_name}</p>
      {data.product_details.map((elem, index) => {
        const keys = Object.keys(elem);
        return <p>{keys[0]}</p>;
      })}
    </div>
  );
};

export default Offer;

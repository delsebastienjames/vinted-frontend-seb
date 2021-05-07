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
        setIsLoading(false); // pour afficher
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
    <div className="air">
      <p>{data.product_name}</p>
      <p>{data.product_description}</p>
      <p>{data.product_price} €</p>
      <p>
        <img
          style={{ height: 340 }}
          src={data.product_image.secure_url}
          alt={data.product_name}
        />
      </p>
      {data.product_details.map((elem, index) => {
        const keys = Object.keys(elem); // tableau avec les clés de l'objet
        // affichage des clés de l'objet et ses valeurs
        return (
          <p key={index}>
            {keys[0]} {elem[keys[0]]}
          </p>
        );
      })}
    </div>
  );
};

export default Offer;

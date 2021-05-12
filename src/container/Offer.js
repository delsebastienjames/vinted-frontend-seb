import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // useParams renvoie un object
// import { useParams, Link } from "react-router-dom"; // useParams renvoie un object
import axios from "axios";

const Offer = () => {
  const { id } = useParams(); // destructuring
  //console.log(id);
  const [data, setData] = useState();
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
  }, []);
  // Ternaire
  return isLoading ? (
    <p>En cours de chargement...</p>
  ) : (
    <div className="air">
      <p className="grey uppercase">{data.product_name}</p>
      <p className="grey">{data.product_description}</p>
      <p className="product_price">
        {data.product_price} <span className="euro">€</span>
      </p>

      <div className="air2">
        <p>
          <img
            style={{ height: 160 }}
            src={data.product_image.secure_url}
            alt={data.product_name}
          />
        </p>
      </div>
      {data.product_details.map((elem, index) => {
        const keys = Object.keys(elem); // tableau avec les clés de l'objet
        // affichage des clés de l'objet et ses valeurs
        return (
          <p className="grey" key={index}>
            <span className="grey">{keys[0]}</span>
            <p className="fantasy marque">{elem[keys[0]]}</p>
          </p>
        );
      })}
      {/* <Link
        className="acheter"
        to={{
          pathname: "/payment",
          state: { data: data },
        }}
      >
        Acheter
      </Link> */}
    </div>
  );
};

export default Offer;

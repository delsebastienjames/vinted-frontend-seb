import { Redirect, useHistory } from "react-router-dom";
import { useState } from "react";
import Input from "../components/Input";
import axios from "axios";

const Publish = ({ userToken }) => {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [marque, setMarque] = useState("");
  const [format, setFormat] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(0);

  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append("picture", picture);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("marque", marque);
      formData.append("format", format);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("price", price);

      const response = await axios.post(
        "https://my-backend-vinted-seb.herokuapp.com/offer/publish",

        formData,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response.data);
      // Rediriger l'utilisateur vers la page de l'annonce postée
      if (response.data._id) {
        history.push(`/offer/${response.data._id}`);
      } else {
        alert("Une erreur est survenue");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return userToken ? (
    <div className="annonce">
      <form className="form" onSubmit={handleSubmit}>
        <label className="label" htmlFor="file">
          Ajoute une image
        </label>

        <input
          id="file"
          type="file"
          onChange={(event) => setPicture(event.target.files[0])}
        />
        <span className="litle-picture">
          {picture && <img src={URL.createObjectURL(picture)} alt="" />}
        </span>

        <br />
        <div className="card-annonce">
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            cols="30"
            rows="10"
          />
          <Input
            title="Titre"
            placeholder="ex: Polo"
            type="text"
            value={title}
            setValue={setTitle}
          />
          <Input
            title="Marque"
            placeholder="ex: Lacoste"
            type="text"
            value={marque}
            setValue={setMarque}
          />
          <Input
            title="Taille"
            placeholder="ex: L"
            type="text"
            value={format}
            setValue={setFormat}
          />
          <Input
            title="Couleur"
            placeholder="ex: blanc"
            type="text"
            value={color}
            setValue={setColor}
          />
          <Input
            title="État"
            placeholder="ex: neuf"
            type="text"
            value={condition}
            setValue={setCondition}
          />
          <Input
            title="Lieu"
            placeholder="ex: Paris"
            type="text"
            value={city}
            setValue={setCity}
          />
          <Input
            title="Prix"
            placeholder="ex: 95"
            type="number"
            value={price}
            setValue={setPrice}
          />
          <input type="submit" value="Ajouter" />
        </div>
      </form>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Publish;

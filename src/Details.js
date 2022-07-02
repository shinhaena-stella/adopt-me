import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import Modal from "./Modal";
import ThemeContext from "./ThemeContext";

const Details = () => {
  const [ loading, setLoading ] = useState(true);
  const [ showModal, setShowModal ] = useState(false);
  const [ name, setName ] = useState("");
  const [ animal, setAnimal ] = useState("");
  const [ breed, setBreed ] = useState("");
  const [ images, setImages ] = useState([]);
  const [ location, setLocation ] = useState("");
  const [ description, setDescription ] = useState("");
  const { id } = useParams();
  const [ theme ] = useContext(ThemeContext);

  useEffect(() => {
    requestDetails();
  }, []);

  async function requestDetails() {
    const res = await fetch (
      `http://pets-v2.dev-apis.com/pets?id=${id}` // this works only when it's wrapped by wrapper and use useParams
    );
    const json = await res.json();
    setLoading(false);
    setName(json.pets[0].name);
    setAnimal(json.pets[0].animal);
    setLocation(`${json.pets[0].city}, ${json.pets[0].state}`)
    setDescription(json.pets[0].description);
    setBreed(json.pets[0].breed);
    setImages(json.pets[0].images);
  }

  const toggleModal = () => setShowModal(!showModal)// if flips the state

  //throw new Error("ERROR");

  return (
    <>
    {loading ? (
      <h2
      >Loading</h2>
    ) : (
      <div className="details">
      <Carousel images={images} />
      <div>
      <h1>{name}</h1>
      <h2>
      {animal} - {breed} - {location}
      </h2>
      <button
      onClick={toggleModal}
      style={{ backgroundColor: theme }}
      >
      Adopt {name}
      </button>
      <p>{description}</p>
      {showModal ? (
        <Modal>
        <div>
        <h1>Would you like to adopt {name}?</h1>
        <div className="buttons">
        <a href="https://bit.ly/pet-adopt">Yes</a>
        <button onClick={toggleModal}>No</button>
        </div>
        </div>
        </Modal>
        ) : null}
        </div>
        </div>
        )}
        </>
      ); 
};

export default Details;
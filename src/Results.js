import { useState } from "react";
import Pet from "./Pet";

const Results = ({ pets }) => {
  // const [petsList, setPetsList] = useState({pets});

  const sortByName = () => {
    if (pets.length) {
      let newList = [...pets];
      newList.sort((a, b) => (b.name - a.name));
      setPetsList(newList);
    }
  }
  const sortByState = () => {

  }

  return (
    <>
    <div className="buttons">
      <button onClick={sortByName}>Sort by Name</button>
      <button onClick={sortByState}>Sort by State</button>
    </div>
    <div className="search">
      {!pets.length ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map((pet) => {
          return (
            <Pet
            animal={pet.animal}
            key={pet.id}
            name={pet.name}
            breed={pet.breed}
            images={pet.images}
            location={`${pet.city}, ${pet.state}`}
            id={pet.id}
            />
          );
        })
      )}
    </div>
    </>
  );
};

export default Results;
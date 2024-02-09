import React, {useState, useEffect} from "react";
import ToyCard from "./ToyCard";

function ToyContainer({toyArray, setToyArray}) {

  useEffect(() => {
    fetch('http://localhost:3001/toys')
    .then(res => res.json())
    .then(data => setToyArray(data))
    .catch(error => console.log(error))
  }, [])
  console.log(toyArray)
  return (
    <div id="toy-collection">{(toyArray ? toyArray.map((toy) => {
      return <ToyCard key={toy.id} name={toy.name} image={toy.image} id={toy.id} likes={toy.likes} setToyArray={setToyArray} toyArray={toyArray}/>
    }) : null )}</div>
  );
}

export default ToyContainer;

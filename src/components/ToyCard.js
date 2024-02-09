import React, {useState} from "react";

function ToyCard({name, likes, image, id, setToyArray, toyArray}) {
  const [numLikes, setNumLikes] = useState(likes)
  function handleDelete(event) {
    const idToDeleteString = event.target.id;
    console.log(idToDeleteString)
    const idToDelete = parseInt(idToDeleteString)
    console.log(idToDelete)
    const newArray = [...toyArray]
    console.log("before deletion:", newArray)
    fetch(`http://localhost:3001/toys/${idToDelete}`, {
      method: "DELETE",
    })
    .then(res => res.json())
    .then(data => {
      const updatedArray = newArray.filter((toy) => toy.id !== idToDelete)
      console.log("after deletion", updatedArray)
      setToyArray(updatedArray)
    })
  }

  function handleLike(event) {
    console.log(event.target.value)
    console.log(event.target.id)
    const idToPatch = parseInt(event.target.id)
    const numberLikes = (parseInt(event.target.value) + 1)
    setNumLikes(numberLikes)
    fetch(`http://localhost:3001/toys/${idToPatch}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "likes": numberLikes
      })
    })
    .then(res => res.json())
    .then(data => {
      const newArray = toyArray.map((toy) => {
        if (toy.id === idToPatch) {
          return {...toy, likes: numberLikes}
        }
        else return toy;
      })
      setToyArray(newArray)
  })
}
  return (
    <div className="card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button className="like-btn" value={likes}id={id} onClick={handleLike}>Like {"<3"}</button>
      <button className="del-btn" id={id} onClick={handleDelete}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;

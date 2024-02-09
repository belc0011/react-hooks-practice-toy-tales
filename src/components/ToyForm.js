import React, {useState} from "react";

function ToyForm({setToyArray, toyArray}) {
  const [newToyName, setNewToyName] = useState("")
  const [newToyImage, setNewToyImage] = useState("")
  function handleSubmit(event) {
    event.preventDefault()
    const newToy = {name: newToyName, image: newToyImage, id: toyArray.length + 2, likes: 0}
    fetch('http://localhost:3001/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newToy),
    })
    .then(res => res.json())
    .then(data => setToyArray([...toyArray, newToy]))
  }
  function handleNameChange(e) {
    setNewToyName(e.target.value)
  }
  function handleImageChange(e) {
    setNewToyImage(e.target.value)
  }
  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          onChange={handleNameChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          onChange={handleImageChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;

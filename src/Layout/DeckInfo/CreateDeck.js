import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";
import {Link} from "react-router-dom";

function CreateDeck() {
    const history = useHistory();
    const initialFormState = {
        name: "",
        description: ""
    }
    const [formData, setFormData] = useState({...initialFormState})
    
    const changeHandler = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        })
    }

    const submitHandler = (event) => {
        event.preventDefault();
        createDeck(formData)
        .then(() => history.push("/"));
    }

    const cancelHandler = () => {
        setFormData({...initialFormState});
        history.push("/")
    }
    
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            <span className="oi oi-home" />
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Create Deck
                    </li>
                </ol>
            </nav>
            <h1>Create Deck</h1>
            <form onSubmit={submitHandler} className="deck-create">
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Deck Name</label>
                        <input 
                            name="name" 
                            type="text"
                            className="input-group"
                            placeholder="Deck Name"
                            onChange={changeHandler} 
                            value={formData.name}
                            required={true}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="form-label">Description:</label>
                        <textarea 
                            name="description" 
                            type="textarea"
                            className="form-control"
                            placeholder="Deck Name"
                            onChange={changeHandler} 
                            value={formData.description}
                            required={true}
                        />
                    </div>
                    <button type="button" className="btn btn-secondary mr-2" onClick={cancelHandler}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </fieldset>
            </form>
        </> 
    )
}

export default CreateDeck;
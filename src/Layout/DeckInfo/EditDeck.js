import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";
import {Link} from "react-router-dom";

function EditDeck({initialState = { name: "", description: "" }}) {
    const history = useHistory();
    const { deckId } = useParams();
    const [deck, setDeck] = useState(initialState);

    useEffect(() => {
        async function loadDeck() {
            const deck = await readDeck(deckId);
            setDeck({...deck})
        }
        loadDeck()
    }, [deckId]);

    const changeHandler = ({ target: { name, value } }) => {
        setDeck((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
   
    const cancelHandler = () => {
        history.goBack();
    }
    
    function submitHandler(event) {
        updateDeck(deck).then((saveDeck) => history.go(-1))
    }

    const child = deck.id ? (
        <form onSubmit={submitHandler} className="deck-edit">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input 
                        name="name" 
                        type="text"
                        className="input-group"
                        placeholder="Deck Name"
                        onChange={changeHandler} 
                        value={deck.name}
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
                        value={deck.description}
                        required={true}
                    />
                </div>
                <button type="button" className="btn btn-secondary mr-2" onClick={cancelHandler}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </fieldset>
        </form>
            
        
    ) : (
        <p>Loading...</p>
    );

    return (
        <div> 
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            <span className="oi oi-home" />
                            Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>
                            {deck.name}
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Edit Deck
                    </li>
                </ol>
            </nav>
            <h1>Edit Deck</h1>
            {child}
        </div>
    )
}

export default EditDeck;
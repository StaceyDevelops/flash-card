import React from "react";
import { Link, useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../../utils/api";
import { useState, useEffect } from "react";
import HomeDisplay from "./HomeDisplay";

function HomeScreen() {
    const [deck, setDeck] = useState([]);
    const history = useHistory();

    useEffect(() => {
        async function loadDecks() {
            const decks = await listDecks();
            setDeck([...decks]);
        }
        loadDecks();
    }, []);    

/*Clicking the Delete button shows a warning message before 
deleting the deck.*/
    const deleteHandler = (idToDelete) => {
        if (window.confirm("Are you sure you want to delete this deck?")){
            deleteDeck(idToDelete)
            .then(() => history.go(0));
        } else (history.go(0));
    }

    const CreateDeck = deck.map((deck, index) => {
        return (
            <HomeDisplay key={index} deck={deck} cards={deck.cards} deleteHandler={() => deleteHandler(deck.id)}/>
        );
    });

/*A Create Deck button is shown, and clicking it brings the user 
to the Create Deck screen.*/

    if (CreateDeck.length !== 0) return (
        <div>
            <Link to="/decks/new" className="btn btn-secondary">
                <span className="oi oi-plus" /> Create Deck
            </Link>
            <span>{CreateDeck}</span>
        </div>
    );
    
    return (
        <div>
            <Link to="/decks/new" className="btn btn-secondary"> 
                <span className="oi oi-plus" /> Create Deck
            </Link>
            <p>There are no decks! nothing to study. . .</p>
        </div>
    )
}

export default HomeScreen;
import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api";
import ViewCard from "../CardInfo/ViewCard"

function DisplayDeck() {
    const { deckId } = useParams();
    const history = useHistory();
    const [deck, setDeck]= useState({});
    const [cards, setCards]= useState([]);

    useEffect(() => {
        loadDeck();
    }, [deckId]);

    const loadDeck = async () => {
        const deck = await readDeck(deckId)
        setDeck({...deck});
        setCards([...deck.cards])
    }

    const deleteHandler = () => {
        const confirmed = window.confirm(
            "Delete this deck?\n\nYou will not be able to recover it."
        );
        if(confirmed){
            deleteDeck(deckId).then(() => history.push("/decks"))
        }
    }

    const cardDeleteHandler = (id) => {
        const confirmed = window.confirm(
            "Delete this card?\n\nYou will not be able to recover it."
        );
        if (confirmed){
            deleteCard(id).then(loadDeck);
        }
    }
    return (
        <main className="container">
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
                </ol>
            </nav>
            <div className="media mb-2">
                <div className="media-body">
                    <h2 className="mb-3 mt-3">{deck.name}</h2>
                    {deck.description}
                </div>
            </div>
            <Link 
                to={`/decks/${deck.id}/edit`}
                className="btn btn-secondary mr-2"
                title="Edit deck"
            >
                <span className="oi oi-pencil" /> Edit
            </Link>
            <Link
                    to={`/decks/${deck.id}/study`}
                    className="btn btn-primary mr-2"
                    title="Study deck"
                >
                    <span className="oi oi-book" /> Study
            </Link>
            <Link
                to={`/decks/${deck.id}/cards/new`}
                className="btn btn-primary"
                title="Add Card"
            >
                <span className="oi oi-plus" /> Add Cards
            </Link>
            
            <button className="m-1 btn btn-danger float-right" title="Delete deck"> 
                <span className="oi oi-trash" onClick={deleteHandler} /> 
            </button>
            
            <div className="mt-3">
                <h2>Cards</h2>
                <div className="border rounded mb-3">
                    <ViewCard
                        deck={deck}
                        cardDeleteHandler={cardDeleteHandler} 
                    />
                </div>
            </div>
        </main>
    )
}

export default DisplayDeck;
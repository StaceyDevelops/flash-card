import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck } from "../../utils/api";

const viewNext = { front: "back", back: "front"}
function StudyCards({ cards, card, side, flipHandler, nextHandler }) {
    const [view, setView] = useState('front')
    const [flipped, setFlipped] = useState(false)

    if (side === true) {
        return (
            <div>
                <p>{cards[card].front}</p>
                <button type="button" className="btn btn-secondary rounded" onClick={flipHandler}>Flip</button>
            </div>
        )
    } else {
        return (
            <div>
                <p>{cards[card].back}</p>
                <button type="button" className="btn btn-secondary rounded" onClick={flipHandler}>Flip</button>
                <button type="button" className="btn btn-primary rounded ml-2" onClick={nextHandler}>Next</button>
            </div>
        )
    }
}

function Study() {
    const { deckId } = useParams();
    const history = useHistory();

    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const [card, setCard] = useState(0);
 
    useEffect(() => {
        async function loadDeck() {
            const deck = await readDeck(deckId);
            setCards([...deck.cards]);
            setDeck({...deck});
        }
        loadDeck();
    }, [deckId]);

    const [side, setSide] = useState(true);
    const totalCards = cards.length
    
    const flipHandler = () => {
        if (side === true){
            setSide(false)
        } else {setSide(true)}
    }

    const nextHandler = () => {
        if (card + 1 === cards.length) {
            if (window.confirm("Restart Cards? Click 'cancel' to return to the home page")) {
                setCard(0);
            } else {
                history.push('/');
            }
        } else {setCard(card + 1)} 
        setSide(true);
    }
    
    if (deck.id) {
        if (totalCards < 3) {
            return (
                <main className="container study-page">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">
                                    <span className="oi oi-home" /> Home
                                </Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to={`/decks/${deck.id}`}>{deck.name}
                                </Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Study
                            </li>
                        </ol>
                    </nav>
                    
                    <div>
                        <h2 className="mb-3 mt-3">Study: {deck.name}</h2>
                        <h3>Not enough cards.</h3>
                        <p>You need at least 3 cards to study. there are {totalCards} in this deck.</p>
                        <Link to={`/decks/${deck.id}/cards/new`}>
                            <span className="oi oi-plus" /> Add Cards
                        </Link>
                    </div>
                </main>
            )
        }

        return (
            <main className="container study-page">
                <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">
                                    <span className="oi oi-home" /> Home
                                </Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to={`/decks/${deck.id}`}>{deck.name}
                                </Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Study
                            </li>
                        </ol>
                    </nav>
                <h2 className="mb-3 mt-3">Study: {deck.name}</h2>
                <div className="border rounded p-3">
                    <h3>Card {card + 1} of {totalCards}</h3>
                    <StudyCards cards={cards} card={card} side={side} flipHandler={flipHandler} nextHandler={nextHandler}/>
                </div>
            </main>
        )
    }
    return (<p>Loading Deck...</p>)
}

export default Study;
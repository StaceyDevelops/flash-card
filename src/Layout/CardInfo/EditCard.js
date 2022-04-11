import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readCard, readDeck } from "../../utils/api";
import {Link} from "react-router-dom";
import CardForm from "./CardForm";

/*If the user clicks on either Save or Cancel, the 
user is taken to the Deck screen.*/




function EditCard() {
    const { deckId, cardId } =useParams();

    useEffect(() => {
        async function loadDeck() {
            const deck = await readDeck(deckId);
            setDeck({...deck});
        }
        loadDeck();
    }, [deckId]);

    useEffect(()=>{
        async function loadCard(){
            const card = await readCard(cardId);
            setCard({...card});
            setFormData({
                deckId: parseFloat(deckId),
                id: `${cardId}`,
                front: `${card.front}`,
                back: `${card.back}`
            })
        }
        loadCard();
    }, [deckId,cardId]);

    const initialFormState = {
        deckId: parseFloat(deckId),
        id: `${cardId}`,
    }

    const [formData, setFormData] = useState({});
    const [card, setCard] = useState({});
    const [deck, setDeck] = useState({});

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
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}> Deck
                            {deck.name}
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Edit Card {cardId}
                    </li>
                </ol>
            </nav>
            <h1>Edit Card</h1>
            <CardForm 
                deckId={deckId} 
                cardId={cardId} 
                card={card} 
                initialFormState={initialFormState} 
                formData={formData} 
                setFormData={setFormData}
            />
        </>
    )
}

export default EditCard;
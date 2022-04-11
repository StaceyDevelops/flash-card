import React, { useEffect, useState } from "react";
import { readDeck } from "../../utils/api";
import { useParams } from "react-router-dom";
import  CardForm  from "./CardForm";
import {Link} from "react-router-dom";

function AddCard(){
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});

    useEffect(() => {
        async function loadDeck() {
            const deck = await readDeck(deckId);
            setDeck({...deck});
        }
        loadDeck();
    }, [deckId]);

   const initialFormState = {
        front: "",
        back: "",
    }
    const [formData, setFormData] = useState({...initialFormState});

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            <span className="oi oi-home" />Home
                        </Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>{deck.name}
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Add Card
                    </li>
                </ol>
            </nav>
            <span className="d-flex">
                <h2 className="mb-3 mt-3 mr-2">{deck.name}: </h2>
                <h2 className="mb-3 mt-3">Add Card</h2>
            </span>
            <CardForm
                deckId={deckId} 
                initialFormState={initialFormState} 
                formData={formData} 
                setFormData={setFormData}
            />
        </>
    )
}
export default AddCard;
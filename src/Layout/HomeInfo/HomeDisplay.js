import React from "react";
import { Link } from "react-router-dom";
 

function HomeDisplay({ deck, cards, deleteHandler }) {
    
  /*Existing decks are each shown with the deck name, 
the number of cards, and a Study, View, and Delete button*/

/*Clicking the Study button brings the user to the Study screen.*/

/*Clicking the View button brings the user to the Deck screen.*/  
    
    return (
        <div className="border rounded m-3 p-3">
          <span className="d-flex justify-content-between">
            <h2>{deck.name}</h2>
            <p className="text-secondary">{cards.length} cards</p>
          </span> 
            <p className="deckName">{deck.description}</p>
            <span className="d-flex justify-content-between">
              <span>
                <Link 
                  to={`decks/${deck.id}`}
                  className="btn btn-secondary mr-2"
                >
                  <span className="oi oi-eye" /> View
                </Link>
                <Link 
                  to={`decks/${deck.id}/study`}
                  className="btn btn-primary"
                  title="Study deck"
                >
                 <span className="oi oi-book" /> Study
                </Link>
              </span>
              <button 
                className="btn btn-danger float-right" 
                title="Delete deck"
                onClick={deleteHandler}
              >
                <span className="oi oi-trash" />
              </button>
            </span>
        </div>
      )
    }
    
    export default HomeDisplay;
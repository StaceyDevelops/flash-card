import React from "react";
import { updateCard, createCard } from "../../utils/api";
import { useHistory } from "react-router-dom"

function CardForm({deckId, cardId, card, initialFormState, formData, setFormData}) {

    const history = useHistory();
    const changeHandler = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        })
    }

    const cancelHandler = () => {
        setFormData({...initialFormState});
        history.push(`/decks/${deckId}`);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (!cardId) {
            createCard(deckId, formData)
            .then(() => setFormData({...initialFormState}));
        } else {
            updateCard(formData)
            .then(() => setFormData({...initialFormState}))
            .then(() => history.push(`/decks/${deckId}`));
        }
    }

    if (!cardId) {
        return (
            <div>
                <form onSubmit={submitHandler} className="card-add">
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Front</label>
                        <textarea
                            id="front"
                            tabIndex="1"
                            name="front"
                            value={formData.front}
                            required={true}
                            className="form-control"
                            placeholder="Front side of card"
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="back"  className="form-label">Back</label>
                        <textarea 
                            id="back"
                            tabIndex="2"
                            name="back"
                            className="form-control"
                            required={true}
                            placeholder="Back side of card"
                            value={formData.back}
                            onChange={changeHandler}
                        />
                    </div>
                    <button type="button" className="btn btn-secondary mr-1" onClick={cancelHandler}>Done</button>
                    <button type="submit" className="btn btn-primary m-1">Submit</button>
                </form>
            </div>
        )
    }
    
    return (
        <div>
            <form onSubmit={submitHandler} className="card-edit">
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Front</label>
                    <textarea
                        id="front"
                        tabIndex="1"
                        name="front"
                        value={formData.front}
                        required={true}
                        className="form-control"
                        placeholder="Front side of card"
                        onChange={changeHandler}
                    />
                </div>
                {/* <p>Front</p> */}
                {/* <textarea name="front" type="textarea" id="front" placeholder={`${card.front}`} onChange={changeHandler} value={formData.front}/> */}
                <div className="form-group">
                    <label htmlFor="back"  className="form-label">Back</label>
                    <textarea 
                        id="back"
                        tabIndex="2"
                        name="back"
                        className="form-control"
                        required={true}
                        placeholder="Back side of card"
                        value={formData.back}
                        onChange={changeHandler}
                    />
                </div>
                {/* <textarea name="back" type="textarea" id="back" placeholder={`${card.back}`} onChange={changeHandler} value={formData.back}/> */}
                <button type="button" className="btn btn-secondary mr-1" onClick={cancelHandler}>Cancel</button>
                <button type="submit" className="btn btn-primary m-1">Submit</button>
            </form>
        </div>
    )
}

export default CardForm;
import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./HomeInfo/Home";
import CreateDeck from "./DeckInfo/CreateDeck";
import DisplayDeck from "./DeckInfo/DisplayDeck";
import Study from "./StudyInfo/Study";
import EditDeck from "./DeckInfo/EditDeck";
import AddCard from "./CardInfo/AddCard";
import EditCard from "./CardInfo/EditCard";
import { Route,Switch } from "react-router-dom";

//implement the screen
function Layout() {
  return (
    <div className= "Layout">
      <Header />
      <div className="container"> 
        <Switch>
          <Route path="/" exact> 
            <Home />
          </Route>

          <Route path="/decks/new">
            <CreateDeck />
          </Route>

          <Route path="/decks/:deckId" exact>
            <DisplayDeck />
          </Route>

          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>

          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>

          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>

          <Route>
            <NotFound />
          </Route>

        </Switch>
      </div>
    </div>
  );
}

export default Layout;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";

//TODO: make auto drawer

function CardContainer() {
    const deckId = useRef();
    const timerId = useRef();
    const [drawnCards, updateCards] = useState([]);
    const [autoDraw, setAutoDraw] = useState(false)
    const [buttonText, setButtonText] = useState("Start Drawing!")

    useEffect(function getDeck(){
        async function getDeckID() {
            console.log("fetching deck ID...")
            const deck = await axios.get(
                "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
            )
            deckId.current = deck.data.deck_id;
        }
        getDeckID();
    }, []);
    
    async function drawCard() {
        let newCard = await axios.get(
            `https://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`
        )
        if (newCard.data.cards[0]){
            let imgSrc = newCard.data.cards[0].image
            updateCards(drawnCards => [...drawnCards, <Card src={imgSrc} />])
        } else {
            alert("No more cards!")
            stopTimer();
        }
    }

    function startTimer(){
        timerId.current = timerId.current = setInterval(() => {drawCard()}, 1000);
    }

    function stopTimer(){ 
        clearInterval(timerId.current);
    }

    function handleClick(){
        if (autoDraw == true){
            setAutoDraw(false);
            stopTimer();
            setButtonText("Start Drawing")
        } else if (autoDraw == false){
            setAutoDraw(true);
            startTimer(); 
            setButtonText("Stop Drawing")
        }
    }
    
    return (
      <div>
        <button onClick={handleClick}>{buttonText}</button>
        <p>
            {drawnCards}
        </p>
      </div>
    )
}

export default CardContainer;

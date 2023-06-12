import React from 'react'
import useFetch from '../hooks/useFetch'
import Loader from "../components/Loader"
import classes from "./PracticeScreen.module.css"
import { useState } from 'react'
import ProgressBar from '../components/ProgressBar'
import { useNavigate } from 'react-router'

const PracticeScreen = () => {
    const navigate = useNavigate();
    const { data, error, loading } = useFetch("http://localhost:3500/words", "GET");
    const [showAnswer, setShowAnswer] = useState();
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [questionsAnswered, setQuestionsAnswered] = useState(0);
    const handleButtonPress = (wordPos) => {
        if (questionsAnswered < data.length - 1) {
            setQuestionsAnswered((state) => state += 1);
            if (wordPos === data[questionsAnswered].pos) {
                console.log("correct")
                setShowAnswer("correct")
                setCorrectAnswers((state) => state += 1);
            } else {
                console.log("incorrect");
                setShowAnswer("incorrect");
            }
        } else {
            let score = parseInt((correctAnswers / data.length) * 100);
            navigate(`/rank/${score}`)
        }
        setTimeout(() => {
            setShowAnswer();
        }, 2000)
    }
    return (
        <div className={classes.container}>
            {loading && <Loader />}
            {error && <p>Something went wrong</p>}
            {data &&
                <div className={classes.itemsContainer}>
                    {/* progress bar */}
                    <ProgressBar progress={questionsAnswered * 10} />
                    {/* items */}
                    <h1>{data[questionsAnswered].word}</h1>
                    {/* 4 buttons */}
                    <div>
                        <button onClick={() => handleButtonPress("noun")}>noun</button>
                        <button onClick={() => handleButtonPress("adverb")}>adverb</button>
                        <button onClick={() => handleButtonPress("adjective")}>adjective</button>
                        <button onClick={() => handleButtonPress("verb")}>verb</button>
                    </div>
                    {/* incorrect answer message */}
                    {showAnswer && <div className={classes.alert} style={{ backgroundColor: showAnswer === "incorrect" ? "#f8d7da" : "#d1e7dd" }}>{showAnswer}</div>}
                </div>
            }
        </div>
    )
}

export default PracticeScreen
import React from 'react'
import { useNavigate, useParams } from 'react-router'
import Loader from '../components/Loader';
import useFetch from '../hooks/useFetch';
import classes from "./RankScreen.module.css";
const RankScreen = () => {
    const { score } = useParams();
    const navigate = useNavigate();
    const { data, error, loading } = useFetch("http://localhost:3500/rank", "POST", { finalScore: score })
    const handleButtonPressed = () => {
        navigate("/")
    }
    return (
        <div className={classes.container}>
            {loading && <Loader />}
            {error && <h1>Something went wrong</h1>}
            {data && <div className={classes.itemsContainer}>
                <h2>Your Rank</h2>
                <div className={classes.score}>{data.score}</div>
                <button onClick={handleButtonPressed}>Try Again</button>
            </div>}
        </div>
    )
}

export default RankScreen
import React from 'react'
import classes from "./ProgressBar.module.css";
const ProgressBar = ({ progress }) => {
    return (
        <div className={classes.container}>
            <div className={classes.progressBar}>
                <div className={classes.progressBarField} style={{ width: `${progress}%` }}>

                </div>
            </div>
            <div className={classes.progressLabel}>
                {progress}%
            </div>
        </div>
    )
}

export default ProgressBar
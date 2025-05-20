import { useRef, useState } from "react";

function Timer() {

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [remainingTime, setRemainingTime] = useState(0);
    const intervalRef = useRef(0);
    const [isPaused, setIsPaused] = useState(false);

    function handleTimer(minutes, seconds) {
        const duration = (parseInt(minutes) * 60 + parseInt(seconds));
        console.log(duration);
        setRemainingTime(duration * 1000);
        startInterval();
        setMinutes(0);
        setSeconds(0);
    }

    function handlePauseResume() {
        if (!isPaused) {
            clearInterval(intervalRef.current);
            console.log("paused");
            setIsPaused(true);
        }
        else {
            startInterval();
            setIsPaused(false);
        }

    }

    function handleReset() {
        clearInterval(intervalRef.current);
        setRemainingTime(0);
        setMinutes(0);
        setSeconds(0);
    }

    function startInterval() {
        intervalRef.current = setInterval(() => {
            setRemainingTime((prev) => {
                if (prev <= 1000) {
                    clearInterval(intervalRef.current);
                    console.log("timer up");
                    return 0;
                }
                console.log(`${prev - 1000} remaining`);
                return prev - 1000;
            })
        }, 1000)

    }

    function formatDisplayTime(time){
        const totalSeconds = Math.floor(time /1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`;
    }

    return (
        <div>
            <h2>Timer</h2>
            <form>
                <input type='decimal' value={minutes} onChange={(e) => setMinutes(e.target.value)}></input>
                <label>Minutes</label>
                <input type='decimal' value={seconds} onChange={(e) => setSeconds(e.target.value)} ></input>
                <label>Seconds</label>
                <button onClick={(e) => {
                    e.preventDefault();
                    handleTimer(minutes, seconds)
                }}>START</button>
                <br />
                <button onClick={(e) => {
                    e.preventDefault();
                    handlePauseResume();
                }}>PAUSE/RESUME</button>
                <button onClick={(e) => {
                    e.preventDefault();
                    handleReset();
                }}>RESET</button>
            </form>
            <p>{formatDisplayTime(remainingTime)}</p>
        </div>
    )
}

export default Timer;
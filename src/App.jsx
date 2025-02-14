import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import './App.css';

function App() {
    const [noPosition, setNoPosition] = useState({ top: '50%', left: '60%' });
    const [noMessage, setNoMessage] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);
    const [noCount, setNoCount] = useState(0);
    const [yesShake, setYesShake] = useState(false);
    const [noClicked, setNoClicked] = useState(false);
    const [isFinalYes, setIsFinalYes] = useState(false);
    const [isAccepted, setIsAccepted] = useState(false);
    const [shakeSpeed, setShakeSpeed] = useState(0.8);
    const [yesScale, setYesScale] = useState(1); // Initial Yes size

    const noMessages = [
        "Are you sure? 🤔",
        "But I'm really cute! 😊",
        "Aww, come oan! 😢",
        "You're breaking my heart here! 💔",
        "Think again pal! 🥺",
        "I’ll buy you chocolate! 🍫",
        "What if I do the dishes for you? 🍽️",
        "Last chance! 😭",
        "Good luck saying no now! 😈"
    ];

    useEffect(() => {
        document.documentElement.style.setProperty('--shake-speed', `${shakeSpeed}s`);
        document.documentElement.style.setProperty('--yes-scale', yesScale);
    }, [shakeSpeed, yesScale]);

    const handleNoClick = () => {
        if (noCount < noMessages.length - 1) {
            setNoClicked(true);
            moveNoButton();
        } else {
            setNoMessage(noMessages[noMessages.length - 1]); // Keep the last message
            setNoPosition({ top: '50%', left: '60%' });
            setNoClicked(false);
            setIsFinalYes(true);
            setYesScale(1); // Reset Yes button size when it converts to final Yes
        }
    };

    const moveNoButton = () => {
        if (isFinalYes) return;

        const container = document.querySelector(".button-container");
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const buttonSize = 80;
        const padding = 20;

        const maxLeft = containerRect.width - buttonSize - padding;
        const maxTop = containerRect.height - buttonSize - padding;

        let randomTop, randomLeft;
        let attempts = 0;

        do {
            randomTop = Math.random() * maxTop;
            randomLeft = Math.random() * maxLeft;

            const yesButton = document.querySelector('.yes-button');
            if (yesButton) {
                const yesRect = yesButton.getBoundingClientRect();
                const buffer = 150;

                const isOverlapping =
                    randomLeft > yesRect.left - buffer &&
                    randomLeft < yesRect.right + buffer &&
                    randomTop > yesRect.top - buffer &&
                    randomTop < yesRect.bottom + buffer;

                if (!isOverlapping) break;
            }

            attempts++;
        } while (attempts < 10);

        setNoPosition({ top: `${Math.max(padding, randomTop)}px`, left: `${Math.max(padding, randomLeft)}px` });
        setNoMessage(noMessages[Math.min(noCount, noMessages.length - 1)]);

        // 🔥 Grow the Yes button first
        setYesScale((prevSize) => Math.min(prevSize + 0.2, 2));

        // 🔥 Apply shake only after the growth has been applied
        setTimeout(() => {
            setShakeSpeed((prevSpeed) => Math.max(prevSpeed - 0.1, 0.1)); // Shake gets faster
            setYesShake(true);
        }, 200);

        setNoCount((prevCount) => prevCount + 1);
    };

    const handleYesClick = () => {
        setShowConfetti(true);
        setNoMessage(''); // Clear message only when Yes is clicked
        setIsAccepted(true);
    };

    return (
        <div className="App">
            <div className="App-header">
                <div className="hearts-background">
                    <span className="heart">❤️</span>
                    <span className="heart">💕</span>
                    <span className="heart">💖</span>
                    <span className="heart">💗</span>
                    <span className="heart">💘</span>
                    <span className="heart">❤️</span>
                    <span className="heart">💕</span>
                    <span className="heart">💖</span>
                    <span className="heart">💗</span>
                    <span className="heart">💘</span>
                </div>
                <div className="hearts-background-2">
                    <span className="heart">💘</span>
                    <span className="heart">💗</span>
                    <span className="heart">💕</span>
                    <span className="heart">💖</span>
                    <span className="heart">💗</span>
                    <span className="heart">💘</span>
                    <span className="heart">💕</span>
                    <span className="heart">💖</span>
                </div>
                    <h1 className="valentine-text">Will you be my Valentine? 💖</h1>
                {isAccepted ? (
                    <div className="funny-message">
                        <div className="gif-container">
                            <img src="/left-gif.gif" alt="Excited GIF" className="side-gif left-gif" />
                            <h2>🎉 YOU SAID YES! 🎉</h2>
                            <img src="/right-gif.gif" alt="Happy Dance GIF" className="side-gif right-gif" />
                        </div>
                        <p>There's no backing out now! 😆💘</p>
                        <p>Get ready for endless back chocolates & romantic memes! 🍫😂</p>
                    </div>
                ) : (
                    <>
                        {noMessage && <p className="no-message">{noMessage}</p>}
                        <div className="buttons">
                            <div className="button-container">
                                <button
                                    className={`yes-button ${yesShake && !isFinalYes ? 'shake' : ''}`}
                                    onClick={handleYesClick}
                                >
                                    Yes
                                </button>
                                <button
                                    className={`no-button ${noClicked ? 'absolute' : ''}`}
                                    onClick={isFinalYes ? handleYesClick : handleNoClick}
                                    style={isFinalYes ? { top: '50%', left: '60%' } : { top: noPosition.top, left: noPosition.left }}
                                >
                                    {isFinalYes ? "Yes" : "No"}
                                </button>
                            </div>
                        </div>
                    </>
                )}


                {showConfetti && <Confetti />}
                <div className="hearts-background"></div>
            </div>
        </div>
    );
}

export default App;

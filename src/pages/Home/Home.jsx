/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import './home.css';
import Letter from '../../components/styles/letter.style';

export default function Home() {
  const [letter, setLetter] = useState();
  const [letters, setLetters] = useState([]);
  const [bottomLetter, setBottomLetter] = useState();
  const [bottomLetters, setBottomLetters] = useState([]);
  const [score, setScore] = useState(0);
  const [hitLetter, setHitLetter] = useState(0);
  const [keyNumber, setKeyNumber] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (bottomLetter) {
      if (letters) {
        setLetters((prevLetters) =>
          prevLetters.filter((el) => el.letter_id !== bottomLetter.letter_id)
        );
        setBottomLetters((prevBottomLetters) => [
          ...prevBottomLetters,
          bottomLetter,
        ]);
      }
    }
  }, [bottomLetter]);

  const createRandomColor = () => {
    const stringForColor = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i += 1) {
      color += stringForColor[Math.floor(Math.random() * 16)];
    }
    console.log(color);
    return color;
  };

  useEffect(() => {
    const randomLetter = ['a', 'b', 'c', 'd', 'e'][
      Math.floor(Math.random() * 4)
    ];
    const randomColor = createRandomColor();
    const randomSize = Math.floor(Math.random() * 100) + 20;
    const randomLeftPosition =
      Math.floor(Math.random() * (800 - randomSize)) + 1;

    const createBottomLetter = () => {
      setBottomLetter({
        key: keyNumber + 1000,
        randomLetter: randomLetter,
        animation: false,
        color: randomColor,
        size: randomSize,
        left: randomLeftPosition,
        letter_id: keyNumber,
      });
    };

    if (bottomLetters.length <= 20) {
      setTimeout(() => {
        setKeyNumber((prevKeyNumber) => prevKeyNumber + 1);
        setLetter({
          animation: true,
          color: randomColor,
          size: randomSize,
          left: randomLeftPosition,
          letter_id: keyNumber,
          key: keyNumber,
          randomLetter: randomLetter,
          onAnimationEnd: () => createBottomLetter(),
        });
      }, 1000);
      if (letter) {
        setLetters((prevLetters) => [...prevLetters, letter]);
      }
    }
  }, [letter]);

  useEffect(() => {
    const numberOfLettersFound = letters.filter(
      (el) => el.randomLetter === hitLetter
    ).length;
    if (numberOfLettersFound > 0) {
      setLetters((prevLetters) =>
        prevLetters.filter((el) => el.randomLetter !== hitLetter)
      );
      setScore((prevScore) => prevScore + numberOfLettersFound);
    }
  }, [hitLetter]);

  const handlePlayOrPause = () => {
    setIsRunning(!isRunning);
  };

  document.addEventListener('keyup', (e) => {
    setHitLetter(e.key);
  });

  return (
    <div className="container">
      <p>SCORE: {score}</p>
      <div className="frame animation">
        {bottomLetters.length <= 20 ? (
          <>
            {letters.map((item) => (
              <Letter
                key={item.key}
                className={!isRunning ? 'is-not-running' : ''}
                animation={item.animation}
                animationIsRunning={item.isRunning}
                color={item.color}
                size={item.size}
                left={item.left}
                letter_id={item.letter_id}
                onAnimationEnd={item.onAnimationEnd}
              >
                {item.randomLetter}
              </Letter>
            ))}
            {bottomLetters &&
              bottomLetters.map((item) => (
                <Letter
                  key={item.key}
                  animation={item.animation}
                  color={item.color}
                  size={item.size}
                  left={item.left}
                  letter_id={item.letter_id}
                >
                  {item.randomLetter}
                </Letter>
              ))}
            <div className="line" />
          </>
        ) : (
          'game over'
        )}
      </div>
      <button type="button" onClick={handlePlayOrPause}>
        pause
      </button>
    </div>
  );
}

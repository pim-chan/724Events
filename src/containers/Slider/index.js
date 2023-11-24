import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  
  const [isPaused, setIsPaused] = useState(false);

  const handleRadioChange = (radioIndx) => {
    setIndex(radioIndx);
    setIsPaused(true); // Mettre en pause le setInterval au clic
    setTimeout(() => {
      setIsPaused(false); // Reprendre le setInterval après 5 secondes
    }, 2000);
  };

  const nextCard = () => {
    if (!isPaused) {
      setIndex((currentIndx) =>
        currentIndx < byDateDesc.length - 1 ? currentIndx + 1 : 0
      );
    }
  };

  useEffect(() => {
    const intervalSlide = setInterval(nextCard, 5000);

    return () => clearInterval(intervalSlide);
  }, [byDateDesc, isPaused]);
  

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
          <div
            key={`slide-card-${event.title}`}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt={event.title} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{new Date(event.date).toLocaleString('fr-FR', {month: 'long'})}</div>
              </div>
            </div>
          </div>
      ))}
    <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIndx) => (
            <input
              key={`radio-button-${event.id}`}
              type="radio"
              name="radio-button"
              checked={index === radioIndx}
              onChange={() => handleRadioChange(radioIndx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;

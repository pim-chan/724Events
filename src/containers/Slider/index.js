import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
  );

  const handleRadioChange = (radioIndex) => {
    setIndex(radioIndex);
  };

  const nextCard = () => {
    if (byDateDesc) {
      setIndex((currentIndex) =>
        currentIndex < byDateDesc.length - 1 ? currentIndex + 1 : 0
      );
    }
  };

  useEffect(() => {
    const intervalSlide = setInterval(nextCard, 5000);
    return () => clearInterval(intervalSlide);
  });

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
          {byDateDesc?.map((event, radioIndex) => ( //
            <input
              key={`radio-button-${event.id}`}
              type="radio"
              name="radio-button"
              checked={index === radioIndex}
              onChange={() => handleRadioChange(radioIndex)} // Changement du slide affiché par celui choisi
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;

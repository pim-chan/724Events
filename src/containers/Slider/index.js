import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  // Le slider passe automatiquement à la carte suivante toutes les 5 secondes, mais peut être mis en pause pendant 2 secondes lorsqu'un utilisateur interagit avec les boutons radio.
  const handleKeyPress = (event) => {
    if (event.key === " ") {
      // Appuyer sur la touche espace
      setIsPaused((prevIsPaused) => !prevIsPaused); // Inverser l'état de pause
    }
  };

  const handleRadioChange = (radioIndex) => {
    setIndex(radioIndex); // Mise à jour de l'index = changement slide affiché 
    setIsPaused(true); // Mettre en pause le défilement du slider au clic 
    setTimeout(() => {
      setIsPaused(false); 
    }, 2000); // La mise en pause du défilement est stoppé après 2 secondes
  };

  // Si le défilement du slider n'est pas en pause, passez au slide suivant
  const nextCard = () => {
    if (!isPaused) {
      setIndex((currentIndex) =>
        currentIndex < byDateDesc.length - 1 ? currentIndex + 1 : 0
      ); // Si le dernier slide est affiché, repasser au premier
    }
  };

  useEffect(() => {
    const intervalSlide = setInterval(nextCard, 5000); // Passes au slide suivant toutes les 5 secondes

    return () => clearInterval(intervalSlide); 
  }, [byDateDesc, isPaused]); // Lorsque les dépendances spécifiées changent, l'interval se remet à 0/récréation d'un interval de 5 secondes.

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

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

import "./app.css";

type Props = {
  samples: { url: string; name: string }[];
  numOfSteps: number;
};
export default function App({ samples, numOfSteps }: Props) {
  const trackIds = [...Array(samples.length).keys()] as const;
  const stepIds = [...Array(numOfSteps).keys()] as const;

  return (
    <div className="container">
      <div className="container__grid">
        <div className="container__grid__list">
          {trackIds.map((trackId) => (
            <div key={trackId} className="container__grid__list__row">
              {stepIds.map((stepId) => {
                const id = trackId + "-" + stepId;
                const groupIndex = Math.floor(stepId / 4); // Récupérer le groupe de 4 colonnes actuel (0, 1, 2, ...)
                const bgColorClass = groupIndex % 2 === 0 ? "gray-bg" : "red-bg";
                return (
                  <label key={id} className="container__grid__list__row__cell">
                    <input
                      id={id}
                      type="checkbox"
                      className="container__grid__list__row__cell__input"
                    />
                    <div className={`container__grid__list__row__cell__content ${bgColorClass}`} />
                  </label>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

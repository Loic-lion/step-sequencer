import "../../css/piste.css";
import useOptionStore from "../Store/option-store";

export default function Piste() {
  const { activeReadingTrack } = useOptionStore() as {
    activeReadingTrack: boolean;
  };
  const optionReadingTrack = activeReadingTrack ? "active__reading-track" : "";

  return (
    <section className={`container__piste ${optionReadingTrack}`}>
      <h2> WORK IN PROGRESS </h2>
    </section>
  );
}

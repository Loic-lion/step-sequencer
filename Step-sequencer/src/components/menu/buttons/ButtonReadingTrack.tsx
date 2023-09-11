import IconReadTrack from "../../../../public/icons/chronologie.png";
import useOptionStore from "../../Store/option-store";

function ButtonReadingTrack() {
  const { activeReadingTrack, toggleActiveReadingTrack } = useOptionStore() as {
    activeReadingTrack: boolean;
    toggleActiveReadingTrack: () => void;
  };
  console.log(activeReadingTrack);

  return (
    <button onClick={toggleActiveReadingTrack}>
      <img src={IconReadTrack} />
    </button>
  );
}

export default ButtonReadingTrack;

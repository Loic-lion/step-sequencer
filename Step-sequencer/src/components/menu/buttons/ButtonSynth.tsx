import IconSynth from "../../../../public/icons/piano.png";
import useOptionStore from "../../Store/option-store";

function ButtonSynth() {
  const { activeSynth, toggleActiveSynth } = useOptionStore() as {
    activeSynth: boolean;
    toggleActiveSynth: () => void;
  };
  console.log(activeSynth);

  return (
    <button onClick={toggleActiveSynth}>
      <img src={IconSynth} />
    </button>
  );
}

export default ButtonSynth;

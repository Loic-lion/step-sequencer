import IconStepSequencer from "../../../../public/icons/mpd-top-view.png";
import useOptionStore from "../../Store/option-store";

function ButtonStepSequencer() {
  const { activeSequencer, toggleActiveSequencer } = useOptionStore() as {
    activeSequencer: boolean;
    toggleActiveSequencer: () => void;
  };
  console.log(activeSequencer);
  return (
    <button onClick={toggleActiveSequencer}>
      <img src={IconStepSequencer} />
    </button>
  );
}

export default ButtonStepSequencer;

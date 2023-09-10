import IconMixer from "../../../../public/icons/mixer.png"
import useButtonStore from '../../Store/mixer-store';


function ButtonMixer() {
  const { active, toggleActive } = useButtonStore() as { active: boolean; toggleActive: () => void }; 
  console.log(active);

  return (
    <button onClick={toggleActive}>
      <img src={IconMixer} alt="icone for the mixer" />
    </button>
  );
}

export default ButtonMixer;

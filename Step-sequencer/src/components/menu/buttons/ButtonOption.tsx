import IconOption from "../../../../public/icons/option.png";
import useOptionStore from "../../Store/option-store";

function ButtonOption() {
  const { active, toggleActive } = useOptionStore() as {
    active: boolean;
    toggleActive: () => void;
  };
  console.log(active);
  return (
    <button onClick={toggleActive}>
      <img src={IconOption} />
    </button>
  );
}

export default ButtonOption;

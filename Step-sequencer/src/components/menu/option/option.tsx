import "../../../css/option.css";
import useOptionStore from "../../Store/option-store";

function Option() {
  
  const { active } = useOptionStore() as { active: boolean };
  const optionClass = active ? "active__option" : "";

  return (
    <section className={`container__option ${optionClass}`}>
      <nav>
        <ul>
          <li>
            Add{" "}
            <select>
              <option value="Synth">Synth</option>
              <option value="PolySynth">PolySynth</option>
              <option value="FMSynth">FMSynth</option>
            </select>
            <button>+</button>
          </li>
          <li>
            Buffers Size{" "}
            <select>
              <option value="256">256</option>
              <option value="512">512</option>
              <option value="1024">1024</option>
            </select>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default Option;

import "../../../css/mixer.css";
import useButtonStore from "../../Store/mixer-store";
import Master from "./master";

function Mixer() {
  const { active } = useButtonStore() as { active: boolean };

  const footerClass = active ? "active__mixer" : "";

  return (
    <footer className={footerClass}>
      <h2>Mixer</h2>
      <section className="container__racks">
        <Master />
      </section>
    </footer>
  );
}

export default Mixer;

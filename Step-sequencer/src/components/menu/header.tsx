import ButtonPlayStop from "./buttons/ButtonPlayStop";
import React from "react";

function Header() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  console.log(isPlaying);
  return (
    <header>
      <h1> DAW Project</h1>
      <section>
        <ButtonPlayStop setIsPlaying={setIsPlaying} />
      </section>
    </header>
  );
}
export default Header;

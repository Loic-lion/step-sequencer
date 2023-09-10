import { useState } from "react";

function ButtonBPM() {
  const [bpm, setBpm] = useState(120);

  const handleChange = (e: any) => {
    setBpm(e.target.value);
  };

  return (
    <input
      type="number"
      min="1"
      max="999"
      value={bpm}
      onChange={handleChange}
    />
  );
}

export default ButtonBPM;

import React from "react";

type SampleButtonProps = {
  sampleName: string;
};

const SampleButton: React.FC<SampleButtonProps> = ({ sampleName }) => {
  return <button className="sample-button">{sampleName}</button>;
};

export default SampleButton;

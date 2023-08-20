type SampleButtonProps = {
  sampleName: string;
};

function SampleButton({ sampleName }: SampleButtonProps) {
  return <button className="sample-button">{sampleName}</button>;
}
export default SampleButton;

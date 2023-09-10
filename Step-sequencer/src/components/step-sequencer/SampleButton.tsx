type SampleButtonProps = {
  sampleName: string;
};

function SampleButton({ sampleName }: SampleButtonProps) {
  return <button className="sample__button">{sampleName}</button>;
}
export default SampleButton;

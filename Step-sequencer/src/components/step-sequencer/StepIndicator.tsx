type Props = {
  currentStep: number;
  numOfSteps: number;
};

export const StepIndicator = ({ currentStep, numOfSteps }: Props) => {
  return (
    <div className="step-indicator">
      {[...Array(numOfSteps)].map((_, index) => (
        <div
          key={index}
          className={`step-indicator__step ${
            currentStep === index ? "active-step" : ""
          }`}
        ></div>
      ))}
    </div>
  );
};

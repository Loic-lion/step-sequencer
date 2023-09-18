import React from "react";
import "../../css/pattern-control.css";

type PatternControlsProps = {
  patterns: boolean[][][];
  onCreatePattern: () => void;
  onSelectPattern: (index: number) => void;
  onDeletePattern: (index: number) => void;
};

const PatternControls: React.FC<PatternControlsProps> = ({
  patterns,
  onCreatePattern,
  onSelectPattern,
  onDeletePattern,
}) => {
  return (
    <div className="container__patterns">
      <button className="container__patterns__add" onClick={onCreatePattern}>+</button>
      <div className="container__patterns__buttons">
        {patterns.map((_, index) => (
          <div className="container__patterns__buttons__comp" key={index}>
            <button
              className="container__patterns__buttons__comp__pattern"
              onClick={() => onSelectPattern(index)}
            >
              Pattern {index + 1}
            </button>
            {index > 0 && (
              <button
                className="container__patterns__buttons__comp__delete"
                onClick={() => onDeletePattern(index)}
              >
                🗑
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatternControls;

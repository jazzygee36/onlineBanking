import React from 'react';

interface ProgressBarProps {
  step: number; // values 1 through 4
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  const circlePositions = [6, 155, 303, 452];
  const totalBarWidth = 458;

  // Calculate red bar width based on the step.
  // We want:
  // - step === 1: red covers from x=6 to the center of the 2nd circle.
  // - step === 2: red covers from x=6 to the center of the 3rd circle.
  // - step === 3: red covers from x=6 to the center of the 4th circle.
  // - step >= 4: red covers the entire bar.
  let redWidth = 0;
  if (step === 1) {
    redWidth = circlePositions[1] - 6; // from x=6 to circle 2 center
  } else if (step === 2) {
    redWidth = circlePositions[2] - 6; // from x=6 to circle 3 center
  } else if (step === 3) {
    redWidth = circlePositions[3] - 6; // from x=6 to circle 4 center
  } else if (step >= 4) {
    redWidth = totalBarWidth; // full width of the bar
  }

  return (
    <svg
      // width='458'
      height='12'
      viewBox='0 0 458 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='w-[95%] md:w-[458px] m-auto'
    >
      {/* Background bar (gray) */}
      <rect y='4' width='458' height='4' rx='2' fill='#E8ECEF' />

      {/* Red progress bar */}
      <rect x='6' y='4' width={redWidth} height='4' rx='2' fill='#D71E0E' />

      {/* Step circles */}
      {circlePositions.map((cx, index) => {
        const stepNumber = index + 1;
        const fillColor = step >= stepNumber ? '#D71E0E' : '#E8ECEF';
        return <circle key={index} cx={cx} cy='6' r='6' fill={fillColor} />;
      })}
    </svg>
  );
};

export default ProgressBar;

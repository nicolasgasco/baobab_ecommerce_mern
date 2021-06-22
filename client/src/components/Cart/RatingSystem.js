import { useEffect, useState } from "react";

const RatingSystem = ({
  classes,
  getRatingValue,
  notInteractive,
  ratingValue,
}) => {
  const [starRating, setStarRating] = useState(0);
  const [hoverStarRating, setHoverStarRating] = useState(0);

  useEffect(() => {
    setStarRating(0);
  }, []);

  const handleMouseEnter = (value) => {
    setHoverStarRating(value);
  };

  const handleMouseLeave = () => {
    setHoverStarRating(0);
  };

  const determineFillColor = (value) => {
    // Not interactive version
    if (notInteractive) {
      return ratingValue >= value ? "#F59E0B" : "#9CA3AF";
    } else {
      if (hoverStarRating) {
        return hoverStarRating >= value ? "#FCD34D" : "#9CA3AF";
      } else {
        return starRating >= value ? "#F59E0B" : "#9CA3AF";
      }
    }
  };

  const handleOnClick = (value) => {
    setStarRating(value);
    getRatingValue(value);
  };

  const showStars = [1, 2, 3, 4, 5].map((number) => {
    return (
      <div
        className={notInteractive ? "pr-1" : "pr-4 lg:pr-2"}
        onMouseEnter={
          notInteractive ? undefined : () => handleMouseEnter(number)
        }
        onMouseLeave={notInteractive ? undefined : handleMouseLeave}
        onClick={notInteractive ? undefined : () => handleOnClick(number)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={notInteractive ? 13 : 18}
          height={notInteractive ? 12 : 17}
          viewBox="0 0 14 13"
          fill="none"
        >
          <path
            d="M6.52447 0.463524C6.67415 0.00286841 7.32585 0.00286996 7.47553 0.463525L8.68386 4.18237C8.75079 4.38838 8.94277 4.52786 9.15938 4.52786H13.0696C13.554 4.52786 13.7554 5.14767 13.3635 5.43237L10.2001 7.73075C10.0248 7.85807 9.95149 8.08375 10.0184 8.28976L11.2268 12.0086C11.3764 12.4693 10.8492 12.8523 10.4573 12.5676L7.29389 10.2693C7.11865 10.1419 6.88135 10.1419 6.70611 10.2693L3.54267 12.5676C3.15081 12.8523 2.62357 12.4693 2.77325 12.0086L3.98157 8.28976C4.04851 8.08375 3.97518 7.85807 3.79994 7.73075L0.636495 5.43237C0.244639 5.14767 0.446028 4.52786 0.93039 4.52786H4.84062C5.05723 4.52786 5.24921 4.38838 5.31614 4.18237L6.52447 0.463524Z"
            fill={determineFillColor(number)}
          />
        </svg>
      </div>
    );
  });

  return <div className={`flex items-center ${classes}`}>{showStars}</div>;
};

export default RatingSystem;

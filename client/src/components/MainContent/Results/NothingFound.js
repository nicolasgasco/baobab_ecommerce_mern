import React from "react";

const NothingFound = () => {
  return (
    <div>
      <h2 className="text-3xl mt-3 mb-1 md:m-8 md:mt-10 font-semibold text-center">
        Oops... There's nothing to show here!
      </h2>
      <img
        className="mx-auto"
        src={
          "https://res.cloudinary.com/ngasco/image/upload/v1624283212/bonsai_background/empty_2_lvulpa.gif"
        }
        alt="Man staring at empty box"
      />
    </div>
  );
};

export default React.memo(NothingFound);

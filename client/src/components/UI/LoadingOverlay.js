import React from "react";
import classes from "./LoadingOverlay.module.scss";

const LoadingOverlay = () => {
  return (
    <div className="bg-green-100 bg-opacity-60 fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
      <div>
        <h2 className="text-3xl mt-3 mb-1 md:m-8 md:mt-10 font-semibold text-center">
          Loading...
        </h2>
        <div className={`${classes.loader} ${classes.loader1}`}>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(LoadingOverlay);

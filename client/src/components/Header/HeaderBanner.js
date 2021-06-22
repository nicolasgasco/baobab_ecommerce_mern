import { SpeakerphoneIcon, XIcon } from "@heroicons/react/outline";
import { useState } from "react";
import ReactDOM from "react-dom";

const BannerContent = () => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <div className="bg-yellow-500">
        <div className="max-w-11xl mx-auto py-1.5 px-3 sm:px-6 lg:px-8 z-10">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
              <span className="flex p-2 rounded-lg bg-yellow-700">
                <SpeakerphoneIcon
                  className="h-4 w-4 text-white"
                  aria-hidden="true"
                />
              </span>
              <p className="ml-3 font-small text-white">
                <span className="md:hidden">
                  {"Click "}
                  <a
                    href="https://github.com/nicolasgasco"
                    target="blank"
                    classList="cursor-pointer underline"
                  >
                    here
                  </a>
                  {" for my Github!"}
                </span>
                <span className="hidden md:inline">
                  {"Click "}
                  <a
                    href="https://github.com/nicolasgasco"
                    target="blank"
                    classList="cursor-pointer underline"
                  >
                    here
                  </a>
                  {" to see my Github!"}
                </span>
              </p>
            </div>
            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
              <button
                type="button"
                onClick={() => {
                  setShow(false);
                }}
                className="-mr-1 flex p-2 rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
              >
                <span className="sr-only">Dismiss</span>
                <XIcon className="h-5 w-5 text-white" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

const HeaderBanner = () => {
  return (
    <>
      {ReactDOM.createPortal(
        <BannerContent />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default HeaderBanner;

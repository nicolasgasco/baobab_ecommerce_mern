import { SpeakerphoneIcon, XIcon } from "@heroicons/react/outline";
import { useState } from "react";
import ReactDOM from "react-dom";

const BannerContent = () => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <div className="bg-yellow-600">
        <div className="max-w-11xl mx-auto py-1.5 px-3 sm:px-6 lg:px-8 z-10">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
              <span className="flex p-2 rounded-lg bg-yellow-800">
                <SpeakerphoneIcon
                  className="h-4 w-4 text-white"
                  aria-hidden="true"
                />
              </span>
              <p className="ml-3 font-small text-white">
                <span className="md:hidden">
                  This page is available in English and Spanish!
                </span>
                <span className="hidden md:inline">
                  This page is available in English and Spanish!
                </span>
              </p>
            </div>
            {/* <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              <a
                href="#"
                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Learn more
              </a>
            </div> */}
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
    return (<></>);
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

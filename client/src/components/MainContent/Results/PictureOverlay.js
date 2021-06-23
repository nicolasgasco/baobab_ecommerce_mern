import ReactDOM from "react-dom";

const OverlayContent = ({ src, alt, handleClosePicture }) => {
  return (
    <div>
      <div
        className="py-12 bg-gray-600 bg-opacity-70 transition duration-150 ease-in-out fixed top-0 right-0 bottom-0 left-0 z-20"
        id="modal"
        onClick={handleClosePicture}
      ></div>
      <div role="alert" className="mx-auto  flex justify-center">
        <div className="z-40 absolute py-10 px-1 sm:px-5 md:px-10 bg-white shadow-md rounded border border-gray-400 w-11/12  lg:w-6/12 xl:w-5/12 2xl:w-4/12">
          {/* X symbol */}
          <div className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Close"
              className="icon icon-tabler icon-tabler-x"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              onClick={handleClosePicture}
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1={18} y1={6} x2={6} y2={18} />
              <line x1={6} y1={6} x2={18} y2={18} />
            </svg>
          </div>
          <img
            src={src}
            alt={alt}
            className="mx-auto h-full shadow-md rounded-lg max-h-screen"
          />
        </div>
      </div>
    </div>
  );
};

const PictureOverlay = (props) => {
  console.log(props);
  return (
    <>
      {ReactDOM.createPortal(
        <OverlayContent
          alt={props.alt}
          src={props.src}
          handleClosePicture={props.handleClosePicture}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default PictureOverlay;

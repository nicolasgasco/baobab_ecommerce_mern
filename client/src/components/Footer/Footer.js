import BaobabLogo from "../../assets/img/baobab.svg";
import classes from "./Footer.module.scss";

const IndexPage = () => {
  return (
    <>
      <div className="bg-gray-200 bg-opacity-60 pb-6 p-0 mt-8 footer-background border-gray-200 border-t-8">
        <div className="mx-auto container pt-20 lg:pt-30 flex flex-col items-center justify-center">
          <img
            src={BaobabLogo}
            alt="Illustration of a baobab"
            className="w-32 h-32"
          />
          <div className="text-black flex flex-col md:items-center f-f-l pt-3">
            <h1 className="text-2xl font-black text-center">
              Baobab. Shopping. With conscience.
            </h1>
            <div className="text-md text-color mb-5 mt-5 f-f-l flex justify-center content-baseline">
              <p className="pr-2">© Created with </p>
              <div className={classes["centered-box"]}>
                <span
                  className={`${classes["heart"]} ${classes["animate-beat"]}`}
                >
                  💚
                </span>
              </div>{" "}
              <p>by Nicolas Gasco</p>
            </div>
            <div className="mt-3 mb-10 text-base text-color f-f-l">
              <ul className="text-center md:flex items-center">
                <li className=" md:mr-6 cursor-pointer pt-4 lg:py-0">About</li>
                <li className=" md:mr-6 cursor-pointer pt-4 lg:py-0">
                  Features
                </li>
                <li className=" md:mr-6 cursor-pointer pt-4 lg:py-0">
                  Careers
                </li>
                <li className=" md:mr-6 cursor-pointer pt-4 lg:py-0">Help</li>
                <li className="cursor-pointer pt-4 lg:py-0">Privacy Policy</li>
              </ul>
            </div>
            <div className="text-color mb-10 f-f-l text-center text-xs">
              <p>
                <a
                  href="https://storyset.com/work"
                  target="_blank"
                  rel="noreferrer"
                >
                  Work illustrations by Storyset
                </a>
              </p>
              <p>
                Icons by{" "}
                <a
                  href="https://www.freepik.com"
                  title="Freepik"
                  target="_blank"
                  rel="noreferrer"
                >
                  Freepik
                </a>
                {" and "}{" "}
                <a
                  href="https://www.flaticon.com/authors/smashicons"
                  title="Smashicons"
                  target="_blank"
                  rel="noreferrer"
                >
                  Smashicons
                </a>{" "}
                from{" "}
                <a
                  href="https://www.flaticon.com/"
                  title="Flaticon"
                  target="_blank"
                  rel="noreferrer"
                >
                  www.flaticon.com
                </a>
              </p>
              <p>
                <a
                  href="https://www.freepik.com/vectors/background"
                  target="_blank"
                  rel="noreferrer"
                >
                  Background vector created by visnezh from www.freepik.com
                </a>
              </p>
              <a
                href="https://www.vecteezy.com/free-vector/nature"
                target="_blank"
                rel="noreferrer"
              >
                Nature Vectors by Vecteezy
              </a>
              <p>
                <a
                  href="https://codepen.io/clairecodes/pen/wyrJMe"
                  target="_blank"
                  rel="noreferrer"
                >
                  Pulsing heart by Claire
                </a>
              </p>
            </div>
          </div>
          <div className="w-9/12  h-0.5 bg-gray-100 rounded-full" />
          <div className="flex justify-between items-center pt-12">
            <div className="mr-4">
              <a
                href={"https://github.com/nicolasgasco"}
                target={"_blank"}
                rel="noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
            <div>
              <a
                href={"https://www.linkedin.com/in/nicolasgasco/"}
                target={"_blank"}
                rel="noreferrer"
              >
                <img
                  src={
                    "https://res.cloudinary.com/ngasco/image/upload/v1624048194/bonsai_background/linkedin_toeevg.svg"
                  }
                  alt={"LinkedIn logo"}
                  className="w-12"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;

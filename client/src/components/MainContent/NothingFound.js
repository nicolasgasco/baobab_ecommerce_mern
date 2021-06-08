import Empty from "../../assets/img/Empty.gif";

const NothingFound = () => {
  return (
    <div>
      <h2 className="text-3xl mt-3 mb-1 md:m-8 md:mt-10 font-semibold text-center">
        Oops... There's nothing to show here!
      </h2>
      <img className="mx-auto" src={Empty} alt="Man staring at empty box" />
    </div>
  );
};

export default NothingFound;

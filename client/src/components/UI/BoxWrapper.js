const BoxWrapper = (props) => {
  return (
    <section className="flex justify-center">
      <div
        className={`w-full md:w-10/12 sm:max-w-2xl md:max-w-7xl xl:max-w-6xl py-6 md:py-12 px-3 lg:px-12 my-8 mx-2 md:mx-10 lg:mx-36  rounded-xl shadow-xl bg-white min-h-full" +
    ${props.className}`}
      >
        {props.children}
      </div>
    </section>
  );
};
export default BoxWrapper;

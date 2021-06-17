const BoxWrapper = (props) => {
  const classes =
    "lg:max-w-6xl py-6 md:py-12 px-3 lg:px-12 my-8 lg:my-16 mx-2 md:mx-10 lg:mx-36  rounded-xl shadow-xl bg-white min-h-full" +
    props.className;
  return (
    <section className="flex justify-center">
      <div className={classes}>{props.children}</div>
    </section>
  );
};
export default BoxWrapper;

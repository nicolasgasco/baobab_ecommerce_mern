import classes from "./SectionLoading.module.scss";

const SectionLoading = () => {
  return (
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
  );
};

export default SectionLoading;

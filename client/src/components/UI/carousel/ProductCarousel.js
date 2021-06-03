import classes from "./ProductCarousel.module.css";

const ProductCarousel = (props) => {
  return (
      <div className={`${classes.carousel} ${props.className}`}>
        <div className={`${classes["carousel-inner"]}`}>
          <input
            className={`${classes["carousel-open"]}`}
            type="radio"
            id="carousel-1"
            name="carousel"
            aria-hidden="true"
            hidden
            defaultChecked="checked"
          />
          <div className={`${classes["carousel-item"]}`}>
            <img src="https://parafina.eco/wp-content/uploads/2020/02/S21-CAL-TRA-SIL1.jpg" />
          </div>
          <input
            className={`${classes["carousel-open"]}`}
            type="radio"
            id="carousel-2"
            name="carousel"
            aria-hidden="true"
            hidden
          />
          <div className={`${classes["carousel-item"]}`}>
            <img src="https://parafina.eco/wp-content/uploads/2020/02/S21-CAL-TRA-SIL2.jpg" />
          </div>
          <input
            className={`${classes["carousel-open"]}`}
            type="radio"
            id="carousel-3"
            name="carousel"
            aria-hidden="true"
            hidden
          />
          <div className={`${classes["carousel-item"]}`}>
            <img src="https://parafina.eco/wp-content/uploads/2020/02/S21-CAL-TRA-SIL3.jpg" />
          </div>
          <ol className={`${classes["carousel-indicators"]}`}>
            <li>
              <label
                htmlFor="carousel-1"
                className={`${classes["carousel-bullet"]}`}
              >
                •
              </label>
            </li>
            <li>
              <label
                htmlFor="carousel-2"
                className={`${classes["carousel-bullet"]}`}
              >
                •
              </label>
            </li>
            <li>
              <label
                htmlFor="carousel-3"
                className={`${classes["carousel-bullet"]}`}
              >
                •
              </label>
            </li>
          </ol>
        </div>
      </div>
 );
};

export default ProductCarousel;

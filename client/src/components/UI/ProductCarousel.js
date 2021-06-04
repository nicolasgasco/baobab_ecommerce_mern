import classes from "./ProductCarousel.module.css";

const ProductCarousel = (props) => {
  return (
      <div className={`${props.className} w-100 bg-white`}>
        
        <div className="relative overflow-hidden w-full h-full">
          <input
            className={`${classes["carousel-open"]}`}
            type="radio"
            id={`carousel-1-${props.id}`}
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
            id={`carousel-2-${props.id}`}
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
            id={`carousel-3-${props.id}`}
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
                htmlFor={`carousel-1-${props.id}`}
                className={`${classes["carousel-bullet"]}`}
              >
                •
              </label>
            </li>
            <li>
              <label
                htmlFor={`carousel-2-${props.id}`}
                className={`${classes["carousel-bullet"]}`}
              >
                •
              </label>
            </li>
            <li>
              <label
                htmlFor={`carousel-3-${props.id}`}
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

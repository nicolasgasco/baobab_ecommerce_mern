import Spinner from "../../assets/img/Spinner-5.gif";

const ProductCard = (props) => {
  let showPictureOrLoader = (
    <img
      src={props.product.pictures[0].url}
      alt={props.product.pictures[0].alt}
      className="w-full object-cover object-center"
    />
  );
  if (props.picturesLoading) {
    showPictureOrLoader = (
      <img
        src={Spinner}
        alt="Loading animation"
        className="w-1/3 mx-auto p-5 object-cover object-center"
      />
    );
  }

  return (
    <div
      id={`product${props.product.id}`}
      className="pb-10 px-0 md:px-4 md:w-1/2 lg:w-1/3 xl:w-1/4"
    >
      <div className="bg-white py-10 rounded-lg shadow-md">
        {showPictureOrLoader}
      </div>
      <div className="relative px-4 -mt-6">
        <div className="bg-yellow-200 p-5 rounded-lg shadow-xl">
          <div className="flex items-baseline">
            <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
              New
            </span>
            <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
              2 baths • 3 rooms
            </div>
          </div>
          <h4 className="mt-1 text-xl leading-tight">
            {`${props.product.completeName.brand} ${props.product.completeName.productName}, ${props.product.completeName.shortDesc}, ${props.product.completeName.productDesc1}, ${props.product.completeName.productDesc2}, ${props.product.completeName.productDesc3}, ${props.product.completeName.color}`}
          </h4>
          <div className="mt-1 text-2xl">
            {props.product.pricingInfo.price}
            <sup className> €</sup>
          </div>
          <div className="mt-4">
            <span className="text-teal-600 text-md font-semibold">
              4/5 ratings{" "}
            </span>
            <span className="text-sm text-gray-600">
              (based on 234 ratings)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

import { UserAddIcon } from "@heroicons/react/solid";
import { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import AuthContext from "../../store/auth-context";
import jwt_decode from "jwt-decode";
import ModalContext from "../../store/modal-context";

const ProfilePage = () => {
  const [countryNames, setCountryNames] = useState(["Loading..."]);
  const countryInputRef = useRef();
  const addressInputRef = useRef();
  const cityInputRef = useRef();
  const provinceInputRef = useRef();
  const postalInputRef = useRef();

  const [errorMessages, setErrorMessages] = useState([]);

  const { handleModalText } = useContext(ModalContext);

  const [userData, setUserData] = useState(() => {
    if (localStorage.getItem("token")) {
      return jwt_decode(localStorage.getItem("token"));
    } else {
      return {};
    }
  });
  const [userAddress, setUserAddress] = useState(async () => {
    // Get user first
    try {
      const res = await fetch(`/api/users/${userData._id}`);
      const user = await res.json();
      if (user.resultsFound && user.result.address) {
        setUserAddress(user.result.address);
      } else {
        throw new Error();
      }
    } catch (err) {
      setUserAddress({});
    }
  });
  const [isEditing, setIsEditing] = useState(false);

  const history = useHistory();

  const capitalizeWord = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const handleEditButton = () => {
    setIsEditing(true);
  };
  const handleForm = async (event) => {
    event.preventDefault();

    let user;
    // Get user first
    try {
      const res = await fetch(`/api/users/${userData._id}`);
      user = await res.json();
    } catch (err) {
      handleModalText("Something went wrong");
    }

    const updatedUserData = {
      ...user.result,
      address: {
        countryCode: countryInputRef.current.value,
        province: provinceInputRef.current.value,
        city: cityInputRef.current.value,
        zip: postalInputRef.current.value,
        street: addressInputRef.current.value,
      },
    };

    delete updatedUserData.email;

    setErrorMessages([]);
    console.log("putting");
    fetch(`/api/users/${userData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserData),
    })
      .then((res) => {
        // // This is the token
        // for (const header of res.headers) {
        //   if (header[0] === "x-auth-token") {
        //     console.log(header[1]);
        //   }
        // }
        console.log("json");
        return res.json();
      })
      .then((res) => {
        console.log(res);
        if (res.error) throw new Error(res.error);
        console.log(res);
        setErrorMessages([]);
        history.push("/");
        setIsEditing(false);
        handleModalText("Personal data changed successfully!");
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessages(error.message.split(","));
        console.log("An error ocurred: " + error.message);
      });
  };

  const showErrorMessages = errorMessages.map((error) => {
    return <li>{error}</li>;
  });

  useEffect(() => {
    setErrorMessages([]);
  }, []);

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => res.json())
      .then((res) => {
        const countryList = res.map((country) => {
          return [country.name, country.alpha3Code];
        });
        setCountryNames(countryList);
      })
      .catch((error) => {
        console.log("En error ocurred: " + error);
      });
  }, []);

  //   Not authorized
  useEffect(() => {
    if (!localStorage.getItem("token")) history.push("/");
  }, [localStorage, history]);

  const showCountries = countryNames.map((country) => {
    if (country[0] === "Spain") {
      return (
        <option
          ref={countryInputRef}
          selected
          id={country[1]}
          value={country[1]}
        >
          {country[0]}
        </option>
      );
    } else {
      return (
        <option ref={countryInputRef} id={country[1]} value={country[1]}>
          {country[0]}
        </option>
      );
    }
  });

  return (
    <div className="bg-white my-12 mx-10 rounded-xl shadow-xl h-2/3 ">
      <div className="px-5 md:col-span-1">
        <div className="px-6 py-2 sm:px-0">
          <h3 className="text-xl font-medium leading-6 text-gray-900">
            Personal Information
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Use a permanent address where you can receive mail.
          </p>
        </div>
      </div>
      <form onSubmit={handleForm}>
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <input
                  value={capitalizeWord(userData.name)}
                  readOnly
                  type="text"
                  name="first_name"
                  id="first_name"
                  autoComplete="given-name"
                  className="bg-gray-100 mt-2 p-1 ring-1 ring-gray-300 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="last_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <input
                  value={capitalizeWord(userData.surname)}
                  readOnly
                  type="text"
                  name="last_name"
                  id="last_name"
                  autoComplete="family-name"
                  className="bg-gray-100 mt-2 p-1 ring-1 ring-gray-300 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label
                  htmlFor="email_address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  value={userData.email}
                  readOnly
                  type="text"
                  name="email_address"
                  id="email_address"
                  autoComplete="email"
                  className="bg-gray-100 mt-2 p-1 ring-1 ring-gray-300 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender
                </label>
                <select
                  value={userData.gender}
                  readOnly
                  id="gender"
                  name="gender"
                  autoComplete="sex"
                  required
                  placeholder="Gender"
                  className="bg-gray-100 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                >
                  <option selected value="f">
                    Female
                  </option>
                  <option value="m">Male</option>
                  <option value="o">Other</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country / Region
                </label>
                <select
                  ref={countryInputRef}
                  id="country"
                  name="country"
                  autoComplete="country"
                  required
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                >
                  {showCountries}
                </select>
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="street_address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Street address
                </label>
                <input
                  ref={addressInputRef}
                  type="text"
                  name="street_address"
                  id="street_address"
                  required
                  autoComplete="street-address"
                  disabled={!isEditing}
                  value={userAddress.street}
                  className="mt-2 p-1 ring-1 ring-gray-300 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  ref={cityInputRef}
                  type="text"
                  name="city"
                  id="city"
                  required
                  disabled={!isEditing}
                  value={userAddress.city}
                  className="mt-2 p-1 ring-1 ring-gray-300 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State / Province
                </label>
                <input
                  ref={provinceInputRef}
                  type="text"
                  name="state"
                  id="state"
                  required
                  disabled={!isEditing}
                  value={userAddress.province}
                  className="mt-2 p-1 ring-1 ring-gray-300 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label
                  htmlFor="postal_code"
                  className="block text-sm font-medium text-gray-700"
                >
                  ZIP / Postal
                </label>
                <input
                  ref={postalInputRef}
                  type="text"
                  name="postal_code"
                  id="postal_code"
                  autoComplete="postal-code"
                  required
                  disabled={!isEditing}
                  value={userAddress.zip}
                  className="mt-2 p-1 ring-1 ring-gray-300 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
          {/* Error messages */}
          {errorMessages.length > 0 && (
            <div
              class="mx-5 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
              role="alert"
            >
              <h4 className="font-bold text-xl">Wrong data</h4>
              <ul className="ml-5 list-disc">{showErrorMessages}</ul>
            </div>
          )}

          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            {!isEditing && (
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={handleEditButton}
              >
                Edit
              </button>
            )}
            {isEditing && (
              <>
                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-4 ml-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  onClick={() => {
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 ml-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Save
                </button>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;

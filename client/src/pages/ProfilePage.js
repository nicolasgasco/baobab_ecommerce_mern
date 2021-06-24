import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import jwt_decode from "jwt-decode";
import ModalContext from "../store/modal-context";

import LoadingOverlay from "../components/UI/LoadingOverlay";

import useInput from "../hooks/use-input";

const ProfilePage = () => {
  // For authentication
  const { handleModalText } = useContext(ModalContext);
  const history = useHistory();

  // For handling editing and loading status
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Redirecting if not authorized
  useEffect(() => {
    if (!localStorage.getItem("token")) history.push("/");
  }, [history]);

  // Fetching countries for dropdown
  const [countryNames, setCountryNames] = useState(["Loading..."]);

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

  // User data from LocalStorage
  const [userData, setUserData] = useState(async () => {
    setIsLoading(true);
    try {
      const { _id: id } = jwt_decode(localStorage.getItem("token"));
      // Get user and see if there's already an address
      const res = await fetch(`/api/users/${id}`);
      const user = await res.json();
      if (user.resultsFound) {
        setUserData(user.result);
        setIsLoading(false);
      } else {
        throw new Error();
      }
    } catch (err) {
      return {};
    }
  });

  // Address info fetched from database, if existing
  const [userAddress, setUserAddress] = useState(async () => {
    setIsLoading(true);

    try {
      const { _id: id } = jwt_decode(localStorage.getItem("token"));
      // Get user and see if there's already an address
      const res = await fetch(`/api/users/${id}`);
      const user = await res.json();
      if (user.resultsFound && user.result.address) {
        setUserAddress(user.result.address);
        setIsLoading(false);
      } else {
        throw new Error();
      }
    } catch (err) {
      return {};
    }
  });

  // Custom hook for inputs
  const {
    value: name,
    setEnteredValue: setEnteredName,
    valueChangeHandler: nameChangeHandler,
  } = useInput(userData.name);

  const {
    value: surname,
    setEnteredValue: setEnteredSurname,
    valueChangeHandler: surnameChangeHandler,
  } = useInput(userData.surname);

  const {
    value: street,
    valueChangeHandler: streetChangeHandler,
    setEnteredValue: setEnteredStreet,
  } = useInput(userAddress.street);

  const {
    value: province,
    valueChangeHandler: provinceChangeHandler,
    setEnteredValue: setEnteredProvince,
  } = useInput(userAddress.province);

  const {
    value: city,
    valueChangeHandler: cityChangeHandler,
    setEnteredValue: setEnteredCity,
  } = useInput(userAddress.city);

  const {
    value: country,
    // valueChangeHandler: countryChangeHandler,
    setEnteredValue: setEnteredCountry,
  } = useInput(userAddress.country);

  const {
    value: zip,
    valueChangeHandler: zipChangeHandler,
    setEnteredValue: setEnteredZip,
  } = useInput(userAddress.zip);

  const setLegacyData = () => {
    setEnteredName(userData.name);
    setEnteredSurname(userData.surname);
    setEnteredStreet(userAddress.street);
    setEnteredProvince(userAddress.province);
    setEnteredCity(userAddress.city);
    setEnteredCountry(userAddress.country);
    setEnteredZip(userAddress.zip);
  };

  // This is necessary because userAdress if asynchronous
  useEffect(() => {
    setLegacyData();
  }, [userAddress, userData]);

  // Error messages shown in a box below form
  const [errorMessages, setErrorMessages] = useState([]);

  const handleEditButton = () => {
    setIsEditing(true);
  };

  const handleCancelButton = () => {
    setErrorMessages([]);
    setIsEditing(false);
    setLegacyData();
  };

  // Send PUT request to modify data
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
      name,
      surname,
      address: {
        countryCode: country,
        province,
        city,
        zip,
        street,
      },
    };

    setErrorMessages([]);
    setIsLoading(true);
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
        return res.json();
      })
      .then(async (res) => {
        if (res.error) throw new Error(res.error);

        // Reset error messages
        setErrorMessages([]);

        // No editing nor loading any more
        setIsEditing(false);
        setIsLoading(false);

        // Redirect to home and show modal
        history.push("/");
        handleModalText("Personal data changed successfully!");
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoading(false);
        setErrorMessages(error.message.split(","));
        console.log("An error ocurred: " + error.message);
      });
  };

  // Showing all error messages coming from API
  const showErrorMessages = errorMessages.map((error) => {
    return <li>{error}</li>;
  });

  // Starting without error messages
  useEffect(() => {
    setErrorMessages([]);
  }, []);

  // Selecting either the current country from DB or Spain
  const showCountries = countryNames.map((country) => {
    if (
      (userAddress.countryCode && country[1] === userAddress.countryCode) ||
      (!userAddress.countryCode && country[0] === "Spain")
    ) {
      return (
        <option selected id={country[1]} value={country[1]}>
          {country[0]}
        </option>
      );
    } else {
      return (
        <option id={country[1]} value={country[1]}>
          {country[0]}
        </option>
      );
    }
  });

  return (
    <>
      {/* Loading animation, PUT takes a bit of time */}
      {isLoading && <LoadingOverlay />}
      <form onSubmit={handleForm}>
        <div className="overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="first_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  autoComplete="given-name"
                  disabled={!isEditing}
                  value={isEditing ? name : userData.name}
                  onChange={nameChangeHandler}
                  className="mt-2 p-1 ring-1 ring-gray-300 placeholder-black focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                  type="text"
                  name="last_name"
                  id="last_name"
                  autoComplete="family-name"
                  disabled={!isEditing}
                  value={isEditing ? surname : userData.surname}
                  onChange={surnameChangeHandler}
                  className="mt-2 p-1 ring-1 ring-gray-300 placeholder-black focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                  id="gender"
                  name="gender"
                  autoComplete="sex"
                  required
                  placeholder="Gender"
                  value={userData.gender}
                  disabled={!isEditing}
                  className={`${
                    !isEditing && "bg-gray-100"
                  } mt-1 block w-full py-2 px-3 border placeholder-black border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm`}
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
                  id="country"
                  name="country"
                  autoComplete="country"
                  required
                  disabled={!isEditing}
                  className={`${
                    !isEditing && "bg-gray-100"
                  } mt-1 block w-full py-2 px-3 border  placeholder-black border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm`}
                >
                  {showCountries}
                </select>
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="street"
                  className="block text-sm font-medium text-gray-700"
                >
                  Street address
                </label>
                <input
                  type="text"
                  name="street"
                  id="street"
                  required
                  autoComplete="street-address"
                  disabled={!isEditing}
                  value={isEditing ? street : userAddress.street}
                  onChange={streetChangeHandler}
                  className="mt-2 p-1 ring-1 ring-gray-300 placeholder-black focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                  type="text"
                  name="city"
                  id="city"
                  required
                  disabled={!isEditing}
                  value={isEditing ? city : userAddress.city}
                  onChange={cityChangeHandler}
                  className="mt-2 p-1 ring-1 ring-gray-300 placeholder-black focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                  type="text"
                  name="state"
                  id="state"
                  required
                  disabled={!isEditing}
                  value={isEditing ? province : userAddress.province}
                  onChange={provinceChangeHandler}
                  className="mt-2 p-1 ring-1 ring-gray-300 placeholder-black focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                  type="text"
                  name="postal_code"
                  id="postal_code"
                  autoComplete="postal-code"
                  required
                  disabled={!isEditing}
                  value={isEditing ? zip : userAddress.zip}
                  onChange={zipChangeHandler}
                  className="mt-2 p-1 ring-1 ring-gray-300 placeholder-black focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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

          <div className="px-4 text-right sm:px-6">
            {!isEditing && (
              <button
                type="button"
                className="inline-flex justify-center py-2 px-4 my-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={handleEditButton}
              >
                Edit
              </button>
            )}
            {isEditing && (
              <>
                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-4 my-2 ml-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  onClick={handleCancelButton}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 my-2  ml-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Save
                </button>
              </>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default ProfilePage;

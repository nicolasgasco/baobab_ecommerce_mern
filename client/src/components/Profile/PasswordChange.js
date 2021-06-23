import { useState, useContext } from "react";
import { useHistory } from "react-router";
import AuthContext from "../../store/auth-context";
import ModalContext from "../../store/modal-context";

import LoadingOverlay from "../UI/LoadingOverlay";

import jwt_decode from "jwt-decode";

import useHttp from "../../hooks/use-http";

const PasswordChange = () => {
  const { checkPassword } = useContext(AuthContext);
  const { handleModalText } = useContext(ModalContext);

  const history = useHistory();

  const { sendRequest: patchPassword, isLoading, setIsLoading } = useHttp();

  // const [isLoading, setIsLoading] = useState(false);

  const { _id: id, email } = jwt_decode(localStorage.getItem("token"));

  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);

  const handleCurrentPassword = (event) => {
    setPasswordCorrect(false);
    setErrorMessages([]);
    setCurrentPassword(event.target.value);
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const checkPasswordValidity = async () => {
    setErrorMessages([]);
    if (passwordCorrect) return;
    if (localStorage.getItem("token")) {
      setIsLoading(true);
      try {
        const result = await checkPassword({
          email,
          password: currentPassword,
        });
        if (result) {
          setPasswordCorrect(!!result);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setErrorMessages(["Wrong password!"]);
      }
    } else {
      history.push("/");
      history.go(0);
    }
  };

  const handleCancelButton = () => {
    history.push("/");
  };

  const handleFormSubmit = async (event) => {
    setErrorMessages([]);
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessages(["The two passwords don't match"]);
    } else {
      setIsLoading(true);
      const handlePatchedUser = (result) => {
        if (result.error) {
          setIsLoading(false);
          setErrorMessages(
            result.error
              .split("(Joi): ")[1]
              .split(",")
              .map((error) => {
                return error.replaceAll('"', "");
              })
          );
        }
        if (result.updatedCount === 1) {
          setIsLoading(false);
          handleModalText("Password changed!");
        }
      };

      patchPassword(
        {
          url: `/api/users/${id}`,
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: { password: confirmPassword },
        },
        handlePatchedUser
      );
    }
  };

  // Showing all error messages coming from API
  const showErrorMessages = errorMessages.map((error) => {
    return <li>{error.charAt(0).toUpperCase() + error.slice(1)}</li>;
  });

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <div className="md:col-span-1">
        <div className="md:col-span-2">
          <form onSubmit={handleFormSubmit}>
            <div className="overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-4">
                    <label
                      htmlFor="email_address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Current password
                    </label>
                    <input
                      type="password"
                      name="current-password"
                      id="current-password"
                      autoComplete="current-password"
                      disabled={passwordCorrect}
                      value={currentPassword}
                      onChange={handleCurrentPassword}
                      onBlur={checkPasswordValidity}
                      className={`mt-2 p-1 ring-1 ring-gray-300 placeholder-black focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 ${
                        passwordCorrect
                          ? "bg-green-100 ring-green-900"
                          : currentPassword && "bg-red-100 ring-red-900"
                      } rounded-md`}
                    />
                  </div>
                  <div
                    className={`col-span-6 sm:col-span-3 ${
                      !passwordCorrect && "hidden"
                    }`}
                  >
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      New password
                    </label>
                    <input
                      type="password"
                      name="new-password"
                      id="new-password"
                      autoComplete="new-password"
                      required
                      disabled={!passwordCorrect}
                      value={newPassword}
                      onChange={handleNewPassword}
                      className="mt-2 p-1 ring-1 ring-gray-300 placeholder-black focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div
                    className={`col-span-6 sm:col-span-3 ${
                      !passwordCorrect && "hidden"
                    }`}
                  >
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="confirm-password"
                      id="confirm-password"
                      autoComplete="new-password"
                      required
                      disabled={!passwordCorrect}
                      value={confirmPassword}
                      onChange={handleConfirmPassword}
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
                  <h4 className="font-bold text-xl">Error</h4>
                  <ul className="ml-5 list-disc">{showErrorMessages}</ul>
                </div>
              )}
              <div className="px-4 text-right sm:px-6">
                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-4 ml-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  onClick={handleCancelButton}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 ml-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PasswordChange;

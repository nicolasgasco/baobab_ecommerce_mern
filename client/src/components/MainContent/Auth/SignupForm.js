import { LockClosedIcon } from "@heroicons/react/solid";
import { useRef, useState, useContext, useEffect } from "react";
import BaobabLogo from "../../../assets/img/baobab.svg";

import AuthContext from "../../../store/auth-context";
import ModalContext from "../../../store/modal-context";

const SignupForm = () => {
  const nameInput = useRef();
  const surnameInput = useRef();
  const genderInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const repeatPasswordInput = useRef();

  const { signupUser, isLogged } = useContext(AuthContext);
  const { handleModalText } = useContext(ModalContext);

  // const [logged, setLogged] = useState(isLogged);

  const submitHandler = async (event) => {
    event.preventDefault();

    if (passwordInput.current.value !== repeatPasswordInput.current.value) {
      console.log(passwordInput.current.value,  repeatPasswordInput.current.value);
      handleModalText("The two passwords don't match!");
      return;
    }

    const userData = {
      name: nameInput.current.value,
      surname: surnameInput.current.value,
      gender: genderInput.current.value,
      email: emailInput.current.value,
      password: passwordInput.current.value,
    };
    await signupUser(userData);
  };

  // useEffect(() => {
  //   setLogged(isLogged);
  // }, [isLogged]);

  return (
    <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 my-12 mx-10 rounded-xl shadow-xl h-2/3 ">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src={BaobabLogo}
            alt="Illustration of baobab"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up for a free account
          </h2>
          {/* <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <a className="font-medium text-green-600 hover:text-green-500 cursor-pointer">
              sign up for a free account!
            </a>
          </p> */}
        </div>
        <form onSubmit={submitHandler} className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                ref={nameInput}
                id="name"
                name="name"
                type="text"
                autoComplete="given-name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Name"
              />
            </div>
            <div>
              <label htmlFor="surname" className="sr-only">
                Surname
              </label>
              <input
                ref={surnameInput}
                id="surname"
                name="surname"
                type="text"
                autoComplete="family-name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Surname"
              />
            </div>
          </div>

          <div className="rounded-md shadow-sm -space-y-px">
            <div className="shorter-input">
              <label htmlFor="gender" className="sr-only">
                Gender
              </label>
              <select
                ref={genderInput}
                id="gender"
                name="gender"
                autoComplete="sex"
                required
                placeholder="Gender"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              >
                <option selected disabled style={{ display: "none" }}>
                  Gender:
                </option>
                <option value="f">Female</option>
                <option value="m">Male</option>
                <option value="o">Other</option>
              </select>
            </div>
          </div>

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                ref={emailInput}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                ref={passwordInput}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="new-password" className="sr-only">
                Repeat password
              </label>
              <input
                ref={repeatPasswordInput}
                id="new-password"
                name="new-password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Repeat password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            {/* <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-green-600 hover:text-green-500"
              >
                Forgot your password?
              </a>
            </div> */}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-green-500 group-hover:text-green-400"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;

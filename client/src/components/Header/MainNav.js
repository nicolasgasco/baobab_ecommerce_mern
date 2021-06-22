import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ShoppingCartIcon,
  MenuIcon,
  XIcon,
  UserIcon,
} from "@heroicons/react/outline";
import BaobabLogo from "../../assets/img/baobab.svg";

import AuthContext from "../../store/auth-context";
import CartContext from "../../store/cart-context";

import jwt_decode from "jwt-decode";

const MainNav = () => {
  // This came with the component
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const history = useHistory();

  // User related states
  const { logoutUser, handleOpenLogin } = useContext(AuthContext);
  // Used for greeting user on main nav
  const [userGreeting, setUserGreeting] = useState("");
  const navigation = [userGreeting];
  // Profile menu items
  const profile = ["Your profile", "Your orders", "Change password", "Sign in"];
  // User for user data in mobile view
  const [userDataFromToken, setUserDataFromToken] = useState({});

  // Fetching user data from token
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUserDataFromToken(jwt_decode(localStorage.getItem("token")));
    }
  }, []);

  // Setting user greeting
  useEffect(() => {
    if (userDataFromToken.name) {
      setUserGreeting(`Hi, ${capitalizeWord(userDataFromToken.name)}!`);
    } else {
      setUserGreeting("Hi, stranger!");
    }
  }, [userDataFromToken]);

  // Cart related
  const { items } = useContext(CartContext);
  const [itemsNum, setItemsNum] = useState(items ? items.length : 0);
  // Bouncing animation for when adding new items
  const [bounceAnimation, setBounceAnimation] = useState("");

  // Setting the bounce animation and taking it away after half a second
  useEffect(() => {
    setItemsNum(items ? items.length : 0);
    setBounceAnimation("animate-bounce");
    setTimeout(() => {
      setBounceAnimation("");
    }, 500);
  }, [items]);

  const handleSignin = () => {
    history.push("/signin");
    handleOpenLogin();
  };

  const handleLogout = () => {
    logoutUser();
    history.go(0);
    setUserGreeting("");
  };

  // When clicking on nav main log
  const handleLogo = () => {
    history.push("/");
  };

  // Utility function for when showing name
  const capitalizeWord = (word) => word.charAt(0).toUpperCase() + word.slice(1);

  // All menu items for desktop view
  const showProfileItems = profile.map((item, index) => {
    // Sign in
    if (item === "Sign in") {
      return (
        <Menu.Item key={`profile-item-${index + 1}`}>
          {({ active }) => (
            <Link
              id={`profile-item-${index + 1}`}
              onClick={
                localStorage.getItem("token") ? handleLogout : handleSignin
              }
              className={classNames(
                active ? "bg-gray-100" : "",
                `block px-4 py-2 text-sm text-gray-700 cursor-pointer ${
                  localStorage.getItem("token") && "bg-yellow-200"
                } rounded-md`
              )}
            >
              {localStorage.getItem("token") ? "Log out" : item}
            </Link>
          )}
        </Menu.Item>
      );
      // Your profile
    } else if (item === "Your profile") {
      return (
        localStorage.getItem("token") && (
          <Menu.Item key={`profile-item-${index + 1}`}>
            {({ active }) => (
              <Link
                to="/profile"
                id={`profile-item-${index + 1}`}
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                )}
              >
                {item}
              </Link>
            )}
          </Menu.Item>
        )
      );
    } else if (item === "Change password") {
      return (
        localStorage.getItem("token") && (
          <Menu.Item key={`profile-item-${index + 1}`}>
            {({ active }) => (
              <Link
                to="/password"
                id={`profile-item-${index + 1}`}
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                )}
              >
                {item}
              </Link>
            )}
          </Menu.Item>
        )
      );
    } else if (item === "Your orders") {
      return (
        localStorage.getItem("token") && (
          <Menu.Item key={`profile-item-${index + 1}`}>
            {({ active }) => (
              <Link
                to="/orders"
                id={`profile-item-${index + 1}`}
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                )}
              >
                {item}
              </Link>
            )}
          </Menu.Item>
        )
      );
    }
    // This is to silence warning
    return null;
  });

  // All menu items for mobile view
  const showProfileItemsMobile = profile.map((item, index) => {
    // Sign in
    if (item === "Sign in") {
      return (
        <Disclosure.Button
          key={`profile-item-${index + 1}`}
          id={`profile-item-${index + 1}`}
          className={classNames(
            `w-full text-left hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700 cursor-pointer bg-yellow-200 rounded-md`
          )}
        >
          <Link
            to={localStorage.getItem("token") ? "/" : "/signin"}
            onClick={
              localStorage.getItem("token") ? handleLogout : handleSignin
            }
          >
            {localStorage.getItem("token") ? "Log out" : item}
          </Link>
        </Disclosure.Button>
      );
      // Your profile
    } else if (item === "Your profile") {
      return (
        localStorage.getItem("token") && (
          <Disclosure.Button
            id={`profile-item-${index + 1}`}
            className={classNames(
              "hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700 cursor-pointer"
            )}
          >
            <Link to="/profile">{item}</Link>
          </Disclosure.Button>
        )
      );
    } else if (item === "Change password") {
      return (
        localStorage.getItem("token") && (
          <Disclosure.Button
            id={`profile-item-${index + 1}`}
            className={classNames(
              "hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700 cursor-pointer"
            )}
          >
            <Link to="/password">{item}</Link>
          </Disclosure.Button>
        )
      );
    } else if (item === "Your orders") {
      return (
        localStorage.getItem("token") && (
          <Disclosure.Button
            to="/orders"
            id={`profile-item-${index + 1}`}
            className={classNames(
              "hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700 cursor-pointer"
            )}
          >
            <Link to="/orders">{item}</Link>
          </Disclosure.Button>
        )
      );
    }
    // This is to silence warning
    return null;
  });

  // This is not used at the moment

  // const showCartItems = cart.map((item, index) => {
  //   return (
  //     <Menu.Item key={item}>
  //       {({ active }) => (
  //         <Link
  //           to={item === "See cart" && "/cart"}
  //           id={`cart-item-${index + 1}`}
  //           className={classNames(
  //             active ? "bg-gray-100" : "",
  //             "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
  //           )}
  //         >
  //           {item}
  //         </Link>
  //       )}
  //     </Menu.Item>
  //   );
  // });

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <header className="max-w-7xl mx-auto mb-3 md:mb-0 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0 out">
                  <img
                    onClick={handleLogo}
                    className="h-12 w-12 cursor-pointer"
                    src={BaobabLogo}
                    alt="Workflow"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {localStorage.getItem("token") &&
                      navigation.map((item, itemIdx) =>
                        itemIdx === 0 ? (
                          <Fragment key={item}>
                            <p className="bg-green-900 text-white px-3 py-2 rounded-md text-sm font-medium cursor-default">
                              {item}
                            </p>
                          </Fragment>
                        ) : (
                          <p
                            key={item}
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                          >
                            {item}
                          </p>
                        )
                      )}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <Menu as="div" className="ml-3 relative">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="bg-gray-600 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">View profile</span>
                            <ShoppingCartIcon
                              onClick={() => {
                                if (items.length > 0) {
                                  history.push("/cart");
                                }
                              }}
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                            <div
                              className={`absolute top-0 right-0 mt-7 -mr-3 px-2 ${bounceAnimation} bg-yellow-500 rounded-full text-sm text-white font-bold`}
                            >
                              {itemsNum > 0 && itemsNum}
                            </div>
                          </Menu.Button>
                        </div>
                        {/* <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            {showCartItems}
                          </Menu.Items>
                        </Transition> */}
                      </>
                    )}
                  </Menu>

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    {({ open }) => (
                      <>
                        <div>
                          {/* <Menu.Button className="max-w-xs bg-gray-600 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={UserCircleIcon}
                              alt="Generic avatar logo"
                            />
                          </Menu.Button> */}
                          <Menu.Button className="bg-gray-600 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">View profile</span>
                            <UserIcon className="h-6 w-6" aria-hidden="true" />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 pb-0 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            {showProfileItems}
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-gray-600 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </header>

          {/* Mobile version */}
          <Disclosure.Panel className="md:hidden bg-white mb-5">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {/* Navigation only has one element at the moment */}
              {navigation.map((item, itemIdx) =>
                itemIdx === 0 ? (
                  <Fragment key={item}>
                    <div className="bg-green-800 text-white block px-3 py-2 rounded-md text-base font-medium">
                      {item}
                    </div>
                  </Fragment>
                ) : (
                  // This is not used at the moment
                  <p
                    key={item}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    {item}
                  </p>
                )
              )}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                {userDataFromToken.name && (
                  <>
                    <div className="flex-shrink-0 bg-gray-600 p-1 rounded-full text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <UserIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    {/* Box with name and e-mail */}
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-gray-800">
                        {`${capitalizeWord(
                          userDataFromToken.name
                        )} ${capitalizeWord(userDataFromToken.surname)}`}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {userDataFromToken && userDataFromToken.email}
                      </div>
                    </div>
                  </>
                )}

                <Disclosure.Button className="ml-auto bg-gray-600 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">View shopping cart</span>
                  <ShoppingCartIcon
                    onClick={() => {
                      if (items.length > 0) {
                        history.push("/cart");
                      }
                    }}
                    className="h-6 w-6"
                    aria-hidden="true"
                  />
                </Disclosure.Button>
                <div
                  className={`relative mt-8 -ml-2 -mr-2 px-2 ${bounceAnimation} bg-yellow-500 rounded-full text-sm text-white font-bold`}
                >
                  {itemsNum > 0 && itemsNum}
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1" show={open}>
                {showProfileItemsMobile}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default MainNav;

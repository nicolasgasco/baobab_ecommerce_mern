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
  const history = useHistory();

  // User related
  const { logoutUser, handleOpenLogin, isLogged, token } =
    useContext(AuthContext);
  const [userGreeting, setUserGreeting] = useState("");
  const navigation = [userGreeting];
  const profile = ["Your profile", "Change password", "Sign in"];

  // Cart related
  const { items } = useContext(CartContext);
  // I'm not using this any more
  const cart = ["See cart"];
  const [itemsNum, setItemsNum] = useState(items ? items.length : 0);
  const [bounceAnimation, setBounceAnimation] = useState("");

  useEffect(() => {
    setItemsNum(items ? items.length : 0);
    setBounceAnimation("animate-bounce");
    setTimeout(() => {
      setBounceAnimation("");
    }, 500);
  }, [items]);

  // This came with the component
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleSignin = () => {
    if (!localStorage.getItem("token")) {
      history.push("/signin");
      handleOpenLogin();
    } else {
      logoutUser();
      history.go(0);
      setUserGreeting("");
    }
  };

  const handleLogo = () => {
    history.push("/");
    history.go(0);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUserGreeting(
        `Hi, ${
          jwt_decode(localStorage.getItem("token"))
            .name.charAt(0)
            .toUpperCase() +
          jwt_decode(localStorage.getItem("token")).name.substring(1)
        }!`
      );
    } else {
      setUserGreeting("");
    }
  }, [isLogged, userGreeting, token]);

  // Second element is for signing in
  const showProfileItems = profile.map((item, index) => {
    // Sign in
    if (item === "Sign in") {
      return (
        <Menu.Item key={item}>
          {({ active }) => (
            <Link
              id={`profile-item-${index + 1}`}
              onClick={handleSignin}
              className={classNames(
                active ? "bg-gray-100" : "",
                "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
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
          <Menu.Item key={item}>
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
          <Menu.Item key={item}>
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
    }
  });

  // Showing counter only if there are items in cart
  let showItemCounterMobile;
  if (itemsNum > 0) {
    showItemCounterMobile = (
      <div
        className={`relative mt-8 -ml-2 -mr-2 px-2 ${bounceAnimation} bg-yellow-500 rounded-full text-sm text-white font-bold`}
      >
        {itemsNum}
      </div>
    );
  }

  let showItemCounterDesktop;
  if (itemsNum > 0) {
    showItemCounterDesktop = (
      <div
        className={`absolute top-0 right-0 mt-7 -mr-3 px-2 ${bounceAnimation} bg-yellow-500 rounded-full text-sm text-white font-bold`}
      >
        {itemsNum}
      </div>
    );
  }

  const showCartItems = cart.map((item, index) => {
    return (
      <Menu.Item key={item}>
        {({ active }) => (
          <Link
            to={item === "See cart" && "/cart"}
            id={`cart-item-${index + 1}`}
            className={classNames(
              active ? "bg-gray-100" : "",
              "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
            )}
          >
            {item}
          </Link>
        )}
      </Menu.Item>
    );
  });

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
                {/* {localStorage.getItem("token") && (
                  <div class="mx-5 bg-green-600 text-white font-bold py-2 px-4 rounded-full">
                    <p>{`Hi, ${
                      jwt_decode(localStorage.getItem("token")).name
                    }!`}</p>
                  </div>
                )} */}
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {localStorage.getItem("token") &&
                      navigation.map((item, itemIdx) =>
                        itemIdx === 0 ? (
                          <Fragment key={item}>
                            <a
                              href="#"
                              className="bg-green-900 text-white px-3 py-2 rounded-md text-sm font-medium cursor-default"
                            >
                              {item}
                            </a>
                          </Fragment>
                        ) : (
                          <a
                            key={item}
                            href="#"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                          >
                            {item}
                          </a>
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
                            {showItemCounterDesktop}
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
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
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

          <Disclosure.Panel className="md:hidden bg-white mb-5">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item, itemIdx) =>
                itemIdx === 0 ? (
                  <Fragment key={item}>
                    {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                    <div className="bg-green-900 text-white block px-3 py-2 rounded-md text-base font-medium">
                      {item}
                    </div>
                  </Fragment>
                ) : (
                  <a
                    key={item}
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0 bg-gray-600 p-1 rounded-full text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <UserIcon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-gray-800">
                    Tom Cook
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    tom@example.com
                  </div>
                </div>
                <Link
                  className="ml-auto bg-gray-600 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View shopping cart</span>
                  <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                </Link>
                {showItemCounterMobile}
              </div>
              <div className="mt-3 px-2 space-y-1">
                {profile.map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default MainNav;

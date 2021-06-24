import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const SectionedDropdown = ({ handleSortingFilter }) => {
  const [dropdownItems, setDropdownItems] = useState([
    [
      { title: "Price ascending", value: "pricingInfo.price" },
      { title: "Price descending", value: "-pricingInfo.price" },
    ],
    [
      { title: "Newest first", value: "-creationDate" },
      { title: "Oldest first", value: "creationDate" },
    ],
  ]);
  const [currentItem, setCurrentItem] = useState("");

  const showItems = dropdownItems.map(([item1, item2], index) => {
    return (
      <div className="py-1" key={`div-${index + 1}`}>
        <Menu.Item key={`div-${index + 1}-a`}>
          {({ active }) => (
            <button
              onClick={function () {
                handleSortingFilter(this.value);
                setCurrentItem(item1.title);
              }}
              value={item1.value}
              className={classNames(
                active ? "bg-green-100 text-gray-900" : "text-gray-700",
                "block w-full px-4 py-2 text-sm text-right"
              )}
            >
              {item1.title}
            </button>
          )}
        </Menu.Item>
        <Menu.Item key={`div-${index + 1}-b`}>
          {({ active }) => (
            <button
              onClick={function () {
                handleSortingFilter(this.value);
                setCurrentItem(item2.title);
              }}
              value={item2.value}
              className={classNames(
                active ? "bg-green-100 text-gray-900" : "text-gray-700",
                "block w-full px-4 py-2 text-sm text-right"
              )}
            >
              {item2.title}
            </button>
          )}
        </Menu.Item>
      </div>
    );
  });

  return (
    <Menu as="div" className="relative inline-block text-left z-10">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-green-500">
              {"Sort by"}
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
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
              className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
            >
              {showItems}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default SectionedDropdown;

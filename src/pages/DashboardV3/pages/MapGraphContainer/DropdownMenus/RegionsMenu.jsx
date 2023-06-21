import React from "react";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

import { BsArrowDownUp } from "react-icons/bs";
import { BsArrowUp } from "react-icons/bs";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function sortRegion(array) {
  let arr = array.slice(1);     //removing the first element i.e array[0] = 'All'
  let sortedArr = arr.sort(function (a, b) {
    return a.localeCompare(b);
  });
  return [array[0], ...sortedArr];
}

export default function RegionsMenu({
  selectedRegion,
  regions,
  regionChangeHandler,
}) {
  return (
    <div className="w-1/4 p-2">
      <Listbox value={selectedRegion} onChange={(e) => regionChangeHandler(e)}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
              Regions
            </Listbox.Label>
            <div className="relative mt-2">
              <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                <span className="flex items-center">
                  <span className="ml-3 block truncate">{selectedRegion}</span>
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <BsArrowDownUp
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {sortRegion(regions).map((data) => (
                    <Listbox.Option
                      key={data}
                      className={({ active }) =>
                        classNames(
                          active ? "bg-indigo-600 text-white" : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-3 pr-9"
                        )
                      }
                      value={data}
                    >
                      {({ selectedRegion, active }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={classNames(
                                selectedRegion
                                  ? "font-semibold"
                                  : "font-normal",
                                "ml-3 block truncate"
                              )}
                            >
                              {data}
                            </span>
                          </div>

                          {selectedRegion ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <BsArrowUp
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}

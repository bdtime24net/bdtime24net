import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SidebarMenu from "./SidebarMenu";
import SecondaryNavigation from "./SecondaryNavigation";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  return (
    <>
      {/* Sidebar for mobile screens */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setSidebarOpen}
        >
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75 backdrop-blur-sm"
            aria-hidden="true"
            onClick={() => setSidebarOpen(false)}
          />
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-cyan-700">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <div
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                <h1 className="text-3xl font-bold ">Easywire</h1>
              </div>
              <nav
                className="mt-5 flex-shrink-0 h-full divide-y divide-cyan-800 overflow-y-auto"
                aria-label="Sidebar"
              >
                <div className="px-2 space-y-1">
                  <SidebarMenu />
                </div>
                <div className="mt-6 pt-6">
                  <div className="px-2 space-y-1">
                    <SecondaryNavigation />
                  </div>
                </div>
              </nav>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            aperiam dicta ducimus sed, quam placeat a ex eveniet voluptate
            officiis deleniti tempore veritatis perspiciatis corrupti libero
            earum accusamus facilis alias.
          </div>
        </Dialog>
      </Transition.Root>

      {/* Sidebar for large screens */}
      <div className="hidden lg:flex lg:flex-shrink-0 lg:w-64">
        <div className="flex flex-col h-full w-64 fixed inset-y-0">
          <div className="flex-shrink-0 flex items-center px-4 py-6">
            <h1 className="text-3xl font-bold">bdtime24.net</h1>
          </div>
          <nav className="flex-1 px-2 pb-4 space-y-1 overflow-y-auto">
            <SidebarMenu />
          </nav>
          <div className="mt-auto px-2 space-y-1">
            <SecondaryNavigation />
          </div>
        </div>
      </div>
    </>
  );
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}



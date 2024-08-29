import {
  Bars3BottomLeftIcon,
  BellIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/16/solid";

export default function Header({
  setSidebarOpen,
}: {
  setSidebarOpen: (open: boolean) => void;
}) {
  return (
    <header className="bg-white shadow fixed top-0 inset-x-0 lg:pl-64 z-10">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex items-center">
              <MagnifyingGlassCircleIcon className="h-6 w-6 text-gray-500" />
              <input
                type="text"
                placeholder="Search"
                className="ml-2 p-1 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="ml-6 flex items-center space-x-4">
            <button
              type="button"
              className="p-1 border border-transparent rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            >
              <BellIcon className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Notifications</span>
            </button>
            <button>
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

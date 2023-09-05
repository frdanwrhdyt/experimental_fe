import { Dialog, Transition, Listbox } from "@headlessui/react";
import { InputForm } from "../form/form";
import { useState, Fragment, useEffect } from "react";
import axios from "../../api/axios";
import {
  CheckIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import useAuth from "../../hooks/useAuth";

export default function Modal({ isOpen, closeModal, groups, setRefreshData }) {
  const [username, setUsername] = useState();
  const [password1, setPassword1] = useState();
  const [password2, setPassword2] = useState();
  const [selected, setSelected] = useState(groups[0]);
  const [error, setError] = useState(null); // State untuk pesan kesalahan
  const { auth } = useAuth();

  const handleSubmit = async () => {
    try {
      // Validasi bahwa password1 dan password2 sama
      if (password1 !== password2) {
        setError("Passwords do not match");
        return;
      }

      // Mengirim request pertama ke endpoint register
      const registerResponse = await axios.post(
        "/register",
        {
          username,
          password: password1, // Menggunakan password pertama
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );

      // Mendapatkan _id dari response pertama
      const userId = registerResponse.data._id;

      // Mengirim request kedua ke endpoint user-role
      await axios.post(
        "/user-role",
        {
          user_id: userId,
          group_id: selected.id,
          role: selected.name === "superuser" ? "superuser" : "user",
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );

      // Setelah berhasil, tutup modal dan reset error
      setRefreshData(true);
      closeModal();
      setError(null);
    } catch (error) {
      console.error("Error:", error);
      // Handle error
      setError("An error occurred"); // Set pesan kesalahan
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 overflow-visible"
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto ">
          <div className="flex min-h-full items-center justify-center p-4 text-center overflow-visible">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-visible rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="flex w-full justify-between items-center"
                >
                  <div className="text-lg font-medium leading-6 text-gray-900">
                    Register New User
                  </div>
                  <button
                    className="h-6 w-6 p-1 hover:rounded-full hover:bg-red-500 hover:text-white duration-300"
                    onClick={closeModal}
                  >
                    <XMarkIcon />
                  </button>
                </Dialog.Title>

                <form className="mt-10 overflow-visible">
                  <div className="space-y-5 overflow-visible">
                    <InputForm
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                    />
                    <InputForm
                      type="password"
                      value={password1}
                      onChange={(e) => setPassword1(e.target.value)}
                      placeholder="Password"
                    />
                    <InputForm
                      type="password"
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                      placeholder="Konfirmasi Password"
                    />
                    <div>
                      <span className="text-xs">Grup</span>
                      <ListDropdown
                        groups={groups}
                        selected={selected}
                        setSelected={setSelected}
                      />
                    </div>
                  </div>
                </form>

                {error && <div className="text-red-500 mt-2">{error}</div>}

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={handleSubmit}
                  >
                    Daftar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

const ListDropdown = ({ groups, selected, setSelected }) => {
  if (!groups || groups.length === 0) {
    return <div className="text-red-500">Error: Groups data is empty</div>;
  }
  return (
    // <div className="fixed  w-72 z-50">
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1 overflow-visible">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm z-50">
          <span className="block truncate">{selected.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="z-50 absolute mt-1 h-50 w-full overflow-visible z-[1000] rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ">
            {groups.map((group) => (
              <Listbox.Option
                key={group.id}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 z-[1000] ${
                    active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                  }`
                }
                value={group}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {group.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
    // </div>
  );
};

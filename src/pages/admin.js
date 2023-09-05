import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { useState, useEffect } from "react";
import Modal from "../components/admin/modalAddUser";
import {
  GroupTable,
  UserDataTable,
  LayerTable,
} from "../components/admin/table";

export default function Admin() {
  const { auth } = useAuth();
  const [usersData, setUserData] = useState([]);
  const [layers, setLayers] = useState([]);
  const [group, setGroup] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const fetchData = async (endpoint, stateSetter) => {
      try {
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        stateSetter(response.data);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      }
    };

    fetchData("/users", setUserData);
    fetchData("/groups", setGroup);
    fetchData("/show-layers", setLayers);
  }, [auth.accessToken, refreshData]);

  return (
    <div className="w-full h-full p-5 overflow-auto grid grid-cols-2 gap-2 	">
      <div className="space-y-2 h-fit">
        <div className="bg-white rounded-lg shadow-lg p-5 h-fit w-full ">
          <div className="flex w-full justify-end">
            <button
              className="px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-800 rounded-lg text-xs "
              onClick={openModal}
            >
              Tambah Akun
            </button>
          </div>
          {group.length > 0 && (
            <Modal
              isOpen={isOpen}
              closeModal={closeModal}
              groups={group}
              setRefreshData={setRefreshData}
            />
          )}
          {usersData.length > 0 && <UserDataTable usersData={usersData} />}
        </div>
        <div className="bg-white rounded-lg shadow-lg p-5">
          {layers.length > 0 && <LayerTable layers={layers} />}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-5 h-fit">
        {group.length > 0 && <GroupTable groups={group} />}
      </div>
    </div>
  );
}

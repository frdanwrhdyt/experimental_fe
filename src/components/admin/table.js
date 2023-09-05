import { Link } from "react-router-dom";
export const GroupTable = ({ groups }) => {
  return (
    <div className="overflow-x-auto">
      <div className="text-md font-semibold  text-gray-700">List Groups</div>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="border-b border-gray-100 py-2 px-4 text-gray-600 text-md text-left">
              Name
            </th>
            <th className="border-b border-gray-100 py-2 px-4 text-gray-600 text-md text-left">
              Layer
            </th>
            <th className="border-b border-gray-100 py-2 px-4 text-gray-600 text-md text-left">
              Permission
            </th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.id}>
              <td className="border-b border-gray-100 py-2 px-4 text-gray-500 text-sm">
                {group.name}
              </td>
              <td className="border-b border-gray-100 py-2 px-4 text-gray-500 text-sm">
                {group.layers.map((layer) => (
                  <div key={layer._id}>{layer.tableName}</div>
                ))}
              </td>
              <td className="border-b border-gray-100 py-2 px-4 text-gray-500 text-sm">
                {group.permission}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const UserDataTable = ({ usersData }) => {
  return (
    <div className="overflow-x-auto">
      <div className="text-md font-semibold text-gray-700">List Users</div>
      <table className="min-w-full ">
        <thead>
          <tr>
            <th className="border-b border-gray-100 py-2 px-4 text-gray-600 text-md text-left">
              Username
            </th>
            <th className="border-b border-gray-100 py-2 px-4 text-gray-600 text-md text-left">
              Group
            </th>
            <th className="border-b border-gray-100 py-2 px-4 text-gray-600 text-md text-left">
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user) => (
            <tr key={user._id}>
              <td className="border-b border-gray-100 py-2 px-4  text-gray-500 text-sm">
                {user.username}
              </td>
              <td className="border-b border-gray-100 py-2 px-4  text-gray-500 text-sm">
                {user.roleAndGroups[0].group}
              </td>
              <td className="border-b border-gray-100 py-2 px-4  text-gray-500 text-sm">
                {user.roleAndGroups[0].role}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const LayerTable = ({ layers }) => {
  return (
    <div className="overflow-x-auto">
      <div className="text-md font-semibold text-gray-700">List Layers</div>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="border-b border-gray-100 py-2 px-4 text-gray-600 text-md text-left">
              Layer
            </th>
            <th className="border-b border-gray-100 py-2 px-4 text-gray-600 text-md text-left">
              Table Name
            </th>
          </tr>
        </thead>
        <tbody>
          {layers.map((layer) => (
            <tr key={layer.layer}>
              <td className="border-b border-gray-100 py-2 px-4 text-gray-500 text-sm">
                {layer.layer}
              </td>
              <td className="border-b border-gray-100 py-2 px-4 text-gray-500 text-sm">
                <Link to={`/table/${layer.tableName}`}>{layer.tableName}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

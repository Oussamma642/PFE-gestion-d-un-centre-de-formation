import React, { useState } from "react";

function GestionResources() {
  const [selectedMenu, setSelectedMenu] = useState("Modules");

  const data = {
    Modules: [
      { id: 1, name: "Mathematics", credits: 6 },
      { id: 2, name: "Physics", credits: 4 },
    ],
    Filieres: [
      { id: 1, name: "Computer Science", students: 120 },
      { id: 2, name: "Mechanical Engineering", students: 80 },
    ],
    Etudiants: [
      { id: 1, name: "John Doe", filiere: "Computer Science" },
      { id: 2, name: "Jane Smith", filiere: "Mechanical Engineering" },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-white shadow-xl rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Gestion des Ressources
        </h1>
        <div className="flex flex-col space-y-4">
          {["Modules", "Filieres", "Etudiants"].map((menu) => (
            <button
              key={menu}
              onClick={() => setSelectedMenu(menu)}
              className={`w-full px-4 py-3 rounded-lg text-left font-medium transition-all cursor-pointer ${
                selectedMenu === menu
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {menu}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="w-3/4 bg-gray-50 p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          {selectedMenu}
        </h2>
        <div className="bg-white shadow-xl rounded-lg p-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                {Object.keys(data[selectedMenu][0]).map((key) => (
                  <th
                    key={key}
                    className="border border-gray-300 px-4 py-2 bg-gray-100 text-left font-semibold text-gray-700"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data[selectedMenu].map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  {Object.values(item).map((value, index) => (
                    <td
                      key={index}
                      className="border border-gray-300 px-4 py-2 text-gray-700"
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GestionResources;

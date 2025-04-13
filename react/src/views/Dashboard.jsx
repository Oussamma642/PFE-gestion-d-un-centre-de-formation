import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Dashboard() {
    const location = useLocation();
    const [selectedModule, setSelectedModule] = useState("francais");
    const [expandedYear, setExpandedYear] = useState("1ere-annee");
    const [expandedSemester, setExpandedSemester] = useState("s1");

    const [students] = useState([
        {
            id: 1,
            name: "Jean Dupont",
            code: "ETU001",
            note_cc: 15,
            note_tp: 16,
            note_exam: 14,
        },
        {
            id: 2,
            name: "Marie Martin",
            code: "ETU002",
            note_cc: 17,
            note_tp: 15,
            note_exam: 16,
        },
        {
            id: 3,
            name: "Pierre Durant",
            code: "ETU003",
            note_cc: 13,
            note_tp: 14,
            note_exam: 15,
        },
        {
            id: 4,
            name: "Sophie Bernard",
            code: "ETU004",
            note_cc: 16,
            note_tp: 17,
            note_exam: 15,
        },
        {
            id: 5,
            name: "Lucas Petit",
            code: "ETU005",
            note_cc: 14,
            note_tp: 15,
            note_exam: 16,
        },
    ]);

    const modulesByYearAndSemester = {
        "1ere-annee": {
            label: "1ère Année",
            semesters: {
                s1: {
                    label: "Semestre 1",
                    modules: [
                        {
                            id: 1,
                            name: "Français",
                            path: "francais",
                            icon: "📚",
                        },
                        {
                            id: 2,
                            name: "Mathématiques",
                            path: "mathematiques",
                            icon: "📐",
                        },
                    ],
                },
                s2: {
                    label: "Semestre 2",
                    modules: [
                        {
                            id: 3,
                            name: "Physique",
                            path: "physique",
                            icon: "⚛️",
                        },
                        {
                            id: 4,
                            name: "Chimie",
                            path: "chimie",
                            icon: "🧪",
                        },
                    ],
                },
            },
        },
        "2eme-annee": {
            label: "2ème Année",
            semesters: {
                s1: {
                    label: "Semestre 1",
                    modules: [
                        {
                            id: 5,
                            name: "Informatique",
                            path: "informatique",
                            icon: "💻",
                        },
                        {
                            id: 6,
                            name: "Anglais",
                            path: "anglais",
                            icon: "🌍",
                        },
                    ],
                },
                s2: {
                    label: "Semestre 2",
                    modules: [
                        {
                            id: 7,
                            name: "Base de données",
                            path: "bdd",
                            icon: "💾",
                        },
                        {
                            id: 8,
                            name: "Réseaux",
                            path: "reseaux",
                            icon: "🌐",
                        },
                    ],
                },
            },
        },
    };

    const calculateAverage = (cc, tp, exam) => {
        return (cc * 0.3 + tp * 0.2 + exam * 0.5).toFixed(2);
    };

    const handleModuleClick = (modulePath) => {
        setSelectedModule(modulePath);
    };

    const toggleYear = (year) => {
        setExpandedYear(expandedYear === year ? null : year);
    };

    const toggleSemester = (semester) => {
        setExpandedSemester(expandedSemester === semester ? null : semester);
    };

    const getAllModules = () => {
        return Object.values(modulesByYearAndSemester).flatMap((year) =>
            Object.values(year.semesters).flatMap(
                (semester) => semester.modules
            )
        );
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Menu latéral */}
            <div className="w-64 bg-white shadow-lg">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Modules
                    </h2>
                </div>
                <nav className="mt-4">
                    {Object.entries(modulesByYearAndSemester).map(
                        ([yearKey, yearData]) => (
                            <div key={yearKey} className="mb-2">
                                {/* Année */}
                                <button
                                    onClick={() => toggleYear(yearKey)}
                                    className="w-full px-4 py-3 flex items-center justify-between text-sm font-medium text-gray-600 hover:bg-gray-50 focus:outline-none"
                                >
                                    <span className="flex items-center">
                                        <span className="mr-2">
                                            {expandedYear === yearKey
                                                ? "📂"
                                                : "📁"}
                                        </span>
                                        {yearData.label}
                                    </span>
                                    <svg
                                        className={`w-4 h-4 transition-transform ${
                                            expandedYear === yearKey
                                                ? "transform rotate-180"
                                                : ""
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {/* Semestres */}
                                {expandedYear === yearKey && (
                                    <div className="pl-4">
                                        {Object.entries(yearData.semesters).map(
                                            ([semesterKey, semesterData]) => (
                                                <div key={semesterKey}>
                                                    <button
                                                        onClick={() =>
                                                            toggleSemester(
                                                                semesterKey
                                                            )
                                                        }
                                                        className="w-full px-4 py-2 flex items-center justify-between text-sm font-medium text-gray-600 hover:bg-gray-50 focus:outline-none"
                                                    >
                                                        <span className="flex items-center">
                                                            <span className="mr-2">
                                                                {expandedSemester ===
                                                                semesterKey
                                                                    ? "📂"
                                                                    : "📁"}
                                                            </span>
                                                            {semesterData.label}
                                                        </span>
                                                        <svg
                                                            className={`w-3 h-3 transition-transform ${
                                                                expandedSemester ===
                                                                semesterKey
                                                                    ? "transform rotate-180"
                                                                    : ""
                                                            }`}
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M19 9l-7 7-7-7"
                                                            />
                                                        </svg>
                                                    </button>

                                                    {/* Modules */}
                                                    {expandedSemester ===
                                                        semesterKey && (
                                                        <div className="pl-4">
                                                            {semesterData.modules.map(
                                                                (module) => (
                                                                    <button
                                                                        key={
                                                                            module.id
                                                                        }
                                                                        onClick={() =>
                                                                            handleModuleClick(
                                                                                module.path
                                                                            )
                                                                        }
                                                                        className={`${
                                                                            selectedModule ===
                                                                            module.path
                                                                                ? "bg-blue-50 text-blue-600"
                                                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                                        } group flex items-center w-full px-4 py-2 text-sm font-medium rounded-md transition-colors relative`}
                                                                    >
                                                                        <span className="mr-3 text-xl">
                                                                            {
                                                                                module.icon
                                                                            }
                                                                        </span>
                                                                        <span className="flex-1 text-left">
                                                                            {
                                                                                module.name
                                                                            }
                                                                        </span>
                                                                        {selectedModule ===
                                                                            module.path && (
                                                                            <span className="w-1 h-6 bg-blue-600 rounded-l-full absolute -right-4"></span>
                                                                        )}
                                                                    </button>
                                                                )
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        )
                    )}
                </nav>
            </div>

            {/* Contenu principal */}
            <div className="flex-1 overflow-auto">
                <div className="py-6 px-8">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            Gestion des Notes
                        </h1>
                        <div className="flex items-center space-x-4">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                                Exporter les notes
                            </button>
                        </div>
                    </div>

                    {/* Tableau des notes */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Notes du Module :{" "}
                                    {
                                        getAllModules().find(
                                            (m) => m.path === selectedModule
                                        )?.name
                                    }
                                </h2>
                                <div className="flex space-x-2">
                                    <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                                        Ajouter une note
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Code
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Nom Complet
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Note CC (30%)
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Note TP (20%)
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Note Examen (50%)
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Moyenne
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {students.map((student) => (
                                            <tr
                                                key={student.id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {student.code}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {student.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {student.note_cc}/20
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {student.note_tp}/20
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {student.note_exam}/20
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                                    {calculateAverage(
                                                        student.note_cc,
                                                        student.note_tp,
                                                        student.note_exam
                                                    )}
                                                    /20
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="flex space-x-2">
                                                        <button className="text-blue-600 hover:text-blue-900">
                                                            Modifier
                                                        </button>
                                                        <button className="text-red-600 hover:text-red-900">
                                                            Supprimer
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Students } from "../assets/students";
import axiosClient from "../axios-client";

function Dashboard() {
    const location = useLocation();
    const { annee } = useParams();
    const [selectedModule, setSelectedModule] = useState(null);
    const [expandedSemester, setExpandedSemester] = useState("Mars");
    const [modules, setModules] = useState([]);
    const [students] = useState(Students);

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const response = await axiosClient.get("/modules");
                const filteredModules = response.data.filter(
                    (module) => module.annee === annee
                );
                setModules(filteredModules);
                // Sélectionner le premier module par défaut
                if (filteredModules.length > 0) {
                    setSelectedModule(filteredModules[0].id);
                }
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des modules:",
                    error
                );
            }
        };

        fetchModules();
    }, [annee]);

    const calculateAverage = (cc, tp, exam) => {
        return (cc * 0.3 + tp * 0.2 + exam * 0.5).toFixed(2);
    };

    const handleModuleClick = (moduleId) => {
        setSelectedModule(moduleId);
    };

    const toggleSemester = (semester) => {
        setExpandedSemester(expandedSemester === semester ? null : semester);
    };

    const getModulesBySemester = (semester) => {
        return modules.filter((module) => module.semestre === semester);
    };

    const getCurrentModule = () => {
        return modules.find((m) => m.id === selectedModule);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Menu latéral */}
            <div className="w-64 bg-white shadow-lg">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Modules{" "}
                        {annee === "première_annee"
                            ? "1ère Année"
                            : "2ème Année"}
                    </h2>
                </div>
                <nav className="mt-4">
                    {["Mars", "Juillet"].map((semester) => (
                        <div key={semester}>
                            <button
                                onClick={() => toggleSemester(semester)}
                                className="w-full px-4 py-2 flex items-center justify-between text-sm font-medium text-gray-600 hover:bg-gray-50 focus:outline-none"
                            >
                                <span className="flex items-center">
                                    <span className="mr-2">
                                        {expandedSemester === semester
                                            ? "📂"
                                            : "📁"}
                                    </span>
                                    Semestre {semester}
                                </span>
                                <svg
                                    className={`w-3 h-3 transition-transform ${
                                        expandedSemester === semester
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

                            {expandedSemester === semester && (
                                <div className="pl-4">
                                    {getModulesBySemester(semester).map(
                                        (module) => (
                                            <button
                                                key={module.id}
                                                onClick={() =>
                                                    handleModuleClick(module.id)
                                                }
                                                className={`${
                                                    selectedModule === module.id
                                                        ? "bg-blue-50 text-blue-600"
                                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                } group flex items-center w-full px-4 py-2 text-sm font-medium rounded-md transition-colors relative`}
                                            >
                                                <span className="mr-3 text-xl">
                                                    📚
                                                </span>
                                                <div className="flex-1 text-left">
                                                    <div className="font-medium">
                                                        {module.libelle}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        Coefficient:{" "}
                                                        {module.coefficient}
                                                    </div>
                                                </div>
                                                {selectedModule ===
                                                    module.id && (
                                                    <span className="w-1 h-6 bg-blue-600 rounded-l-full absolute -right-4"></span>
                                                )}
                                            </button>
                                        )
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
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

                    {/* Informations du module */}
                    {getCurrentModule() && (
                        <div className="bg-white shadow rounded-lg mb-6">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <span className="text-3xl mr-4">
                                            📚
                                        </span>
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-900">
                                                {getCurrentModule().libelle}
                                            </h2>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <p className="text-sm text-gray-500">
                                            Coefficient
                                        </p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {getCurrentModule().coefficient}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <p className="text-sm text-gray-500">
                                            Masse Horaire
                                        </p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {getCurrentModule().masse_horaire}h
                                        </p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <p className="text-sm text-gray-500">
                                            Semestre
                                        </p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {getCurrentModule().semestre}
                                        </p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <p className="text-sm text-gray-500">
                                            Année Scolaire
                                        </p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {getCurrentModule().annee_scolaire}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tableau des notes */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Notes du Module :{" "}
                                    {getCurrentModule()?.libelle}
                                </h2>
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

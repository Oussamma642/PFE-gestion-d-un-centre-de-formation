import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import SideBar from "../pages/SideBar";
import ModuleInfos from "../pages/ModuleInfos";

import { Download } from "lucide-react";

function Dashboard() {
    const { annee, filiere } = useParams();
    const [selectedModule, setSelectedModule] = useState(null);
    const [marsSemesterModules, setMarsSemesterModules] = useState([]);
    const [juilletSemesterModules, setJuilletSemesterModules] = useState([]);
    const [controles, setControles] = useState([]);
    const [etudiants, setEtudiants] = useState([]);
    const [notes, setNotes] = useState({});
    const [loading, setLoading] = useState(true);

    // Fetch modules based on the year (annee) and the filiere
    useEffect(() => {
        const fetchModules = async () => {
            setLoading(true);
            try {
                const response = await axiosClient.get(
                    `/modules/annee/${annee}/filiere/${filiere}`
                );
                const modulesData = Array.isArray(response.data)
                    ? response.data
                    : [];

                    console.log(modulesData);

                setMarsSemesterModules(
                    modulesData.filter((module) => module.semestre === "Mars")
                );
                setJuilletSemesterModules(
                    modulesData.filter(
                        (module) => module.semestre === "Juillet"
                    )
                );
                if (modulesData.length > 0) {
                    setSelectedModule(modulesData[0]); // Default to the first module
                }
            } catch (error) {
                console.error("Error fetching modules:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchModules();
    }, [annee]);

    // Fetch controles when a module is selected
    useEffect(() => {
        const fetchControles = async () => {
            if (selectedModule) {
                setLoading(true);
                try {
                    const response = await axiosClient.get(
                        `/controles/module/${selectedModule.id}`
                    );
                    setControles(response.data);
                } catch (error) {
                    console.error("Error fetching controles:", error);
                    setControles([]);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchControles();
    }, [selectedModule]);

    // Fetch students for the selected year and filiere
    useEffect(() => {
        const fetchEtudiants = async () => {
            setLoading(true);
            try {
                const response = await axiosClient.get(
                    `/etudiants/annee/${annee}/filiere/${filiere}`
                );
                setEtudiants(response.data);
            } catch (error) {
                console.error("Error fetching students:", error);
                setEtudiants([]);
            } finally {
                setLoading(false);
            }
        };

        fetchEtudiants();
    }, [annee]);

    // Fetch existing notes for the selected module
    useEffect(() => {
        const fetchNotes = async () => {
            if (selectedModule) {
                try {
                    const response = await axiosClient.get(
                        `/notes/module/${selectedModule.id}`
                    );
                    const fetchedNotes = response.data;
                    console.log(fetchedNotes);

                    // Map notes to the state format
                    const notesMap = {};
                    fetchedNotes.forEach((note) => {
                        notesMap[`${note.etudiant_id}-${note.controle_id}`] =
                            note.note;
                    });
                    setNotes(notesMap);
                } catch (error) {
                    console.error("Error fetching notes:", error);
                }
            }
        };

        fetchNotes();
    }, [selectedModule]);

    // Handle note change
    const handleNoteChange = (etudiantId, controleId, value) => {
        setNotes((prevNotes) => ({
            ...prevNotes,
            [`${etudiantId}-${controleId}`]: value,
        }));
    };

    // Submit notes
    const submitNotes = async () => {
        try {
            const payload = Object.entries(notes).map(([key, note]) => {
                const [etudiantId, controleId] = key.split("-");
                return {
                    etudiant_id: etudiantId,
                    controle_id: controleId,
                    note,
                };
            });

            await axiosClient.post("/notes", payload);
            alert("Notes saved successfully!");
        } catch (error) {
            console.error("Error saving notes:", error);
            alert("Failed to save notes.");
        }
    };

    // Handle export
    const handleExport = async () => {


        try {
            const response = await axiosClient.get(
                `/notes/export/${selectedModule.id}`,
                {
                    responseType: "blob", // Important for downloading files
                }
            );

            // Create a URL for the file
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
                "download",
                `notes_module_${selectedModule.id}.xlsx`
            );
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Error exporting notes:", error);
            alert("Failed to export notes.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <SideBar
                        setSelectedModule={setSelectedModule}
                        selectedModule={selectedModule}
                        marsSemesterModules={marsSemesterModules}
                        juilletSemesterModules={juilletSemesterModules}
                    />

                    <div className="lg:col-span-3">
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        ) : selectedModule ? (
                            <>
                                <ModuleInfos
                                    libelle={selectedModule.libelle}
                                    semestre={selectedModule.semestre}
                                    masse_horaire={selectedModule.masse_horaire}
                                    annee_scolaire={
                                        selectedModule.annee_scolaire
                                    }
                                    coefficient={selectedModule.coefficient}
                                />

                                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-bold text-gray-800">
                                            Notes des Étudiants
                                        </h2>

                                        <button
                                            onClick={handleExport}
                                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center transition-colors"
                                        >
                                            <Download
                                                size={16}
                                                className="mr-2"
                                            />
                                            Exporter
                                        </button>
                                        <button
                                            onClick={submitNotes}
                                            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200 flex items-center"
                                        >
                                            Enregistrer
                                        </button>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full border-collapse">
                                            <thead>
                                                <tr className="bg-gray-50">
                                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200 sticky left-0 bg-gray-50">
                                                        Étudiant
                                                    </th>
                                                    {controles.map(
                                                        (controle) => (
                                                            <th
                                                                key={
                                                                    controle.id
                                                                }
                                                                className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b border-gray-200"
                                                            >
                                                                Contrôle{" "}
                                                                {
                                                                    controle.numero_controle
                                                                }
                                                            </th>
                                                        )
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {etudiants.map(
                                                    (etudiant, index) => (
                                                        <tr
                                                            key={etudiant.id}
                                                            className={
                                                                index % 2 === 0
                                                                    ? "bg-white"
                                                                    : "bg-gray-50"
                                                            }
                                                        >
                                                            <td className="px-4 py-3 text-sm text-gray-800 font-medium sticky left-0 bg-inherit">
                                                                {etudiant.nom}{" "}
                                                                {
                                                                    etudiant.prenom
                                                                }
                                                            </td>
                                                            {controles.map(
                                                                (controle) => (
                                                                    <td
                                                                        key={
                                                                            controle.id
                                                                        }
                                                                        className="px-4 py-3"
                                                                    >
                                                                        <input
                                                                            type="number"
                                                                            className={`w-full border rounded-md px-3 py-2 text-center ${
                                                                                notes[
                                                                                    `${etudiant.id}-${controle.id}`
                                                                                ]
                                                                                    ? "bg-green-100"
                                                                                    : ""
                                                                            }`}
                                                                            value={
                                                                                notes[
                                                                                    `${etudiant.id}-${controle.id}`
                                                                                ] ||
                                                                                ""
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                handleNoteChange(
                                                                                    etudiant.id,
                                                                                    controle.id,
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            min="0"
                                                                            max="20"
                                                                            step="0.5"
                                                                            placeholder="0-20"
                                                                        />
                                                                    </td>
                                                                )
                                                            )}
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="mt-4 text-right text-sm text-gray-500">
                                        {etudiants.length} étudiants ·{" "}
                                        {controles.length} contrôles
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="bg-white rounded-lg shadow p-8 text-center">
                                <h3 className="text-lg font-medium text-gray-900 mb-1">
                                    Aucun module sélectionné
                                </h3>
                                <p className="text-gray-500">
                                    Veuillez sélectionner un module dans la
                                    liste à gauche pour afficher ses détails et
                                    les contrôles associés.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useNavigate, useParams } from "react-router-dom";
import { td, tr } from "framer-motion/client";

function Passage1Vers2() {
    const [filiereInfos, setFiliereInfos] = useState({});

    const [controles, setControles] = useState([]);
    const [notes, setNotes] = useState([]);
    const [examens, setExamens] = useState([]);
    const [notesExamens, setNotesExamens] = useState({});
    const [loading, setLoading] = useState(true);
    const [modules, setModules] = useState([]);
    const [etudiants, setEtudiants] = useState([]);
    const { filiere } = useParams();
    const navigate = useNavigate();

    // fetch the filiere detail
    useEffect(() => {
        const fetchFiliereDetails = async () => {
            setLoading(true);
            try {
                const response = await axiosClient.get(`/filieres/${filiere}`);
                console.log(response.data);
                setFiliereInfos(response.data);
            } catch (error) {
                console.error("Error fetching students:", error);
                setEtudiants([]);
            } finally {
                setLoading(false);
            }
        };

        fetchFiliereDetails();
    }, [filiere]);

    // Fetch students for the selected year and filiere
    useEffect(() => {
        const fetchEtudiants = async () => {
            setLoading(true);
            try {
                const response = await axiosClient.get(
                    `/etudiants/annee/premiere_annee/filiere/${filiere}`
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
    }, [filiere]);

    // Fetch controles of all the modules of premiere annee of a filiere
    useEffect(() => {
        const fetchControles = async () => {
            setLoading(true);
            try {
                const response = await axiosClient.get(
                    `controles/modules/premiere_annee/filiere/${filiere}`
                );
                console.log(response.data);
                setControles(response.data);
            } catch (error) {
                console.error("Error fetching controles:", error);
                setControles([]);
            } finally {
                setLoading(false);
            }
        };

        fetchControles();
    }, [filiere]);

    // Fetch notes of controles of all the modules of premiere annee of a filiere
    useEffect(() => {
        const fetchNotes = async () => {
            const response = await axiosClient.get(
                `/notes/premiere_annee/filiere/${filiere}`
            );
            const fetchedNotes = response.data;

            const notesMap = {};
            fetchedNotes.forEach((note) => {
                notesMap[`${note.etudiant_id}-${note.controle_id}`] = note.note;
            });

            setNotes(notesMap);
            console.log(notesMap);
        };
        fetchNotes();
    }, [filiere]);

    // Fetch examens of modules of premiere annee of a filiere
    useEffect(() => {
        const fetchExamens = async () => {
            setLoading(true);
            try {
                const response = await axiosClient.get(
                    `examens/modules/premiere_annee/filiere/${filiere}`
                );
                setExamens(response.data);
            } catch (error) {
                console.error("Error fetching examens:", error);
                setExamens([]);
            } finally {
                setLoading(false);
            }
        };

        fetchExamens();
    }, [filiere]);

    // fetch examens notes of all the modules of premiere annee of a filiere
    useEffect(() => {
        const fetchExamensNotes = async () => {
            const response = await axiosClient.get(
                `/notesexamens/premiere_annee/filiere/${filiere}`
            );

            const fetchedNotes = response.data;

            const notesMap = {};
            fetchedNotes.forEach((note) => {
                notesMap[`${note.etudiant_id}-${note.examen_id}`] = note.note;
            });
            setNotesExamens(notesMap);
        };
        fetchExamensNotes();
    }, [filiere]);

    // Fetch modules of premiere_annee based on the filiere
    useEffect(() => {
        const fetchModules = async () => {
            setLoading(true);
            try {
                const response = await axiosClient.get(
                    `/modules/annee/premiere_annee/filiere/${filiere}`
                );
                const modulesData = Array.isArray(response.data)
                    ? response.data
                    : [];

                setModules(modulesData);
            } catch (error) {
                console.error("Error fetching modules:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchModules();
    }, [filiere]);

    // Group examens by module
    const getModuleExams = (moduleId) => {
        return examens.filter((exam) => exam.module_id === moduleId);
    };

    // Get specific exam by module and type
    const getExamByType = (moduleExams, type) => {
        return moduleExams.find((exam) => exam.type === type);
    };

    //  Function to calculate the average controles for a student
    const calculateAverageForStudent = (studentId, moduleControles) => {
        let total = 0;
        let count = 0;

        // Determine which notes object to use based on the selected type
        const notesObject = notes;

        // Loop through all controls/exams for this student
        moduleControles.forEach((controle) => {
            const key = `${studentId}-${controle.id}`;
            const grade = notesObject[key];

            // Only count grades that exist and are valid numbers
            if (grade && !isNaN(parseFloat(grade))) {
                total += parseFloat(grade);
                count++;
            }
        });

        // Return the average or a dash if no grades exist
        return count > 0 ? (total / count).toFixed(2) : "-";
    };

    // Group controles by module
    const getModuleControles = (moduleId) => {
        return controles.filter((controle) => controle.module_id === moduleId);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6 space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {filiereInfos?.libelle || "Chargement..."}
                </h1>
                <p className="text-gray-600">
                    Passage de la première année vers la deuxième année
                </p>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                <div className="p-4 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Les notes des examens Théoriques et Pratiques
                    </h1>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200"
                                rowSpan="2"
                            >
                                Noms et Prénoms
                            </th>
                            {modules.map((mod) => (
                                <th
                                    key={mod.id}
                                    className="px-6 py-4 text-center text-sm font-semibold text-gray-900 border-r border-gray-200"
                                    colSpan="2"
                                >
                                    {mod.libelle}
                                </th>
                            ))}
                        </tr>
                        <tr>
                            {modules.map((mod) => (
                                <React.Fragment key={`header-${mod.id}`}>
                                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 border-r border-gray-200">
                                        Examen Théorique
                                    </th>
                                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 border-r border-gray-200">
                                        Examen Pratique
                                    </th>
                                </React.Fragment>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {etudiants.map((etudiant) => (
                            <tr key={etudiant.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                                    {etudiant.nom} {etudiant.prenom}
                                </td>
                                {modules.map((module) => {
                                    const moduleExams = getModuleExams(
                                        module.id
                                    );
                                    const theoreticalExam = getExamByType(
                                        moduleExams,
                                        "theorique"
                                    );
                                    const practicalExam = getExamByType(
                                        moduleExams,
                                        "pratique"
                                    );

                                    return (
                                        <React.Fragment
                                            key={`student-${etudiant.id}-module-${module.id}`}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center border-r border-gray-200">
                                                {theoreticalExam ? (
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                            notesExamens[
                                                                `${etudiant.id}-${theoreticalExam.id}`
                                                            ] >= 10
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-red-100 text-red-800"
                                                        }`}
                                                    >
                                                        {notesExamens[
                                                            `${etudiant.id}-${theoreticalExam.id}`
                                                        ] || "-"}
                                                    </span>
                                                ) : (
                                                    "-"
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center border-r border-gray-200">
                                                {practicalExam ? (
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                            notesExamens[
                                                                `${etudiant.id}-${practicalExam.id}`
                                                            ] >= 10
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-red-100 text-red-800"
                                                        }`}
                                                    >
                                                        {notesExamens[
                                                            `${etudiant.id}-${practicalExam.id}`
                                                        ] || "-"}
                                                    </span>
                                                ) : (
                                                    "-"
                                                )}
                                            </td>
                                        </React.Fragment>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Les notes des contrôles continus
                    </h2>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-r border-gray-200"
                                rowSpan="2"
                            >
                                Noms et Prénoms
                            </th>
                            {modules.map((mod) => {
                                const moduleControles = getModuleControles(
                                    mod.id
                                );
                                const colspan = moduleControles.length + 1; // +1 for the average column

                                return (
                                    <th
                                        key={mod.id}
                                        className="px-6 py-4 text-center text-sm font-semibold text-gray-900 border-r border-gray-200"
                                        colSpan={colspan}
                                    >
                                        {mod.libelle}
                                    </th>
                                );
                            })}
                        </tr>
                        <tr>
                            {modules.map((mod) => {
                                const moduleControles = getModuleControles(
                                    mod.id
                                );

                                if (moduleControles.length === 0) {
                                    return (
                                        <th
                                            key={`header-empty-${mod.id}`}
                                            className="px-6 py-3 text-center text-sm font-medium text-gray-500 border-r border-gray-200"
                                        >
                                            -
                                        </th>
                                    );
                                }

                                return (
                                    <React.Fragment key={`header-${mod.id}`}>
                                        {moduleControles.map((controle) => (
                                            <th
                                                key={`header-${mod.id}-controle-${controle.id}`}
                                                className="px-6 py-3 text-center text-sm font-medium text-gray-500 border-r border-gray-200"
                                            >
                                                CC {controle.numero_controle}
                                            </th>
                                        ))}
                                        <th className="px-6 py-3 text-center text-sm font-medium text-gray-500 border-r border-gray-200">
                                            Moyenne
                                        </th>
                                    </React.Fragment>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {etudiants.map((etudiant) => (
                            <tr key={etudiant.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                                    {etudiant.nom} {etudiant.prenom}
                                </td>
                                {modules.map((module) => {
                                    const moduleControles = getModuleControles(
                                        module.id
                                    );

                                    if (moduleControles.length === 0) {
                                        return (
                                            <td
                                                key={`student-${etudiant.id}-module-${module.id}-empty`}
                                                className="px-6 py-4 whitespace-nowrap text-sm text-center border-r border-gray-200"
                                            >
                                                -
                                            </td>
                                        );
                                    }

                                    return (
                                        <React.Fragment
                                            key={`student-${etudiant.id}-module-${module.id}`}
                                        >
                                            {moduleControles.map((controle) => (
                                                <td
                                                    key={`student-${etudiant.id}-module-${module.id}-controle-${controle.id}`}
                                                    className="px-6 py-4 whitespace-nowrap text-sm text-center border-r border-gray-200"
                                                >
                                                    {notes[
                                                        `${etudiant.id}-${controle.id}`
                                                    ] ? (
                                                        <span
                                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                                notes[
                                                                    `${etudiant.id}-${controle.id}`
                                                                ] >= 10
                                                                    ? "bg-green-100 text-green-800"
                                                                    : "bg-red-100 text-red-800"
                                                            }`}
                                                        >
                                                            {
                                                                notes[
                                                                    `${etudiant.id}-${controle.id}`
                                                                ]
                                                            }
                                                        </span>
                                                    ) : (
                                                        "-"
                                                    )}
                                                </td>
                                            ))}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center border-r border-gray-200 bg-blue-50 font-medium">
                                                {calculateAverageForStudent(
                                                    etudiant.id,
                                                    moduleControles
                                                )}
                                            </td>
                                        </React.Fragment>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-8">
                <button 
                onClick={()=>navigate(`/dashboard/preparer-bulletin/filiere/${filiere}/annee/premiere_annee`)}
                

                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
                    Générer les bulletins
                </button>
            </div>
        </div>
    );
}

export default Passage1Vers2;

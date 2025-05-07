import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useParams } from "react-router-dom";

function Passage1Vers2() {
    const [notes, setNotes] = useState([]);
    const [examens, setExamens] = useState([]);
    const [notesExamens, setNotesExamens] = useState({});
    const [loading, setLoading] = useState(true);
    const [modules, setModules] = useState([]);
    const [etudiants, setEtudiants] = useState([]);

    const { filiere } = useParams();

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

    // Fetch notes of controles of all the modules of premiere annee of a filiere
    useEffect(() => {
        const fetchNotes = async () => {
            const response = await axiosClient.get(
                `/notes/premiere_annee/filiere/${filiere}`
            );
            setNotes(response.data);
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
                console.log("Examens:", response.data);
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
            console.log("Exam Notes:", fetchedNotes);

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

                console.log("Modules:", modulesData);
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
        return examens.filter(exam => exam.module_id === moduleId);
    };

    // Get specific exam by module and type
    const getExamByType = (moduleExams, type) => {
        return moduleExams.find(exam => exam.type === type);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2" rowSpan="2">Noms et Prénoms</th>
                        {modules.map((mod) => (
                            <th key={mod.id} className="border border-gray-300 px-4 py-2" colSpan="2">
                                {mod.libelle}
                            </th>
                        ))}
                    </tr>
                    <tr>
                        {modules.map((mod) => (
                            <React.Fragment key={`header-${mod.id}`}>
                                <th className="border border-gray-300 px-4 py-2">Examen Théorique</th>
                                <th className="border border-gray-300 px-4 py-2">Examen Pratique</th>
                            </React.Fragment>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {etudiants.map((etudiant) => (
                        <tr key={etudiant.id}>
                            <td className="border border-gray-300 px-4 py-2">
                                {etudiant.nom} {etudiant.prenom}
                            </td>
                            {modules.map((module) => {
                                const moduleExams = getModuleExams(module.id);
                                const theoreticalExam = getExamByType(moduleExams, 'theorique');
                                const practicalExam = getExamByType(moduleExams, 'pratique');
                                
                                return (
                                    <React.Fragment key={`student-${etudiant.id}-module-${module.id}`}>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {theoreticalExam ? notesExamens[`${etudiant.id}-${theoreticalExam.id}`] || '-' : '-'}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            {practicalExam ? notesExamens[`${etudiant.id}-${practicalExam.id}`] || '-' : '-'}
                                        </td>
                                    </React.Fragment>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Passage1Vers2;
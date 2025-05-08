import React, { useEffect, useRef, useState } from "react";
import axiosClient from "../../axios-client";
import { useReactToPrint } from "react-to-print";
import StudentInfos from "./StudentInfos";
import { m } from "framer-motion";

const StudentGradeReport = ({etudiantPersonalInfos, modules ,controles, notes ,examens, notesExamens}) => {
    const componentRef = useRef();
    const [studentData, setStudentData] = useState({
        studentName: "BENHRAOUI MUSTAPHA",
        filiere: "DESSINATEUR EN BATIMENT",
        niveau: "TECHNICIEN",
        promotion: "2018/2019",
        anneeFormation: "2019/2017",
        modules: [
            {
                id: "101",
                name: "Mathématiques",
                coefficient: 2,
                controle: 0,
                examenTheorique: 0,
                examenPratique: 0,
            },
            {
                id: "102",
                name: "Dessin de Plan",
                coefficient: 3,
                controle: 0,
                examenTheorique: 0,
                examenPratique: 0,
            },
            {
                id: "103",
                name: "Métré de Gros Œuvres",
                coefficient: 3,
                controle: 0,
                examenTheorique: 0,
                examenPratique: 0,
            },
            {
                id: "104",
                name: "Applications Informatiques et Bureautiques",
                coefficient: 2,
                controle: 0,
                examenTheorique: 0,
                examenPratique: 0,
            },
            {
                id: "105",
                name: "Informatique professionnelle",
                coefficient: 3,
                controle: 0,
                examenTheorique: 0,
                examenPratique: 0,
            },
            {
                id: "106",
                name: "Internet",
                coefficient: 2,
                controle: 0,
                examenTheorique: 0,
                examenPratique: 0,
            },
            {
                id: "107",
                name: "Matériaux de Construction",
                coefficient: 2,
                controle: 0,
                examenTheorique: 0,
                examenPratique: 0,
            },
            {
                id: "108",
                name: "Notion en Architecture",
                coefficient: 3,
                controle: 0,
                examenTheorique: 0,
                examenPratique: 0,
            },
            {
                id: "109",
                name: "Résistance des Matériaux",
                coefficient: 2,
                controle: 0,
                examenTheorique: 0,
                examenPratique: 0,
            },
            {
                id: "110",
                name: "Hygiène et Sécurité",
                coefficient: 1,
                controle: 0,
                examenTheorique: 0,
                examenPratique: 0,
            },
            {
                id: "111",
                name: "Comptabilité Générale",
                coefficient: 2,
                controle: 0,
                examenTheorique: 0,
                examenPratique: 0,
            },
            {
                id: "112",
                name: "Droit et Organisation du Travail",
                coefficient: 1,
                controle: 0,
                examenTheorique: 0,
                examenPratique: 0,
            },
            {
                id: "113",
                name: "Communication en Français",
                coefficient: 1,
                controle: 0,
                examenTheorique: 0,
                examenPratique: 0,
            },
            {
                id: "114",
                name: "Communication en Anglais",
                coefficient: 1,
                controle: 0,
                examenTheorique: 0,
                examenPratique: 0,
            },
        ],
        decision: "Exclu",
    });
    // const [etudiantPersonalInfos, setEtudiantPersonalInfos] = useState(null);
    // const [modules, setModules] = useState([]);
    // const [notes, setNotes] = useState({});
    // const [controles, setControles] = useState([]);
    // const [examens, setExamens] = useState([]);
    // const [notesExamens, setNotesExamens] = useState({});
    // const [loading, setLoading] = useState(false);
    // const filiere = 4; // TODO: Get this from the URL or context

    // Etudiants Infos
    // useEffect(() => {
    //     const getEtudiantPersonalInfos = async () => {
    //         const response = await axiosClient.get(
    //             "/bulletin/etudiants/11/filiere/4"
    //         );
    //         setEtudiantPersonalInfos(response.data);
    //     };
    //     getEtudiantPersonalInfos();
    // }, []);

    // // Get Modules Based on annee and filiere
    // useEffect(() => {
    //     const getModules = async () => {
    //         const response = await axiosClient.get(
    //             "/modules/premiere_anneeannee/filiere/4"
    //         );
    //         // console.log('Modules:', response.data);
    //         setModules(response.data);
    //     };
    //     getModules();
    // }, []);

    // // Fetch controles of all the modules of premiere annee of a filiere
    // useEffect(() => {
    //     const fetchControles = async () => {
    //         setLoading(true);
    //         try {
    //             const response = await axiosClient.get(
    //                 `controles/modules/premiere_annee/filiere/${filiere}`
    //             );
    //             console.log("Controles:", response.data);
    //             setControles(response.data);
    //         } catch (error) {
    //             console.error("Error fetching controles:", error);
    //             setControles([]);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchControles();
    // }, [filiere]);

    // // Fetch notes of controles of all the modules of premiere annee of a filiere
    // useEffect(() => {
    //     const fetchNotes = async () => {
    //         const response = await axiosClient.get(
    //             `/notes/premiere_annee/filiere/${filiere}`
    //         );
    //         const fetchedNotes = response.data;

    //         const notesMap = {};
    //         fetchedNotes.forEach((note) => {
    //             notesMap[`${note.etudiant_id}-${note.controle_id}`] = note.note;
    //         });

    //         setNotes(notesMap);
    //         console.log(notesMap);
    //     };
    //     fetchNotes();
    // }, []);

    // // Fetch examens of modules of premiere annee of a filiere
    // useEffect(() => {
    //     const fetchExamens = async () => {
    //         setLoading(true);
    //         try {
    //             const response = await axiosClient.get(
    //                 `examens/modules/premiere_annee/filiere/${filiere}`
    //             );
    //             setExamens(response.data);
    //         } catch (error) {
    //             console.error("Error fetching examens:", error);
    //             setExamens([]);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchExamens();
    // }, [filiere]);

    // // fetch examens notes of all the modules of premiere annee of a filiere
    // useEffect(() => {
    //     const fetchExamensNotes = async () => {
    //         const response = await axiosClient.get(
    //             `/notesexamens/premiere_annee/filiere/${filiere}`
    //         );

    //         const fetchedNotes = response.data;

    //         const notesMap = {};
    //         fetchedNotes.forEach((note) => {
    //             notesMap[`${note.etudiant_id}-${note.examen_id}`] = note.note;
    //         });
    //         setNotesExamens(notesMap);
    //     };
    //     fetchExamensNotes();
    // }, [filiere]);

    // Calculate averages
    
    
    const calculateAverages = () => {
        const controleAvg =
            studentData.modules.reduce(
                (total, module) => total + module.controle,
                0
            ) / studentData.modules.length;
        const theoriqueAvg =
            studentData.modules.reduce(
                (total, module) => total + module.examenTheorique,
                0
            ) / studentData.modules.length;
        const pratiqueAvg =
            studentData.modules.reduce(
                (total, module) => total + module.examenPratique,
                0
            ) / studentData.modules.length;

        // Calculate weighted average
        let totalWeightedScore = 0;
        let totalCoefficients = 0;

        studentData.modules.forEach((module) => {
            const moduleAvg =
                (module.controle +
                    module.examenTheorique +
                    module.examenPratique) /
                3;
            totalWeightedScore += moduleAvg * module.coefficient;
            totalCoefficients += module.coefficient;
        });

        const generalAvg =
            totalCoefficients > 0 ? totalWeightedScore / totalCoefficients : 0;

        return {
            controleAvg: controleAvg.toFixed(2),
            theoriqueAvg: theoriqueAvg.toFixed(2),
            pratiqueAvg: pratiqueAvg.toFixed(2),
            generalAvg: generalAvg.toFixed(2),
        };
    };

    const averages = calculateAverages();

    // Handle printing/PDF generation
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `Relevé_de_notes_${studentData.studentName.replace(
            /\s+/g,
            "_"
        )}`,
    });

    const calculateAverageForStudent = (studentId, moduleControles) => {
        console.log("Module Controles:", moduleControles);
        let total = 0;
        let count = 0;
        // Determine which notes object to use based on the selected type
        const notesObject = notes;
        // Loop through all controls/exams for this student

        if (!moduleControles) {
            return "-";
        }

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

    // Group examens by module
    const getModuleExams = (moduleId) => {
        return examens.filter((exam) => exam.module_id === moduleId);
    };

    // Get specific exam by module and type
    const getExamByType = (moduleExams, type) => {
        return moduleExams.find((exam) => exam.type === type);
    };

    if (
        !etudiantPersonalInfos ||
        !etudiantPersonalInfos.filiere ||
        !etudiantPersonalInfos.promotion
    ) {
        return <p>Chargement des infos de l'étudiant…</p>;
    }

    return (
        <div className="p-4">
            <div className="mb-4 flex justify-between">
                <h1 className="text-2xl font-bold">Relevé de notes</h1>
                <button
                    onClick={handlePrint}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Télécharger en PDF
                </button>
            </div>

            <div ref={componentRef} className="p-4 bg-white">
                {/* Student Infos */}
                <StudentInfos
                    key={etudiantPersonalInfos.id}
                    nom={etudiantPersonalInfos.nom}
                    prenom={etudiantPersonalInfos.prenom}
                    filiere={etudiantPersonalInfos.filiere.libelle}
                    promotion={etudiantPersonalInfos.promotion.annee_scolaire}
                    anneeFormation={etudiantPersonalInfos.annee}
                    niveau="Technicien"
                />
                {/* Grades table */}
                <table className="w-full border-collapse border border-gray-300 mb-6">
                    <thead>
                        <tr className="bg-gray-200">
                            <th
                                className="border border-gray-300 p-2 text-left"
                                rowSpan="2"
                            >
                                Unités de formation et coefficient
                            </th>

                            <th
                                className="border border-gray-300 p-2 text-left"
                                rowSpan="2"
                            >
                                Coeff
                            </th>

                            <th className="border border-gray-300 p-2 text-center">
                                Moyenne <br /> des Contrôles Continu
                            </th>
                            <th
                                className="border border-gray-300 p-2 text-center"
                                colSpan="2"
                            >
                                Examen de fin de
                                <br />
                                cours de formation
                            </th>
                            <th
                                className="border border-gray-300 p-2 text-center"
                                rowSpan="2"
                            >
                                Observations / commentaire
                            </th>
                        </tr>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2 text-center"></th>
                            <th className="border border-gray-300 p-2 text-center">
                                Théorique
                            </th>
                            <th className="border border-gray-300 p-2 text-center">
                                Pratique
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {modules.map((module) => {
                            // Get the controles for this module
                            const moduleControles = getModuleControles(
                                module.id
                            );

                            const moyenne = calculateAverageForStudent(
                                etudiantPersonalInfos.id,
                                moduleControles
                            )
                            // Get the exam for this module
                            const moduleExams = getModuleExams(module.id);
                            const theoreticalExam = getExamByType(
                                moduleExams,
                                "theorique"
                            );
                            const practicalExam = getExamByType(
                                moduleExams,
                                "pratique"
                            );
                            return (
                                <tr key={module.id}>
                                    <td className="border border-gray-300 p-2">
                                        {module.id} : {module.libelle}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        {module.coefficient}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        <span className={`${moyenne >= 10 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                        {moyenne}
                                        </span>
                                    </td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        {/* {module.examenTheorique.toFixed(2)} */}{" "}
                                        {theoreticalExam ? (
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    notesExamens[
                                                        `${etudiantPersonalInfos.id}-${theoreticalExam.id}`
                                                    ] >= 10
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {notesExamens[
                                                    `${etudiantPersonalInfos.id}-${theoreticalExam.id}`
                                                ] || "-"}
                                            </span>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        {/* {module.examenPratique.toFixed(2)} */}{" "}
                                        {practicalExam ? (
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    notesExamens[
                                                        `${etudiantPersonalInfos.id}-${practicalExam.id}`
                                                    ] >= 10
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {notesExamens[
                                                    `${etudiantPersonalInfos.id}-${practicalExam.id}`
                                                ] || "-"}
                                            </span>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                    <td className="border border-gray-300 p-2"></td>
                                </tr>
                            );
                        })}

                        <tr className="font-bold">
                            <td className="border border-gray-300 p-2 text-right">
                                Moyenne des notes
                            </td>
                            <td className="border border-gray-300 p-2 text-center">
                                {averages.controleAvg}
                            </td>
                            <td className="border border-gray-300 p-2 text-center">
                                {averages.theoriqueAvg}
                            </td>
                            <td className="border border-gray-300 p-2 text-center">
                                {averages.pratiqueAvg}
                            </td>
                            <td className="border border-gray-300 p-2"></td>
                        </tr>
                    </tbody>
                </table>
                {/* General average */}
                <div className="flex justify-end mb-6">
                    <table
                        className="border-collapse border border-gray-300"
                        style={{ width: "250px" }}
                    >
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 p-2 font-bold text-center">
                                    Moyenne Générale
                                </td>
                                <td className="border border-gray-300 p-2 text-center font-bold">
                                    {averages.generalAvg}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* Jury decision */}
                <table className="w-full border-collapse border border-gray-300">
                    <tbody>
                        <tr className="bg-gray-200">
                            <td className="border border-gray-300 p-2 font-bold w-1/3">
                                Proposition du jury
                            </td>
                            <td className="border border-gray-300 p-2 text-center">
                                {studentData.decision}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentGradeReport;

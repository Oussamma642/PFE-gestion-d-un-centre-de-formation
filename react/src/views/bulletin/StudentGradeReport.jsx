import React, { useEffect, useRef, useState } from "react";
import axiosClient from "../../axios-client";
import { useReactToPrint } from "react-to-print";
import StudentInfos from "./StudentInfos";

const StudentGradeReport = () => {
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

    const [etudiantPersonalInfos, setEtudiantPersonalInfos] = useState(null);

    useEffect(() => {
        const getEtudiantPersonalInfos = async () => {
            const response = await axiosClient.get("/bulletin/etudiants/12");
            console.log(response.data);
            setEtudiantPersonalInfos(response.data[0]);
        };
        getEtudiantPersonalInfos();
    }, []);

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
                Student info table
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
                            <th className="border border-gray-300 p-2 text-center">
                                Contrôles
                                <br />
                                Continu
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
                        {studentData.modules.map((module) => (
                            <tr key={module.id}>
                                <td className="border border-gray-300 p-2">
                                    {module.id} : {module.name}
                                </td>
                                <td className="border border-gray-300 p-2 text-center">
                                    {module.coefficient}
                                </td>
                                <td className="border border-gray-300 p-2 text-center">
                                    {module.controle.toFixed(2)}
                                </td>
                                <td className="border border-gray-300 p-2 text-center">
                                    {module.examenTheorique.toFixed(2)}
                                </td>
                                <td className="border border-gray-300 p-2"></td>
                            </tr>
                        ))}
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

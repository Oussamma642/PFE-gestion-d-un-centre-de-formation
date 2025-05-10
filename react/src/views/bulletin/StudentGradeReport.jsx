// StudentGradeReport.jsx
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import StudentInfos from "./StudentInfos";



const StudentGradeReport = ({
    etudiantPersonalInfos,
    modules,
    controles,
    notes,
    examens,
    notesExamens
}) => {
    const componentRef = useRef();

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

    // Calculate average for a student's module controls
    const calculateAverageForStudent = (studentId, moduleControles) => {
        if (!moduleControles || moduleControles.length === 0) {
            return "-";
        }

        let total = 0;
        let count = 0;

        moduleControles.forEach((controle) => {
            const key = `${studentId}-${controle.id}`;
            const grade = notes[key];
            // Only count grades that exist and are valid numbers
            if (grade !== undefined && !isNaN(parseFloat(grade))) {
                total += parseFloat(grade);
                count++;
            }
        });
        
        // Return the average or a dash if no grades exist
        return count > 0 ? (total / count).toFixed(2) : "-";
    };

    // Calculate average for all controls, theoretical exams, and practical exams
    const calculateAverages = () => {
        let controleTotal = 0;
        let controleCount = 0;
        let theoriqueTotal = 0;
        let theoriqueCount = 0;
        let pratiqueTotal = 0;
        let pratiqueCount = 0;
        let totalWeightedScore = 0;
        let totalCoefficients = 0;

        modules.forEach(module => {
            const moduleControles = getModuleControles(module.id);
            const controleAvg = calculateAverageForStudent(etudiantPersonalInfos.id, moduleControles);
            
            // Get exams for this module
            const moduleExams = getModuleExams(module.id);
            const theoreticalExam = getExamByType(moduleExams, "theorique");
            const practicalExam = getExamByType(moduleExams, "pratique");
            
            // Get exam grades
            const theoriqueGrade = theoreticalExam 
                ? notesExamens[`${etudiantPersonalInfos.id}-${theoreticalExam.id}`] 
                : null;
            const pratiqueGrade = practicalExam 
                ? notesExamens[`${etudiantPersonalInfos.id}-${practicalExam.id}`] 
                : null;
            
            // Add to totals if valid
            if (controleAvg !== "-" && !isNaN(parseFloat(controleAvg))) {
                controleTotal += parseFloat(controleAvg);
                controleCount++;
            }
            
            if (theoriqueGrade && !isNaN(parseFloat(theoriqueGrade))) {
                theoriqueTotal += parseFloat(theoriqueGrade);
                theoriqueCount++;
            }
            
            if (pratiqueGrade && !isNaN(parseFloat(pratiqueGrade))) {
                pratiqueTotal += parseFloat(pratiqueGrade);
                pratiqueCount++;
            }
            
            // Calculate module average for general average
            const moduleAvg = calculateModuleAverage(
                controleAvg !== "-" ? parseFloat(controleAvg) : 0,
                theoriqueGrade ? parseFloat(theoriqueGrade) : 0,
                pratiqueGrade ? parseFloat(pratiqueGrade) : 0,
                controleAvg !== "-" ? 1 : 0,
                theoriqueGrade ? 1 : 0,
                pratiqueGrade ? 1 : 0
            );
            
            if (moduleAvg > 0) {
                totalWeightedScore += moduleAvg * module.coefficient;
                totalCoefficients += module.coefficient;
            }
        });

        const controleAvg = controleCount > 0 ? controleTotal / controleCount : 0;
        const theoriqueAvg = theoriqueCount > 0 ? theoriqueTotal / theoriqueCount : 0;
        const pratiqueAvg = pratiqueCount > 0 ? pratiqueTotal / pratiqueCount : 0;
        const generalAvg = totalCoefficients > 0 ? totalWeightedScore / totalCoefficients : 0;

        return {
            controleAvg: controleAvg.toFixed(2),
            theoriqueAvg: theoriqueAvg.toFixed(2),
            pratiqueAvg: pratiqueAvg.toFixed(2),
            generalAvg: generalAvg.toFixed(2)
        };
    };

    // Calculate module average from its different components
    const calculateModuleAverage = (controleAvg, theoriqueGrade, pratiqueGrade, controlePresent, theoriquePresent, pratiquePresent) => {
        const total = (controlePresent ? controleAvg : 0) + 
                      (theoriquePresent ? theoriqueGrade : 0) + 
                      (pratiquePresent ? pratiqueGrade : 0);
        const count = controlePresent + theoriquePresent + pratiquePresent;
        return count > 0 ? total / count : 0;
    };


    // Determine student decision based on average
    const determineDecision = (generalAvg) => {
        if (generalAvg >= 10) {
            return "Admis";
        } else if (generalAvg >= 8) {
            return "Rattrapage";
        } else {
            return "Exclu";
        }
    };

    const averages = calculateAverages();
    const decision = determineDecision(parseFloat(averages.generalAvg));
 
    // Pour calculer la moyenne des notes des CCs, ExTs, ExPs
    let sommeMoyCC = 0;
    let sommeExT = 0;
    let sommeExP = 0;
    let sommeCoeffModules = 0;

    // Calculate the Moyenne Générale 
    function calculateMoyennGenerale(moyGeneraleCC, moyGeneraleExT, moyGeneraleExP){
        return (((moyGeneraleCC * 3) + (moyGeneraleExT * 2) + (moyGeneraleExP * 3))/8).toFixed(2)
    }

    // Calculate moyenne de (la somme des moyenne CC) et (La somme des EXTs et EXPs)
    function calculateMoynneCCEXs(somme, sommeCoeffModules)
    {
        return (somme / sommeCoeffModules).toFixed(2);
    }

   if (!etudiantPersonalInfos || !etudiantPersonalInfos.filiere || !etudiantPersonalInfos.promotion) {
        return <p className="p-4">Chargement des infos de l'étudiant…</p>;
    }


    return (
        <div className="p-4 mb-8 border-b-2">
          

            <div ref={componentRef} className="p-4 bg-white">
                {/* Student Infos */}
                <StudentInfos
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
                            <th className="border border-gray-300 p-2 text-left" rowSpan="2">
                                Unités de formation et coefficient
                            </th>
                            <th className="border border-gray-300 p-2 text-left" rowSpan="2">
                                Coeff
                            </th>
                            <th className="border border-gray-300 p-2 text-center">
                                Moyenne <br /> des Contrôles Continu
                            </th>
                            <th className="border border-gray-300 p-2 text-center" colSpan="2">
                                Examen de fin de<br />cours de formation
                            </th>
                            <th className="border border-gray-300 p-2 text-center" rowSpan="2">
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
                            const moduleControles = getModuleControles(module.id);
                            const moyenne = calculateAverageForStudent(
                                etudiantPersonalInfos.id,
                                moduleControles
                            );
                            
                            // Get the exams for this module
                            const moduleExams = getModuleExams(module.id);
                            const theoreticalExam = getExamByType(moduleExams, "theorique");
                            const practicalExam = getExamByType(moduleExams, "pratique");
                            
                            // Get exam grades
                            const theoriqueGrade = theoreticalExam 
                                ? notesExamens[`${etudiantPersonalInfos.id}-${theoreticalExam.id}`] 
                                : null;
                            const pratiqueGrade = practicalExam 
                                ? notesExamens[`${etudiantPersonalInfos.id}-${practicalExam.id}`] 
                                : null;

                                
                            // Get Moyenne Generale for CC:
                            sommeMoyCC += (moyenne * module.coefficient);
                            sommeExT += (theoriqueGrade * module.coefficient);
                            sommeExP += (pratiqueGrade * module.coefficient);
                            sommeCoeffModules += module.coefficient;

                            return (
                                <tr key={module.id}>
                                    <td className="border border-gray-300 p-2">
                                        {module.id} : {module.libelle}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        {module.coefficient}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        {moyenne !== "-" && (
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                parseFloat(moyenne) >= 10 
                                                    ? "bg-green-100 text-green-800" 
                                                    : "bg-red-100 text-red-800"
                                            }`}>
                                                {moyenne}
                                            </span>
                                        )}
                                        {moyenne === "-" && "-"}
                                        {}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        {theoriqueGrade !== null && theoriqueGrade !== undefined ? (
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                parseFloat(theoriqueGrade) >= 10 
                                                    ? "bg-green-100 text-green-800" 
                                                    : "bg-red-100 text-red-800"
                                            }`}>
                                                {theoriqueGrade}
                                            </span>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        {pratiqueGrade !== null && pratiqueGrade !== undefined ? (
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                parseFloat(pratiqueGrade) >= 10 
                                                    ? "bg-green-100 text-green-800" 
                                                    : "bg-red-100 text-red-800"
                                            }`}>
                                                {pratiqueGrade}
                                            </span>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                    <td className="border border-gray-300 p-2"></td>
                                </tr>
                            );
                        })}

                        <tr className="font-bold bg-gray-100">
                            <td className="border border-gray-300 p-2 text-right">
                                Moyenne des notes
                            </td>
                            <td className="border border-gray-300 p-2"></td>
                            <td className="border border-gray-300 p-2 text-center">

                                {/* {sommeMoyCC / modules.length} */}
                                {calculateMoynneCCEXs(sommeMoyCC, sommeCoeffModules)}
                            </td>
                            <td className="border border-gray-300 p-2 text-center">
                                {/* {averages.theoriqueAvg} */}
                                {/* {moyGenExT / modules.length} */}
                                {calculateMoynneCCEXs(sommeExT, sommeCoeffModules)}
                            </td>
                            <td className="border border-gray-300 p-2 text-center">
                                {/* {averages.pratiqueAvg} */}
                                {/* {sommeExP / modules.length} */}

                                {calculateMoynneCCEXs(sommeExP, sommeCoeffModules)}

                            </td>
                            <td className="border border-gray-300 p-2"></td>
                        </tr>
                    </tbody>
                </table>
                
                {/* General average */}
                <div className="flex justify-end mb-6">
                    <table className="border-collapse border border-gray-300" style={{ width: "250px" }}>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 p-2 font-bold text-center">
                                    Moyenne Générale
                                </td>
                                <td className={`border border-gray-300 p-2 text-center font-bold ${
                                    parseFloat(averages.generalAvg) >= 10 
                                        ? "bg-green-100 text-green-800" 
                                        : "bg-red-100 text-red-800"
                                }`}>
                                    {/* {calculateMoyennGenerale(sommeMoyCC, sommeExT, sommeExP, sommeCoeffModules)} */}
                                    {calculateMoyennGenerale(
                                        calculateMoynneCCEXs(sommeMoyCC, sommeCoeffModules),
                                        calculateMoynneCCEXs(sommeExT, sommeCoeffModules),
                                        calculateMoynneCCEXs(sommeExP, sommeCoeffModules)
                                    )}
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
                            <td className={`border border-gray-300 p-2 text-center font-medium ${
                                decision === "Admis" 
                                    ? "bg-green-100 text-green-800" 
                                    : decision === "Rattrapage" 
                                        ? "bg-yellow-100 text-yellow-800" 
                                        : "bg-red-100 text-red-800"
                            }`}>
                                {decision}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentGradeReport;
// PrepareBulletin.jsx
import React, { useEffect, useState, useRef } from "react";
import axiosClient from "../../axios-client";
import StudentGradeReport from "./StudentGradeReport";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function PrepareBulletin() {
    const [etudiants, setEtudiants] = useState([]);
    const [modules, setModules] = useState([]);
    const [controles, setControles] = useState([]);
    const [notes, setNotes] = useState({});
    const [examens, setExamens] = useState([]);
    const [notesExamens, setNotesExamens] = useState({});
    const [loading, setLoading] = useState(true);

    const { annee } = useParams();
    const { filiere } = useParams();

    // Refs for each student's bulletin
    const bulletinRefs = useRef([]);

    // Fetch all data in parallel when component mounts
    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                // Define all fetch operations
                const fetchEtudiants = axiosClient.get(
                    `/etudiants/annee/${annee}/filiere/${filiere}`
                );
                const fetchModules = axiosClient.get(
                    `/modules/annee/${annee}/filiere/${filiere}`
                );
                const fetchControles = axiosClient.get(
                    `controles/modules/${annee}/filiere/${filiere}`
                );
                const fetchNotes = axiosClient.get(
                    `/notes/${annee}/filiere/${filiere}`
                );
                const fetchExamens = axiosClient.get(
                    `examens/modules/${annee}/filiere/${filiere}`
                );
                const fetchExamensNotes = axiosClient.get(
                    `/notesexamens/${annee}/filiere/${filiere}`
                );

                // Execute all requests in parallel
                const [
                    etudiantsResponse,
                    modulesResponse,
                    controlesResponse,
                    notesResponse,
                    examensResponse,
                    examensNotesResponse,
                ] = await Promise.all([
                    fetchEtudiants,
                    fetchModules,
                    fetchControles,
                    fetchNotes,
                    fetchExamens,
                    fetchExamensNotes,
                ]);

                // Set the state with responses
                setEtudiants(etudiantsResponse.data);
                setModules(modulesResponse.data);
                setControles(controlesResponse.data);
                setExamens(examensResponse.data);

                console.log("Modules Response", modulesResponse.data);
                console.log("Controles Response", controlesResponse.data);
                console.log("Examens Response", examensResponse.data);

                console.log("etudiants Response", etudiantsResponse.data);
                // Process notes into a map for easy lookup
                const notesMap = {};
                notesResponse.data.forEach((note) => {
                    notesMap[`${note.etudiant_id}-${note.controle_id}`] =
                        note.note;
                });
                setNotes(notesMap);
                console.log("Notes Response", notesMap);

                // Process exam notes into a map for easy lookup
                const examNotesMap = {};
                examensNotesResponse.data.forEach((note) => {
                    examNotesMap[`${note.etudiant_id}-${note.examen_id}`] =
                        note.note;
                });
                setNotesExamens(examNotesMap);
                console.log("Examens Notes Response", examNotesMap);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [annee, filiere]);

    const handlePrint = async () => {
        const pdf = new jsPDF("p", "mm", "a4");
        const pxPerMm = 96 / 25.4; // ≈ 3.78px per mm at 96dpi

        for (let i = 0; i < bulletinRefs.current.length; i++) {
            const ref = bulletinRefs.current[i];
            if (!ref) continue;

            // Compute the dimensions of the PDF page in pixels
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const widthPx = pdfWidth * pxPerMm;
            const heightPx = pdfHeight * pxPerMm;

            // Capture the content using html2canvas
            const canvas = await html2canvas(ref, {
                width: widthPx,
                height: heightPx,
                scale: 2, // Increase resolution for better quality
                backgroundColor: "#ffffff",
            });

            // Convert the canvas to an image
            const imgData = canvas.toDataURL("image/png");
            const imgWidth = pdfWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Add the image to the PDF
            if (i > 0) pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        }

        pdf.save("bulletins.pdf");
    };

    if (loading) {
        return <div className="p-4 text-center">Chargement des données...</div>;
    }

    return (
        <div className="container mx-auto">
            {etudiants.length === 0 ? (
                <div className="p-4 text-center">Aucun étudiant trouvé</div>
            ) : (
                <>
                    <div className="mb-4 flex justify-between">
                        <h1 className="text-2xl font-bold">
                            Relevé de notes de la première année
                        </h1>
                     <button
    onClick={handlePrint}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
>
    Télécharger en PDF
</button>
                    </div>
                    {etudiants.map((etudiant, idx) => (
                        <div
                            key={etudiant.id}
                            ref={(el) => (bulletinRefs.current[idx] = el)}
                            className="bulletin-page"
                        >
                            <StudentGradeReport
                                etudiantPersonalInfos={etudiant}
                                modules={modules}
                                controles={controles}
                                notes={notes}
                                examens={examens}
                                notesExamens={notesExamens}
                            />
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

export default PrepareBulletin;

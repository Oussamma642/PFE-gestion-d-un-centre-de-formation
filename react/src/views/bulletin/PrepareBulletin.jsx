// PrepareBulletin.jsx
import React, { useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import StudentGradeReport from "./StudentGradeReport";
import { useParams } from "react-router-dom";

function PrepareBulletin() {
    const [etudiants, setEtudiants] = useState([]);
    const [modules, setModules] = useState([]);
    const [controles, setControles] = useState([]);
    const [notes, setNotes] = useState({});
    const [examens, setExamens] = useState([]);
    const [notesExamens, setNotesExamens] = useState({});
    const [loading, setLoading] = useState(true);

    const {annee} = useParams();
    const {filiere} = useParams();

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

                
                console.log("Modules Response",modulesResponse.data);
                console.log("Controles Response",controlesResponse.data);
                console.log("Examens Response",examensResponse.data)

                console.log("etudiants Response",etudiantsResponse.data);
                // Process notes into a map for easy lookup
                const notesMap = {};
                notesResponse.data.forEach((note) => {
                    notesMap[`${note.etudiant_id}-${note.controle_id}`] =
                        note.note;
                });
                setNotes(notesMap);
                console.log("Notes Response",notesMap);

                // Process exam notes into a map for easy lookup
                const examNotesMap = {};
                examensNotesResponse.data.forEach((note) => {
                    examNotesMap[`${note.etudiant_id}-${note.examen_id}`] =
                        note.note;
                });
                setNotesExamens(examNotesMap);
                console.log("Examens Notes Response",examNotesMap);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [annee, filiere]);

    if (loading) {
        return <div className="p-4 text-center">Chargement des données...</div>;
    }

    return (
        <div className="container mx-auto">
            {etudiants.length === 0 ? (
                <div className="p-4 text-center">Aucun étudiant trouvé</div>
            ) : (
                etudiants.map((etudiant) => (
                    <StudentGradeReport
                        key={etudiant.id}
                        etudiantPersonalInfos={etudiant}
                        modules={modules}
                        controles={controles}
                        notes={notes}
                        examens={examens}
                        notesExamens={notesExamens}
                    />
                ))
            )}
        </div>
    );
}

export default PrepareBulletin;

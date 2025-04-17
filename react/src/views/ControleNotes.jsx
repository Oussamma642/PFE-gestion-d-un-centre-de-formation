import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client";
import { useParams } from "react-router-dom";

function ControleNotes() {
    const { moduleId } = useParams();
    const [students, setStudents] = useState([]);
    const [controles, setControles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [studentsResponse, controlesResponse] = await Promise.all(
                    [
                        axiosClient.get(`/etudiants/module/${moduleId}`),
                        axiosClient.get(`/controles/module/${moduleId}`),
                    ]
                );

                setStudents(studentsResponse.data);
                setControles(controlesResponse.data);
            } catch (err) {
                setError("Erreur lors du chargement des données");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [moduleId]);

    const handleNoteChange = async (etudiantId, controleId, note) => {
        try {
            await axiosClient.post("/controles/notes", {
                etudiant_id: etudiantId,
                controle_id: controleId,
                note: note,
            });
        } catch (err) {
            setError("Erreur lors de la sauvegarde de la note");
            console.error(err);
        }
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">
                Gestion des notes des contrôles continus
            </h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Étudiant</th>
                            {controles.map((controle) => (
                                <th
                                    key={controle.id}
                                    className="px-4 py-2 border"
                                >
                                    CC{controle.numero_controle}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((etudiant) => (
                            <tr key={etudiant.id}>
                                <td className="px-4 py-2 border">
                                    {etudiant.nom} {etudiant.prenom}
                                </td>
                                {controles.map((controle) => {
                                    const note =
                                        controles.find(
                                            (c) =>
                                                c.etudiant_id === etudiant.id &&
                                                c.numero_controle ===
                                                    controle.numero_controle
                                        )?.note || "";

                                    return (
                                        <td
                                            key={`${etudiant.id}-${controle.id}`}
                                            className="px-4 py-2 border"
                                        >
                                            <input
                                                type="number"
                                                min="0"
                                                max="20"
                                                step="0.5"
                                                value={note}
                                                onChange={(e) =>
                                                    handleNoteChange(
                                                        etudiant.id,
                                                        controle.id,
                                                        e.target.value
                                                    )
                                                }
                                                className="w-20 px-2 py-1 border rounded"
                                            />
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ControleNotes;

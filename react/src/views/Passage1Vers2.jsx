import React from "react";

function Passage1Vers2() {
    // Données statiques d'exemple
    const data = [
        {
            nom: "Dupont",
            prenom: "Jean",
            modules: [
                {
                    libelle: "Etude de Projet",
                    examen_theorique: 10,
                    examen_pratique: 10,
                    moyenne_controles: 14.25,
                },
                {
                    libelle: "Techn de Second Œuvres",
                    examen_theorique: 13,
                    examen_pratique: 12,
                    moyenne_controles: 12,
                },
                {
                    libelle: "Métré de second œuvre",
                    examen_theorique: 14,
                    examen_pratique: 12.5,
                    moyenne_controles: 10,
                },
                {
                    libelle: "Informatique Professionnel",
                    examen_theorique: 10,
                    examen_pratique: 12.5,
                    moyenne_controles: 14.17,
                },
            ],
        },
        {
            nom: "Martin",
            prenom: "Paul",
            modules: [
                {
                    libelle: "Etude de Projet",
                    examen_theorique: 12.5,
                    examen_pratique: 8.5,
                    moyenne_controles: 14,
                },
                {
                    libelle: "Techn de Second Œuvres",
                    examen_theorique: 14,
                    examen_pratique: 11.25,
                    moyenne_controles: 12,
                },
                {
                    libelle: "Métré de second œuvre",
                    examen_theorique: 18,
                    examen_pratique: 10,
                    moyenne_controles: 13,
                },
                {
                    libelle: "Informatique Professionnel",
                    examen_theorique: 13,
                    examen_pratique: 14,
                    moyenne_controles: 13.67,
                },
            ],
        },
        // Ajoute d'autres étudiants ici...
    ];
    // Récupérer les modules pour l'en-tête
    const modules = data[0].modules;

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

                // console.log(modulesData);

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

    return (
        <div>
            <table border="1">
                <thead>
                    <tr>
                        <th rowSpan="2">Noms et Prénoms</th>
                        {modules.map((mod, idx) => (
                            <th key={idx} colSpan="3">
                                {mod.libelle}
                            </th>
                        ))}
                    </tr>
                    <tr>
                        {modules.map((mod, idx) => (
                            <React.Fragment key={idx}>
                                <th>CPT</th>
                                <th>CPP</th>
                                <th>CC</th>
                            </React.Fragment>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((etudiant, idx) => (
                        <tr key={idx}>
                            <td>
                                {etudiant.nom} {etudiant.prenom}
                            </td>
                            {etudiant.modules.map((mod, idx2) => (
                                <React.Fragment key={idx2}>
                                    <td>{mod.examen_theorique}</td>
                                    <td>{mod.examen_pratique}</td>
                                    <td>{mod.moyenne_controles}</td>
                                </React.Fragment>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Passage1Vers2;

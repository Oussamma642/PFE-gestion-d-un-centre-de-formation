const ModulesByYearAndSemester = {
    "1ere-annee": {
        label: "1ère Année",
        semesters: {
            s1: {
                label: "Semestre 1",
                modules: [
                    {
                        id: 1,
                        name: "Français",
                        path: "francais",
                        icon: "📚",
                        coefficient: 3,
                        masseHoraire: "48h",
                        description:
                            "Langue et communication professionnelle",
                        enseignant: "Dr. Martin",
                        type: "Matière fondamentale",
                        credits: 4,
                    },
                    {
                        id: 2,
                        name: "Mathématiques",
                        path: "mathematiques",
                        icon: "📐",
                        coefficient: 4,
                        masseHoraire: "64h",
                        description: "Analyse et algèbre",
                        enseignant: "Dr. Dubois",
                        type: "Matière fondamentale",
                        credits: 5,
                    },
                ],
            },
            s2: {
                label: "Semestre 2",
                modules: [
                    {
                        id: 3,
                        name: "Physique",
                        path: "physique",
                        icon: "⚛️",
                    },
                    {
                        id: 4,
                        name: "Chimie",
                        path: "chimie",
                        icon: "🧪",
                    },
                ],
            },
        },
    },
    "2eme-annee": {
        label: "2ème Année",
        semesters: {
            s1: {
                label: "Semestre 1",
                modules: [
                    {
                        id: 5,
                        name: "Informatique",
                        path: "informatique",
                        icon: "💻",
                    },
                    {
                        id: 6,
                        name: "Anglais",
                        path: "anglais",
                        icon: "🌍",
                    },
                ],
            },
            s2: {
                label: "Semestre 2",
                modules: [
                    {
                        id: 7,
                        name: "Base de données",
                        path: "bdd",
                        icon: "💾",
                    },
                    {
                        id: 8,
                        name: "Réseaux",
                        path: "reseaux",
                        icon: "🌐",
                    },
                ],
            },
        },
    },
};

export {ModulesByYearAndSemester};

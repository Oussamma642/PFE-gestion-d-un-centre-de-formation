import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    Book,
    BarChart2,
    ChevronDown,
    ChevronRight,
    Loader,
} from "lucide-react";
import axios from "axios";

import axiosClient from "../axios-client";

const WorkingDirectory = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedFiliere, setSelectedFiliere] = useState(null);
    const [filieres, setFilieres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // dashboard/:filieres/premiere_annee

    // Récupération des filières depuis l'API
    useEffect(() => {
        const fetchFilieres = async () => {
            setLoading(true);
            try {
                const response = await axiosClient.get("/filieres");
                setFilieres(response.data);
                setError(null);
            } catch (err) {
                console.error("Erreur lors du chargement des filières:", err);
                setError(
                    "Impossible de charger les filières. Veuillez réessayer plus tard."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchFilieres();
    }, []);

    const options = [
        {
            id: 1,
            title: "Saisir les notes",
            description: "Entrez et modifiez les notes des étudiants",
            icon: <Book className="text-blue-600" />,
            color: "bg-blue-50 border-blue-200",
            hoverColor: "hover:bg-blue-100",
            iconBg: "bg-blue-100",
            hasFiliere: true,
            subOptions: [
                {
                    id: 1,
                    title: "Première année",
                    icon: <ChevronRight size={16} />,
                },
                {
                    id: 2,
                    title: "Deuxième année",
                    icon: <ChevronRight size={16} />,
                },
            ],
        },
        {
            id: 2,
            title: "Affichage",
            description: "Consultez les statistiques et rapports",
            icon: <BarChart2 className="text-emerald-600" />,
            color: "bg-emerald-50 border-emerald-200",
            hoverColor: "hover:bg-emerald-100",
            iconBg: "bg-emerald-100",
            hasFiliere: false,
            subOptions: [],
        },
        {
            id: 3,
            title: "Gestion des ressources",
            description: "Gérez les ressources pédagogiques",
            icon: <Book className="text-purple-600" />, // Replace with an appropriate icon
            color: "bg-purple-50 border-purple-200",
            hoverColor: "hover:bg-purple-100",
            iconBg: "bg-purple-100",
            hasFiliere: false,
            subOptions: [],
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
            },
        },
    };

    const handleSubOptionClick = (subOptionId) => {
        if (!selectedFiliere && selectedOption === 1) {
            return; // Ne pas naviguer si aucune filière n'est sélectionnée pour l'option "Saisir les notes"
        }

        switch (subOptionId) {
            case 1:
                navigate(
                    `/dashboard/filiere/${selectedFiliere}/annee/premiere_annee`
                );
                break;
            case 2:
                navigate(
                    `/dashboard/filiere/${selectedFiliere}/annee/deuxieme_annee`
                );
                break;
            default:
                navigate(
                    `/dashboard/filiere/${selectedFiliere}/annee/premiere_annee`
                );
                break;
        }
    };

    const handleFiliereSelect = (filiereId) => {
        setSelectedFiliere(filiereId);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">
                        Tableau de Bord
                    </h1>
                    <p className="text-slate-600">
                        Gérez les notes et les performances des étudiants
                    </p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-6"
                >
                    {options.map((option) => (
                        <motion.div
                            key={option.id}
                            variants={itemVariants}
                            className={`rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border ${option.color}`}
                        >
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => {
                                    if (option.id === 3) {
                                        // Navigate to /dashboard/resources for "Gestion des ressources"
                                        navigate("/dashboard/resources");
                                    } else {
                                        // Toggle the selected option for other options
                                        setSelectedOption(
                                            selectedOption === option.id
                                                ? null
                                                : option.id
                                        );
                                    }
                                }}
                                className={`w-full p-6 text-left focus:outline-none rounded-xl ${option.hoverColor}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div
                                            className={`flex items-center justify-center w-12 h-12 rounded-full ${option.iconBg}`}
                                        >
                                            {typeof option.icon === "string" ? (
                                                <span className="text-2xl">
                                                    {option.icon}
                                                </span>
                                            ) : (
                                                option.icon
                                            )}
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold text-slate-800">
                                                {option.title}
                                            </h2>
                                            <p className="text-sm text-slate-600 mt-1">
                                                {option.description}
                                            </p>
                                        </div>
                                    </div>
                                    {(option.subOptions.length > 0 ||
                                        option.hasFiliere) && (
                                        <ChevronDown
                                            className={`text-slate-500 transition-transform duration-300 ${
                                                selectedOption === option.id
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                            size={20}
                                        />
                                    )}
                                </div>
                            </motion.button>

                            {selectedOption === option.id && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="border-t border-slate-200"
                                >
                                    {/* Sélection de filière si applicable */}
                                    {option.hasFiliere && (
                                        <div className="p-4">
                                            <h3 className="text-md font-medium text-slate-700 mb-3">
                                                Sélectionnez une filière:
                                            </h3>
                                            {loading ? (
                                                <div className="flex justify-center p-4">
                                                    <Loader className="animate-spin text-blue-600" />
                                                </div>
                                            ) : error ? (
                                                <div className="p-3 bg-red-50 text-red-700 rounded-lg">
                                                    {error}
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                                                    {filieres.map((filiere) => (
                                                        <motion.button
                                                            key={filiere.id}
                                                            whileHover={{
                                                                scale: 1.02,
                                                            }}
                                                            whileTap={{
                                                                scale: 0.98,
                                                            }}
                                                            onClick={() =>
                                                                handleFiliereSelect(
                                                                    filiere.id
                                                                )
                                                            }
                                                            className={`p-3 rounded-lg border transition-all text-left flex items-center justify-between ${
                                                                selectedFiliere ===
                                                                filiere.id
                                                                    ? "bg-blue-100 border-blue-300"
                                                                    : "bg-white border-slate-200 hover:bg-slate-50"
                                                            }`}
                                                        >
                                                            <span>
                                                                {
                                                                    filiere.libelle
                                                                }
                                                            </span>
                                                            {selectedFiliere ===
                                                                filiere.id && (
                                                                <span className="text-blue-600 font-bold">
                                                                    ✔
                                                                </span>
                                                            )}
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}{" "}
                                    {/* Affichage des sous-options si la filière est sélectionnée ou si pas besoin de filière */}
                                    {option.subOptions.length > 0 &&
                                        (!option.hasFiliere ||
                                            selectedFiliere) && (
                                            <div className="p-4 space-y-1">
                                                {option.subOptions.map(
                                                    (subOption) => (
                                                        <motion.button
                                                            key={subOption.id}
                                                            whileHover={{
                                                                x: 5,
                                                            }}
                                                            onClick={() =>
                                                                handleSubOptionClick(
                                                                    subOption.id
                                                                )
                                                            }
                                                            className="w-full px-4 py-3 text-left hover:bg-slate-100 rounded-lg transition-colors duration-200 flex items-center justify-between"
                                                        >
                                                            <span className="text-slate-700 font-medium">
                                                                {
                                                                    subOption.title
                                                                }
                                                            </span>
                                                            {subOption.icon}
                                                        </motion.button>
                                                    )
                                                )}
                                            </div>
                                        )}
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 text-center text-slate-500 text-sm"
                >
                    <p>© 2025 Système de Gestion Scolaire</p>
                </motion.div>
            </div>
        </div>
    );
};

export default WorkingDirectory;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Book, BarChart2, ChevronDown, ChevronRight } from "lucide-react";

const WorkingDirectory = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const navigate = useNavigate();

    const options = [
        {
            id: 1,
            title: "Saisir les notes",
            description: "Entrez et modifiez les notes des étudiants",
            icon: <Book className="text-blue-600" />,
            color: "bg-blue-50 border-blue-200",
            hoverColor: "hover:bg-blue-100",
            iconBg: "bg-blue-100",
            subOptions: [
                { id: 1, title: "Première année", icon: <ChevronRight size={16} /> },
                { id: 2, title: "Deuxième année", icon: <ChevronRight size={16} /> },
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
            subOptions: [],
        },
    ];

    const handleSubOptionClick = (subOptionId) => {
        switch (subOptionId) {
            case 1:
                navigate("/dashboard/premiere_annee");
                break;
            case 2:
                navigate("/dashboard/deuxieme_annee");
                break;
            default:
                navigate("/dashboard/premiere_annee");
                break;
        }
    };

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">Tableau de Bord</h1>
                    <p className="text-slate-600">Gérez les notes et les performances des étudiants</p>
                </div>
                
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
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
                                onClick={() =>
                                    setSelectedOption(
                                        selectedOption === option.id
                                            ? null
                                            : option.id
                                    )
                                }
                                className={`w-full p-6 text-left focus:outline-none rounded-xl ${option.hoverColor}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className={`flex items-center justify-center w-12 h-12 rounded-full ${option.iconBg}`}>
                                            {typeof option.icon === 'string' ? (
                                                <span className="text-2xl">{option.icon}</span>
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
                                    {option.subOptions.length > 0 && (
                                        <ChevronDown 
                                            className={`text-slate-500 transition-transform duration-300 ${
                                                selectedOption === option.id ? "rotate-180" : ""
                                            }`}
                                            size={20}
                                        />
                                    )}
                                </div>
                            </motion.button>

                            {selectedOption === option.id &&
                                option.subOptions.length > 0 && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="border-t border-slate-200"
                                    >
                                        <div className="p-4 space-y-1">
                                            {option.subOptions.map(
                                                (subOption) => (
                                                    <motion.button
                                                        key={subOption.id}
                                                        whileHover={{ x: 5 }}
                                                        onClick={() =>
                                                            handleSubOptionClick(
                                                                subOption.id
                                                            )
                                                        }
                                                        className="w-full px-4 py-3 text-left hover:bg-slate-100 rounded-lg transition-colors duration-200 flex items-center justify-between"
                                                    >
                                                        <span className="text-slate-700 font-medium">
                                                            {subOption.title}
                                                        </span>
                                                        {subOption.icon}
                                                    </motion.button>
                                                )
                                            )}
                                        </div>
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
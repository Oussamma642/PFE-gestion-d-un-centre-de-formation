import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const WorkingDirectory = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const navigate = useNavigate();

    const options = [
        {
            id: 1,
            title: "Saisir les notes pour la classe: ",
            icon: "📝",
            subOptions: [
                { id: 1, title: "De la première année" },
                { id: 2, title: "De la deuxième année" },
            ],
        },
        {
            id: 2,
            title: "Affichage",
            icon: "📊",
            subOptions: [],
        },
    ];

    const handleSubOptionClick = (subOptionId) => {
        if (subOptionId === 1) {
            navigate("/dashboard");
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {options.map((option) => (
                        <motion.div
                            key={option.id}
                            variants={itemVariants}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-200"
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
                                className="w-full p-6 text-left focus:outline-none"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <span className="text-3xl">
                                            {option.icon}
                                        </span>
                                        <div>
                                            <h2 className="text-xl font-semibold text-slate-800">
                                                {option.title}
                                            </h2>
                                            {option.subOptions.length > 0 && (
                                                <p className="text-sm text-slate-500 mt-1">
                                                    {option.subOptions.length}{" "}
                                                    sous-option
                                                    {option.subOptions.length >
                                                    1
                                                        ? "s"
                                                        : ""}{" "}
                                                    disponibles
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {option.subOptions.length > 0 && (
                                        <span
                                            className={`text-slate-400 transform transition-transform duration-150 ${
                                                selectedOption === option.id
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                        >
                                            ▼
                                        </span>
                                    )}
                                </div>
                            </motion.button>

                            {selectedOption === option.id &&
                                option.subOptions.length > 0 && (
                                    <div className="border-t border-slate-100">
                                        <div className="p-4 space-y-2">
                                            {option.subOptions.map(
                                                (subOption) => (
                                                    <button
                                                        key={subOption.id}
                                                        onClick={() =>
                                                            handleSubOptionClick(
                                                                subOption.id
                                                            )
                                                        }
                                                        className="w-full px-4 py-2 text-left hover:bg-slate-50 rounded-lg transition-colors duration-200"
                                                    >
                                                        <span className="text-slate-700">
                                                            {subOption.title}
                                                        </span>
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default WorkingDirectory;

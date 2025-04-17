import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Students } from "../assets/students";
import axiosClient from "../axios-client";
import {
    Book,
    Calendar,
    FileText,
    User,
    Download,
    Edit,
    Trash2,
    ChevronDown,
    ChevronRight,
    Briefcase,
} from "lucide-react";
import ModuleInfos from "../pages/ModuleInfos";
import SideBar from "../pages/SideBar";

function Dashboard() {
    const { annee } = useParams();
    const [modules, setModules] = useState([]);
    const [selectedModule, setSelectedModule] = useState(null);
    const [activeTab, setActiveTab] = useState("notes");
    const [loading, setLoading] = useState(true);
    const [students] = useState(Students);
    const [marsSemesterModules, setMarsSemesterModules] = useState([]);
    const [juilletSemesterModules, setJuilletSemesterModules] = useState([]);

    // Fetch modules based on the year (annee)
    useEffect(() => {
        const fetchModules = async () => {
            setLoading(true);
            try {
                const response = await axiosClient.get(
                    `/modules/annee/${annee}`
                );
                console.log(response.data);
                // Make sure modules is always an array
                const modulesData = Array.isArray(response.data)
                    ? response.data
                    : [];
                // Filter modules by semester
                setMarsSemesterModules(
                    modulesData.filter((module) => module.semestre === "Mars")
                );
                setJuilletSemesterModules(
                    modulesData.filter(
                        (module) => module.semestre === "Juillet"
                    )
                );

                // Set the first module as selected by default if available
                if (modulesData.length > 0) {
                    setSelectedModule(modulesData[0]);
                }
            } catch (error) {
                console.error("Error fetching modules:", error);
                // Initialize with empty arrays in case of error
                setModules([]);
                setMarsSemesterModules([]);
                setJuilletSemesterModules([]);
            } finally {
                setLoading(false);
            }
        };

        fetchModules();
    }, [annee]);

    // Calculate average grade for a student
    const calculateAverage = (student) => {
        const cc = student.note_cc * 0.3 || 0;
        const tp = student.note_tp * 0.2 || 0;
        const exam = student.note_exam * 0.5 || 0;
        return (cc + tp + exam).toFixed(2);
    };


    // Determine the year display text
    const yearDisplayText =
        annee === "première_annee" ? "Première Année" : "Deuxième Année";

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-2xl font-bold text-gray-900">
                            {yearDisplayText} - Gestion des Notes
                        </h1>
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-600">
                                Année Scolaire:{" "}
                                {selectedModule?.annee_scolaire || "N/A"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar with semesters and modules */}

                    <SideBar
                        setSelectedModule={setSelectedModule}
                        selectedModule={selectedModule}
                        marsSemesterModules={marsSemesterModules}
                        juilletSemesterModules={juilletSemesterModules}
                    />

                    {/* Main content area */}
                    <div className="lg:col-span-3">
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        ) : selectedModule ? (
                            <>
                                {/* Module information card */}
                                <ModuleInfos
                                    libelle={selectedModule.libelle}
                                    semestre={selectedModule.semestre}
                                    masse_horaire={selectedModule.masse_horaire}
                                    annee_scolaire={
                                        selectedModule.annee_scolaire
                                    }
                                    coefficient={selectedModule.coefficient}
                                />
                                {/* Tabs */}
                            </>
                        ) : (
                            <div className="bg-white rounded-lg shadow p-8 text-center">
                                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                    <Book className="h-8 w-8 text-blue-500" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-1">
                                    Aucun module sélectionné
                                </h3>
                                <p className="text-gray-500">
                                    Veuillez sélectionner un module dans la
                                    liste à gauche pour afficher ses détails et
                                    les notes des étudiants.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

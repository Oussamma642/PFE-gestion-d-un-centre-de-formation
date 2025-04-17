import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Students } from "../assets/students";
import axiosClient from "../axios-client";
import { Book, Calendar, FileText, User, Download, Edit, Trash2, ChevronDown, ChevronRight, Briefcase } from "lucide-react";

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
        const response = await axiosClient.get(`/modules/annee/${annee}`);
        console.log(response.data);
        // Make sure modules is always an array
        const modulesData = Array.isArray(response.data) ? response.data : [];
        // Filter modules by semester
        setMarsSemesterModules(modulesData.filter(module => module.semestre === "Mars"));
        setJuilletSemesterModules(modulesData.filter(module => module.semestre === "Juillet"));
        
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
    const cc = (student.note_cc * 0.3) || 0;
    const tp = (student.note_tp * 0.2) || 0;
    const exam = (student.note_exam * 0.5) || 0;
    return (cc + tp + exam).toFixed(2);
  };

  // Handle module selection
  const handleModuleSelect = (module) => {
    setSelectedModule(module);
  };

  // Determine the year display text
  const yearDisplayText = annee === "première_annee" ? "Première Année" : "Deuxième Année";

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
              <span className="text-gray-600">Année Scolaire: {selectedModule?.annee_scolaire || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with semesters and modules */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 bg-blue-50 border-b border-blue-100">
                <h2 className="text-lg font-semibold text-blue-800 flex items-center">
                  <Briefcase size={20} className="mr-2" />
                  Modules
                </h2>
              </div>

              {/* Semestre Mars */}
              <div className="border-b">
                <button 
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <Calendar className="text-blue-600 mr-3" size={18} />
                    <span className="font-medium text-gray-700">Semestre Mars</span>
                  </div>
                  <ChevronDown className="text-gray-400" size={18} />
                </button>

                <div className="pl-2">
                  {marsSemesterModules.length > 0 ? (
                    marsSemesterModules.map((module) => (
                      <button
                        key={module.id}
                        onClick={() => handleModuleSelect(module)}
                        className={`w-full text-left px-4 py-3 flex items-center ${
                          selectedModule?.id === module.id
                            ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <Book size={16} className="mr-2 text-gray-500" />
                        <div className="ml-1">
                          <p className="font-medium">{module.libelle}</p>
                          <p className="text-xs text-gray-500">Coef: {module.coefficient} | {module.masse_horaire}h</p>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-6 py-4 text-sm text-gray-500 italic">
                      Aucun module trouvé
                    </div>
                  )}
                </div>
              </div>

              {/* Semestre Juillet */}
              <div>
                <button 
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <Calendar className="text-green-600 mr-3" size={18} />
                    <span className="font-medium text-gray-700">Semestre Juillet</span>
                  </div>
                  <ChevronDown className="text-gray-400" size={18} />
                </button>

                <div className="pl-2">
                  {juilletSemesterModules.length > 0 ? (
                    juilletSemesterModules.map((module) => (
                      <button
                        key={module.id}
                        onClick={() => handleModuleSelect(module)}
                        className={`w-full text-left px-4 py-3 flex items-center ${
                          selectedModule?.id === module.id
                            ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <Book size={16} className="mr-2 text-gray-500" />
                        <div className="ml-1">
                          <p className="font-medium">{module.libelle}</p>
                          <p className="text-xs text-gray-500">Coef: {module.coefficient} | {module.masse_horaire}h</p>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-6 py-4 text-sm text-gray-500 italic">
                      Aucun module trouvé
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main content area */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : selectedModule ? (
              <>
                {/* Module information card */}
                <div className="bg-white rounded-lg shadow mb-6">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-3 rounded-lg mr-4">
                          <Book className="text-blue-600" size={24} />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-800">{selectedModule.libelle}</h2>
                          <p className="text-gray-500">Semestre {selectedModule.semestre}</p>
                        </div>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center transition-colors">
                        <Download size={16} className="mr-2" />
                        Exporter
                      </button>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500">Coefficient</p>
                        <p className="text-lg font-semibold">{selectedModule.coefficient}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500">Masse Horaire</p>
                        <p className="text-lg font-semibold">{selectedModule.masse_horaire}h</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500">Semestre</p>
                        <p className="text-lg font-semibold">{selectedModule.semestre}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500">Année Scolaire</p>
                        <p className="text-lg font-semibold">{selectedModule.annee_scolaire}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="border-b border-gray-200">
                    <nav className="flex -mb-px">
                      <button
                        onClick={() => setActiveTab("notes")}
                        className={`py-4 px-6 font-medium text-sm border-b-2 ${
                          activeTab === "notes"
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Notes des étudiants
                      </button>
                      <button
                        onClick={() => setActiveTab("stats")}
                        className={`py-4 px-6 font-medium text-sm border-b-2 ${
                          activeTab === "stats"
                            ? "border-blue-500 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        Statistiques
                      </button>
                    </nav>
                  </div>

                  {/* Notes Tab Content */}
                  {activeTab === "notes" && (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Code
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Étudiant
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              CC (30%)
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              TP (20%)
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Examen (50%)
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Moyenne
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {students.map((student) => {
                            const average = calculateAverage(student);
                            let statusColor;
                            
                            if (average >= 16) statusColor = "text-green-600 bg-green-50";
                            else if (average >= 14) statusColor = "text-blue-600 bg-blue-50";
                            else if (average >= 10) statusColor = "text-yellow-600 bg-yellow-50";
                            else statusColor = "text-red-600 bg-red-50";
                            
                            return (
                              <tr key={student.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {student.code}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                                      <User className="h-4 w-4 text-gray-500" />
                                    </div>
                                    <div className="ml-3">
                                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {student.note_cc}/20
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {student.note_tp}/20
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {student.note_exam}/20
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${statusColor}`}>
                                    {average}/20
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <div className="flex space-x-2">
                                    <button className="text-blue-600 hover:text-blue-900 flex items-center">
                                      <Edit size={16} className="mr-1" />
                                      <span>Modifier</span>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Stats Tab Content */}
                  {activeTab === "stats" && (
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Distribution des notes</h3>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>≥ 16/20</span>
                                <span>{students.filter(s => calculateAverage(s) >= 16).length} étudiants</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-500 h-2 rounded-full" 
                                  style={{width: `${(students.filter(s => calculateAverage(s) >= 16).length / students.length) * 100}%`}}
                                ></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>14-16/20</span>
                                <span>{students.filter(s => calculateAverage(s) >= 14 && calculateAverage(s) < 16).length} étudiants</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full" 
                                  style={{width: `${(students.filter(s => calculateAverage(s) >= 14 && calculateAverage(s) < 16).length / students.length) * 100}%`}}
                                ></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>10-14/20</span>
                                <span>{students.filter(s => calculateAverage(s) >= 10 && calculateAverage(s) < 14).length} étudiants</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-yellow-500 h-2 rounded-full" 
                                  style={{width: `${(students.filter(s => calculateAverage(s) >= 10 && calculateAverage(s) < 14).length / students.length) * 100}%`}}
                                ></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span> 10/20</span>
                                <span>{students.filter(s => calculateAverage(s) < 10).length} étudiants</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-red-500 h-2 rounded-full" 
                                  style={{width: `${(students.filter(s => calculateAverage(s) < 10).length / students.length) * 100}%`}}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white p-6 rounded-lg border border-gray-200">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Résumé du module</h3>
                          <div className="space-y-4">
                            <div className="flex justify-between pb-2 border-b border-gray-100">
                              <span className="text-gray-600">Moyenne de la classe</span>
                              <span className="font-medium">{(students.reduce((acc, student) => acc + parseFloat(calculateAverage(student)), 0) / students.length).toFixed(2)}/20</span>
                            </div>
                            <div className="flex justify-between pb-2 border-b border-gray-100">
                              <span className="text-gray-600">Note la plus élevée</span>
                              <span className="font-medium">{Math.max(...students.map(s => calculateAverage(s)))}/20</span>
                            </div>
                            <div className="flex justify-between pb-2 border-b border-gray-100">
                              <span className="text-gray-600">Note la plus basse</span>
                              <span className="font-medium">{Math.min(...students.map(s => calculateAverage(s)))}/20</span>
                            </div>
                            <div className="flex justify-between pb-2 border-b border-gray-100">
                              <span className="text-gray-600">Taux de réussite</span>
                              <span className="font-medium">{((students.filter(s => calculateAverage(s) >= 10).length / students.length) * 100).toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Nombre d'étudiants</span>
                              <span className="font-medium">{students.length}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Book className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Aucun module sélectionné</h3>
                <p className="text-gray-500">
                  Veuillez sélectionner un module dans la liste à gauche pour afficher ses détails et les notes des étudiants.
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
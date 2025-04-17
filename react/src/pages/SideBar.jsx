import React, { useEffect, useState } from "react";
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

export default function SideBar({
    marsSemesterModules,
    juilletSemesterModules,
    setSelectedModule,
    selectedModule,
}) {
    const handleModuleSelect = (module) => {
        setSelectedModule(module);
    };

    return (
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
                    <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="flex items-center">
                            <Calendar
                                className="text-blue-600 mr-3"
                                size={18}
                            />
                            <span className="font-medium text-gray-700">
                                Semestre Mars
                            </span>
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
                                    <Book
                                        size={16}
                                        className="mr-2 text-gray-500"
                                    />
                                    <div className="ml-1">
                                        <p className="font-medium">
                                            {module.libelle}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Coef: {module.coefficient} |{" "}
                                            {module.masse_horaire}h
                                        </p>
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
                    <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="flex items-center">
                            <Calendar
                                className="text-green-600 mr-3"
                                size={18}
                            />
                            <span className="font-medium text-gray-700">
                                Semestre Juillet
                            </span>
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
                                    <Book
                                        size={16}
                                        className="mr-2 text-gray-500"
                                    />
                                    <div className="ml-1">
                                        <p className="font-medium">
                                            {module.libelle}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Coef: {module.coefficient} |{" "}
                                            {module.masse_horaire}h
                                        </p>
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
    );
}

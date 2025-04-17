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

export default function ModuleInfos({libelle, semestre,coefficient, masse_horaire, annee_scolaire}) {
    return (
        <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <div className="bg-blue-100 p-3 rounded-lg mr-4">
                            <Book className="text-blue-600" size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                {libelle}
                            </h2>
                            <p className="text-gray-500">
                                Semestre {semestre}
                            </p>
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
                        <p className="text-lg font-semibold">
                            {coefficient}
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500">Masse Horaire</p>
                        <p className="text-lg font-semibold">
                            {masse_horaire}h
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500">Semestre</p>
                        <p className="text-lg font-semibold">
                            {semestre}
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500">Année Scolaire</p>
                        <p className="text-lg font-semibold">
                            {annee_scolaire}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

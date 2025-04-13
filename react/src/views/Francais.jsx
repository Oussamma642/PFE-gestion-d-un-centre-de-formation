import React, { useState } from "react";

export default function Francais() {
    const [students] = useState([
        {
            id: 1,
            name: "Jean Dupont",
            code: "ETU001",
            note_cc: 15,
            note_tp: 16,
            note_exam: 14,
        },
        {
            id: 2,
            name: "Marie Martin",
            code: "ETU002",
            note_cc: 17,
            note_tp: 15,
            note_exam: 16,
        },
        {
            id: 3,
            name: "Pierre Durant",
            code: "ETU003",
            note_cc: 13,
            note_tp: 14,
            note_exam: 15,
        },
        {
            id: 4,
            name: "Sophie Bernard",
            code: "ETU004",
            note_cc: 16,
            note_tp: 17,
            note_exam: 15,
        },
        {
            id: 5,
            name: "Lucas Petit",
            code: "ETU005",
            note_cc: 14,
            note_tp: 15,
            note_exam: 16,
        },
    ]);

    const calculateAverage = (cc, tp, exam) => {
        return (cc * 0.3 + tp * 0.2 + exam * 0.5).toFixed(2);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                    Notes du Module : Français
                </h2>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                        Ajouter une note
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Code
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Nom Complet
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Note CC (30%)
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Note TP (20%)
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Note Examen (50%)
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Moyenne
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {student.code}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {student.name}
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
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                    {calculateAverage(
                                        student.note_cc,
                                        student.note_tp,
                                        student.note_exam
                                    )}
                                    /20
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex space-x-2">
                                        <button className="text-blue-600 hover:text-blue-900">
                                            Modifier
                                        </button>
                                        <button className="text-red-600 hover:text-red-900">
                                            Supprimer
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

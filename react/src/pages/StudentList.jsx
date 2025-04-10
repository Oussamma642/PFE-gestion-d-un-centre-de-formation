// src/StudentList.js
import React from 'react';

const StudentList = () => {
    const students = [
        { code: 'DB01-16', title: 'M.', firstName: 'BENHROU MUSTAPHA', lastName: '' },
        { code: 'DB02-16', title: 'Mile.', firstName: 'BADDOU NADIA', lastName: '' },
        { code: 'DB03-16', title: 'M.', firstName: 'BEN SAID AHMED', lastName: '' },
        { code: 'DB04-16', title: 'M.', firstName: 'TELLIRINE CHARAF EDDINE', lastName: '' },
        { code: 'DB05-16', title: 'M.', firstName: 'CHAIKH KARIM', lastName: '' },
    ];

    return (
        <div>
            <h1>ETAT DES INSCRITS POUR L'ANNEE DE FORMATION 2011/2013</h1>
            <table>
                <thead>
                    <tr>
                        <th>Code inscription</th>
                        <th>TITRE</th>
                        <th>Prénom</th>
                        <th>NOM</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td>{student.code}</td>
                            <td>{student.title}</td>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;
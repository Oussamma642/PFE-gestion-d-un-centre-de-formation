

import React from 'react'
function StudentInfos({nom, prenom, filiere, niveau, promotion, anneeFormation}) {
  return (
    <table className="w-full border-collapse border border-gray-300 mb-6">
    <tbody>
      <tr>
        <td className="border border-gray-300 p-2 w-1/3 font-bold">Prénom et nom du stagiaire</td>
        <td className="border border-gray-300 p-2">: {nom} {prenom}</td>
      </tr>
      <tr>
        <td className="border border-gray-300 p-2 font-bold">Filière</td>
        <td className="border border-gray-300 p-2">: {filiere}</td>
      </tr>
      <tr>
        <td className="border border-gray-300 p-2 font-bold">Niveau</td>
        <td className="border border-gray-300 p-2">: {niveau}</td>
      </tr>
      <tr>
        <td className="border border-gray-300 p-2 font-bold">Promotion</td>
        <td className="border border-gray-300 p-2">: {promotion}</td>
      </tr>
      <tr>
        <td className="border border-gray-300 p-2 font-bold">Année de formation</td>
        <td className="border border-gray-300 p-2">: {anneeFormation === "premiere_annee"? promotion.split('-')[0] : promotion.split('-')[1]}</td>
      </tr>
    </tbody>
  </table>

  )
}

export default StudentInfos

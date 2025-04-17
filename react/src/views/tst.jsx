import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GradeEntrySystem = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState('');
  const [schoolYear, setSchoolYear] = useState('2024-2025');
  const [numberOfExams, setNumberOfExams] = useState(3);
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState({});
  const [message, setMessage] = useState({ type: '', text: '' });

  // Fetch modules when component mounts
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get('/api/modules');
        setModules(response.data);
        setLoading(false);
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to load modules' });
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  // Fetch students when module is selected
  useEffect(() => {
    if (!selectedModule) return;

    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/modules/${selectedModule}/students`);
        setStudents(response.data);
        
        // Initialize grades structure
        const initialGrades = {};
        response.data.forEach(student => {
          initialGrades[student.id] = {};
          for (let i = 1; i <= numberOfExams; i++) {
            initialGrades[student.id][i] = '';
          }
        });
        setGrades(initialGrades);
        setLoading(false);
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to load students' });
        setLoading(false);
      }
    };

    fetchStudents();
  }, [selectedModule, numberOfExams]);

  // Handle grade change
  const handleGradeChange = (studentId, examNumber, value) => {
    // Only allow numbers and decimal point
    if (value !== '' && !/^\d*\.?\d{0,2}$/.test(value)) return;
    
    // Check if grade is within valid range (0-20)
    if (value !== '' && (parseFloat(value) < 0 || parseFloat(value) > 20)) return;
    
    setGrades(prevGrades => ({
      ...prevGrades,
      [studentId]: {
        ...prevGrades[studentId],
        [examNumber]: value
      }
    }));
  };

  // Submit grades
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Format data for API
      const gradesData = [];
      Object.keys(grades).forEach(studentId => {
        Object.keys(grades[studentId]).forEach(examNumber => {
          if (grades[studentId][examNumber] !== '') {
            gradesData.push({
              etudiant_id: parseInt(studentId),
              module_id: parseInt(selectedModule),
              numero_controle: parseInt(examNumber),
              note: parseFloat(grades[studentId][examNumber]),
              annee_scolaire: schoolYear
            });
          }
        });
      });
      
      await axios.post('/api/controles/batch', { grades: gradesData });
      setMessage({ type: 'success', text: 'Grades saved successfully!' });
      setSaving(false);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save grades' });
      setSaving(false);
    }
  };

  // Generate exam columns
  const renderExamColumns = () => {
    const columns = [];
    for (let i = 1; i <= numberOfExams; i++) {
      columns.push(
        <th key={i} className="px-4 py-2 text-center">
          Exam {i}
        </th>
      );
    }
    return columns;
  };

  // Handle module change
  const handleModuleChange = (e) => {
    setSelectedModule(e.target.value);
    setGrades({});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Grade Entry System</h1>
      
      {message.text && (
        <div className={`p-4 mb-4 rounded ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message.text}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Module
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={selectedModule}
              onChange={handleModuleChange}
              disabled={loading}
            >
              <option value="">Select a module</option>
              {modules.map(module => (
                <option key={module.id} value={module.id}>
                  {module.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              School Year
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={schoolYear}
              onChange={(e) => setSchoolYear(e.target.value)}
              placeholder="e.g. 2024-2025"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Exams
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={numberOfExams}
              onChange={(e) => setNumberOfExams(parseInt(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {selectedModule && !loading ? (
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Student ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Student Name
                    </th>
                    {renderExamColumns()}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.length > 0 ? (
                    students.map(student => (
                      <tr key={student.id}>
                        <td className="px-4 py-2">{student.id}</td>
                        <td className="px-4 py-2">{student.nom} {student.prenom}</td>
                        {Array.from({ length: numberOfExams }, (_, i) => i + 1).map(examNumber => (
                          <td key={examNumber} className="px-4 py-2">
                            <input
                              type="text"
                              className="w-full text-center border border-gray-300 rounded-md px-2 py-1"
                              value={grades[student.id]?.[examNumber] || ''}
                              onChange={(e) => handleGradeChange(student.id, examNumber, e.target.value)}
                              placeholder="0-20"
                            />
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={numberOfExams + 2} className="px-4 py-2 text-center text-gray-500">
                        No students found for this module
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md"
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save All Grades'}
              </button>
            </div>
          </div>
        </form>
      ) : selectedModule && loading ? (
        <div className="text-center py-8">Loading students...</div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
          Please select a module to start entering grades
        </div>
      )}
    </div>
  );
};

export default GradeEntrySystem;
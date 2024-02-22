import React, { useEffect, useState } from 'react';

const Listcompo = () => {
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTeachers = async () => {
        try {
            const response = await fetch('http://localhost:5000/teachers');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setTeachers(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchStudents = async () => {
        try {
            const response = await fetch('http://localhost:5000/students');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchSubjects = async () => {
        try {
            const response = await fetch('http://localhost:5000/subjects');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setSubjects(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTeachers();
        fetchStudents();
        fetchSubjects();
    }, []);

    return (
        <div className="container mx-auto">
            <div>
                <h1 className="text-2xl font-bold mb-4">รายชื่อครู</h1>
                {isLoading && <p>กำลังโหลดข้อมูลครู...</p>}
                {error && <p>เกิดข้อผิดพลาดในการโหลดข้อมูลครู: {error}</p>}
                <div className="grid grid-cols-4 gap-4">
                    {teachers.map(teacher => (
                        <div key={teacher.id} className="bg-gray-200 p-4 rounded-lg border border-gray-300 text-black">
                            <p className="font-bold">{teacher.FirstName} {teacher.LastName}</p>
                            <p className="text-gray-600">อายุ: {teacher.Age}</p>
                            <p className="text-gray-600">วิชาที่สอน: {teacher.TeachingSubject}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h1 className="text-2xl font-bold my-4">รายชื่อนักเรียน</h1>
                {isLoading && <p>กำลังโหลดข้อมูลนักเรียน...</p>}
                {error && <p>เกิดข้อผิดพลาดในการโหลดข้อมูลนักเรียน: {error}</p>}
                <div className="divide-y divide-gray-200">
                    {students.map(student => (
                        <div key={student.id} className="py-4 border-b border-gray-300 text-white">
                            <p className="font-bold">{student.FirstName} {student.LastName}</p>
                            <p className="text-gray-300">อายุ: {student.Age}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h1 className="text-2xl font-bold my-4">รายชื่อวิชา</h1>
                {isLoading && <p>กำลังโหลดข้อมูลวิชา...</p>}
                {error && <p>เกิดข้อผิดพลาดในการโหลดข้อมูลวิชา: {error}</p>}
                <div className="grid grid-cols-3 gap-4">
                    {subjects.map(subject => (
                        <div key={subject.id} className="bg-gray-200 p-4 rounded-lg border border-gray-300 text-black">
                            <p className="font-bold">{subject.Name}</p>
                            <p className="text-gray-600">{subject.Description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Listcompo;

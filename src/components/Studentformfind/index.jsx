import React, { useEffect, useState } from 'react';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleEditStudent = (id) => {
        console.log('กำลังแก้ไขนักเรียน รหัส:', id);
    };

    const handleDeleteStudent = (id) => {
        console.log('กำลังลบนักเรียน รหัส:', id);
    };

    const handleCreateStudent = () => {
        console.log('กำลังเพิ่มนักเรียนใหม่');
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">ตารางข้อมูลนักเรียน</h1>
            <div className="flex justify-between items-center mb-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleCreateStudent}>
                    เพิ่มนักเรียน
                </button>
            </div>
            {isLoading && <p>กำลังโหลด...</p>}
            {error && <p>เกิดข้อผิดพลาด: {error}</p>}
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">ชื่อ</th>
                        <th className="border px-4 py-2">นามสกุล</th>
                        <th className="border px-4 py-2">อายุ</th>
                        <th className="border px-4 py-2">การดำเนินการ</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td className="border px-4 py-2">{student.FirstName}</td>
                            <td className="border px-4 py-2">{student.LastName}</td>
                            <td className="border px-4 py-2">{student.Age}</td>
                            <td className="border px-4 py-2">
                                <button className="mr-2 bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => handleEditStudent(student.id)}>
                                    แก้ไข
                                </button>
                                <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => handleDeleteStudent(student.id)}>
                                    ลบ
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentList;

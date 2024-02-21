import React, { useEffect, useState } from 'react';

const TeachersList = () => {
    const [teachers, setTeachers] = useState([]);
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

    useEffect(() => {
        fetchTeachers();
    }, []);

    const handleEditTeacher = (id) => {
        // จัดการตรวจสอบแก้ไขข้อมูลครูที่นี่
        console.log('กำลังแก้ไขข้อมูลครู รหัส:', id);
    };

    const handleDeleteTeacher = (id) => {
        // จัดการตรวจสอบการลบข้อมูลครูที่นี่
        console.log('กำลังลบข้อมูลครู รหัส:', id);
    };

    const handleCreateTeacher = () => {
        // จัดการตรวจสอบการสร้างข้อมูลครูที่นี่
        console.log('กำลังสร้างข้อมูลครู');
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">ตารางข้อมูลครู</h1>
            <div className="flex justify-between items-center mb-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleCreateTeacher}>
                    เพิ่มครู
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
                        <th className="border px-4 py-2">วิชาที่สอน</th>
                        <th className="border px-4 py-2">การดำเนินการ</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map(teacher => (
                        <tr key={teacher.id}>
                            <td className="border px-4 py-2">{teacher.FirstName}</td>
                            <td className="border px-4 py-2">{teacher.LastName}</td>
                            <td className="border px-4 py-2">{teacher.Age}</td>
                            <td className="border px-4 py-2">{teacher.TeachingSubject}</td>
                            <td className="border px-4 py-2">
                                <button className="mr-2 bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => handleEditTeacher(teacher.id)}>
                                    แก้ไข
                                </button>
                                <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => handleDeleteTeacher(teacher.id)}>
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

export default TeachersList;

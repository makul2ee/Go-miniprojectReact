import React, { useEffect, useState } from 'react';

const SubjectList = () => {
    const [subjects, setSubjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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
        fetchSubjects();
    }, []);

    const handleEditSubject = (id) => {
        console.log('กำลังแก้ไขข้อมูลวิชา รหัส:', id);
    };

    const handleDeleteSubject = (id) => {
        console.log('กำลังลบข้อมูลวิชา รหัส:', id);
    };

    const handleCreateSubject = () => {
        console.log('กำลังสร้างข้อมูลวิชา');
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">ตารางข้อมูลวิชา</h1>
            <div className="flex justify-between items-center mb-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleCreateSubject}>
                    เพิ่มวิชา
                </button>
            </div>
            {isLoading && <p>กำลังโหลด...</p>}
            {error && <p>เกิดข้อผิดพลาด: {error}</p>}
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">ชื่อ</th>
                        <th className="border px-4 py-2">คำอธิบาย</th>
                        <th className="border px-4 py-2">การดำเนินการ</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map(subject => (
                        <tr key={subject.id}>
                            <td className="border px-4 py-2">{subject.Name}</td>
                            <td className="border px-4 py-2">{subject.Description}</td>
                            <td className="border px-4 py-2">
                                <button className="mr-2 bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => handleEditSubject(subject.id)}>
                                    แก้ไข
                                </button>
                                <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => handleDeleteSubject(subject.id)}>
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

export default SubjectList;

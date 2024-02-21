import React, { useState, useEffect } from 'react';

const Teacher = ({ id }) => {
    const [teacher, setTeacher] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const response = await fetch(`http://localhost:5000/teachers/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setTeacher(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTeacher();
    }, [id]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading teacher: {error}</p>;
    if (!teacher) return <p>No teacher found for ID {id}</p>;

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">Teacher Details</h2>
            <table className="table-auto">
                <tbody>
                    <tr>
                        <td className="font-semibold">ID:</td>
                        <td>{teacher.ID}</td>
                    </tr>
                    <tr>
                        <td className="font-semibold">First Name:</td>
                        <td>{teacher.FirstName}</td>
                    </tr>
                    <tr>
                        <td className="font-semibold">Last Name:</td>
                        <td>{teacher.LastName}</td>
                    </tr>
                    <tr>
                        <td className="font-semibold">Age:</td>
                        <td>{teacher.Age}</td>
                    </tr>
                    <tr>
                        <td className="font-semibold">Teaching Subject:</td>
                        <td>{teacher.TeachingSubject}</td>
                    </tr>
                    {/* Add additional rows for other teacher properties as needed */}
                </tbody>
            </table>
        </div>
    );
};

export default Teacher;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const StudentTable = () => {
    const [students, setStudents] = useState([]);

    const getStudents = async () => {
        const res = await axios.get("http://localhost:5000/api/students");
        setStudents(res.data);
    };

    const deleteStudent = async (id) => {
        await axios.delete(`http://localhost:5000/api/students/${id}`);
        getStudents();
    };

    useEffect(() => {
        getStudents();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-blue-600">Student Records</h2>
                    <Link
                        to="/add"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        + Add Student
                    </Link>
                </div>

                {students.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="border p-2">#</th>
                                    <th className="border p-2">Full Name</th>
                                    <th className="border p-2">Email</th>
                                    <th className="border p-2">Contact</th>
                                    <th className="border p-2">Course</th>
                                    <th className="border p-2">Batch Code</th>
                                    <th className="border p-2">Joining Date</th>
                                    <th className="border p-2">Remarks</th>
                                    <th className="border p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((s, i) => (
                                    <tr
                                        key={s._id}
                                        className="hover:bg-blue-50 transition border-t text-center"
                                    >
                                        <td className="p-2">{i + 1}</td>
                                        <td className="p-2">{s.fullName}</td>
                                        <td className="p-2">{s.email}</td>
                                        <td className="p-2">{s.contact}</td>
                                        <td className="p-2">{s.course}</td>
                                        <td className="p-2">{s.batchCode}</td>
                                        <td className="p-2">
                                            {new Date(s.joiningDate).toLocaleDateString("en-GB")}
                                        </td>
                                        <td className="p-2">{s.remarks || "-"}</td>
                                        <td className="p-2 space-x-2">
                                            <Link
                                                to={`/edit/${s._id}`}
                                                className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => deleteStudent(s._id)}
                                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 mt-6">
                        No student records found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default StudentTable;

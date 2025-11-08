import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        contact: "",
        course: "",
        batchCode: "",
        joiningDate: "",
        remarks: "",
    });

    useEffect(() => {
        axios.get(`http://localhost:5000/api/students/${id}`)
            .then((res) => {
                const student = res.data;

                // Format joiningDate to yyyy-MM-dd
                if (student.joiningDate) {
                    student.joiningDate = student.joiningDate.split("T")[0];
                }

                setFormData(student);
            })
            .catch((err) => {
                console.error("Error fetching student:", err);
            });
    }, [id]);



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/api/students/${id}`, formData);
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-yellow-600 mb-6 text-center">Edit Student</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                        placeholder="Full Name"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                        placeholder="Email"
                        required
                    />
                    <input
                        type="number"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                        placeholder="Contact Number"
                        required
                    />
                    <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                        required
                    >
                        <option value="">Select Course</option>
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="React">React</option>
                        <option value="Node">Node</option>
                    </select>
                    <input
                        type="text"
                        name="batchCode"
                        value={formData.batchCode}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                        placeholder="Batch Code"
                        required
                    />
                    <input
                        type="date"
                        name="joiningDate"
                        value={formData.joiningDate}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                        required
                    />
                    <textarea
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                        rows="3"
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-yellow-400"
                        placeholder="Remarks"
                    ></textarea>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="w-1/2 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-1/2 bg-yellow-500 text-white font-semibold py-2 rounded-lg hover:bg-yellow-600 transition"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditStudent;

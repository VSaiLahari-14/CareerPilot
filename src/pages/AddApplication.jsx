import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function AddApplication() {

    const navigate = useNavigate();

    const [companyName, setCompanyName] = useState("");
    const [jobRole, setJobRole] = useState("");
    const [applicationDate, setApplicationDate] = useState("");
    const [status, setStatus] = useState("Applied");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("Full Time");
    const [notes, setNotes] = useState("");

    const [message, setMessage] = useState("");


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await API.post(
                "/applications",
                {
                    companyName,
                    jobRole,
                    applicationDate,
                    status,
                    location,
                    jobType,
                    notes
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage(
                "Application added successfully!"
            );

            setTimeout(() => {

                navigate("/applications");

            }, 1000);

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Failed to add application"
            );

        }
    };


    return (

        <div className="add-application-page">

            <div className="form-container">

                <div className="form-header">

                    <div>

                        <h1>
                            Add Job Application
                        </h1>

                        <p>
                            Track a new job opportunity.
                        </p>

                    </div>

                    <Link
                        to="/applications"
                        className="back-button"
                    >
                        ← Back
                    </Link>

                </div>


                {message && (

                    <div className="message">
                        {message}
                    </div>

                )}


                <form onSubmit={handleSubmit}>


                    {/* Company */}

                    <div className="form-group">

                        <label>
                            Company Name *
                        </label>

                        <input
                            type="text"
                            placeholder="e.g. Tata Elxsi"
                            value={companyName}
                            onChange={(e) =>
                                setCompanyName(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* Job Role */}

                    <div className="form-group">

                        <label>
                            Job Role *
                        </label>

                        <input
                            type="text"
                            placeholder="e.g. Software Developer Intern"
                            value={jobRole}
                            onChange={(e) =>
                                setJobRole(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* Date */}

                    <div className="form-group">

                        <label>
                            Application Date *
                        </label>

                        <input
                            type="date"
                            value={applicationDate}
                            onChange={(e) =>
                                setApplicationDate(e.target.value)
                            }
                            required
                        />

                    </div>


                    {/* Status */}

                    <div className="form-group">

                        <label>
                            Status
                        </label>

                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value)
                            }
                        >

                            <option value="Applied">
                                Applied
                            </option>

                            <option value="Shortlisted">
                                Shortlisted
                            </option>

                            <option value="Interview">
                                Interview
                            </option>

                            <option value="Selected">
                                Selected
                            </option>

                            <option value="Rejected">
                                Rejected
                            </option>

                        </select>

                    </div>


                    {/* Location */}

                    <div className="form-group">

                        <label>
                            Location
                        </label>

                        <input
                            type="text"
                            placeholder="e.g. Bengaluru"
                            value={location}
                            onChange={(e) =>
                                setLocation(e.target.value)
                            }
                        />

                    </div>


                    {/* Job Type */}

                    <div className="form-group">

                        <label>
                            Job Type
                        </label>

                        <select
                            value={jobType}
                            onChange={(e) =>
                                setJobType(e.target.value)
                            }
                        >

                            <option value="Full Time">
                                Full Time
                            </option>

                            <option value="Internship">
                                Internship
                            </option>

                            <option value="Part Time">
                                Part Time
                            </option>

                        </select>

                    </div>


                    {/* Notes */}

                    <div className="form-group">

                        <label>
                            Notes
                        </label>

                        <textarea
                            placeholder="Add any notes about this application..."
                            value={notes}
                            onChange={(e) =>
                                setNotes(e.target.value)
                            }
                            rows="5"
                        ></textarea>

                    </div>


                    {/* Submit */}

                    <button
                        type="submit"
                        className="submit-button"
                    >
                        Add Application
                    </button>


                </form>

            </div>

        </div>

    );
}

export default AddApplication;
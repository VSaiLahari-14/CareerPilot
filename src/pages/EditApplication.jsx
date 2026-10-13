import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import API from "../services/api";

function EditApplication() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [companyName, setCompanyName] = useState("");
    const [jobRole, setJobRole] = useState("");
    const [applicationDate, setApplicationDate] = useState("");
    const [status, setStatus] = useState("Applied");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("Full Time");
    const [notes, setNotes] = useState("");

    const [message, setMessage] = useState("");


    useEffect(() => {

        const getApplication = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await API.get(
                    "/applications",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const application =
                    response.data.applications.find(
                        (item) => item._id === id
                    );

                if (!application) {

                    setMessage(
                        "Application not found"
                    );

                    return;
                }

                setCompanyName(
                    application.companyName
                );

                setJobRole(
                    application.jobRole
                );

                setApplicationDate(
                    application.applicationDate
                        .split("T")[0]
                );

                setStatus(
                    application.status
                );

                setLocation(
                    application.location
                );

                setJobType(
                    application.jobType
                );

                setNotes(
                    application.notes
                );

            } catch (error) {

                setMessage(
                    error.response?.data?.message ||
                    "Failed to load application"
                );

            }

        };

        getApplication();

    }, [id]);


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await API.put(
                `/applications/${id}`,
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
                "Application updated successfully!"
            );

            setTimeout(() => {

                navigate("/applications");

            }, 1000);

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Failed to update application"
            );

        }
    };


    return (

        <div className="add-application-page">

            <div className="form-container">

                <div className="form-header">

                    <div>

                        <h1>
                            Edit Job Application
                        </h1>

                        <p>
                            Update your application details.
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

                    <div className="form-group">

                        <label>
                            Company Name *
                        </label>

                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) =>
                                setCompanyName(e.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Job Role *
                        </label>

                        <input
                            type="text"
                            value={jobRole}
                            onChange={(e) =>
                                setJobRole(e.target.value)
                            }
                            required
                        />

                    </div>


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


                    <div className="form-group">

                        <label>
                            Location
                        </label>

                        <input
                            type="text"
                            value={location}
                            onChange={(e) =>
                                setLocation(e.target.value)
                            }
                        />

                    </div>


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


                    <div className="form-group">

                        <label>
                            Notes
                        </label>

                        <textarea
                            value={notes}
                            onChange={(e) =>
                                setNotes(e.target.value)
                            }
                            rows="5"
                        ></textarea>

                    </div>


                    <button
                        type="submit"
                        className="submit-button"
                    >
                        Save Changes
                    </button>

                </form>

            </div>

        </div>

    );
}

export default EditApplication;
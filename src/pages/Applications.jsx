import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Applications() {

    const [applications, setApplications] = useState([]);

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [message, setMessage] = useState("");

    const getApplications = async () => {

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

            setApplications(
                response.data.applications
            );

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Failed to load applications"
            );

        }
    };

    useEffect(() => {
        getApplications();
    }, []);

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this application?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const token = localStorage.getItem("token");

            await API.delete(
                `/applications/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setApplications(
                applications.filter(
                    (application) =>
                        application._id !== id
                )
            );

            setMessage(
                "Application deleted successfully"
            );

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Failed to delete application"
            );

        }
    };

    const filteredApplications = applications.filter(
        (application) => {

            const searchText =
                search.toLowerCase();

            const matchesSearch =
                application.companyName
                    .toLowerCase()
                    .includes(searchText) ||
                application.jobRole
                    .toLowerCase()
                    .includes(searchText);

            const matchesStatus =
                statusFilter === "All" ||
                application.status === statusFilter;

            return matchesSearch && matchesStatus;
        }
    );

    const totalApplications =
        applications.length;

    const interviewApplications =
        applications.filter(
            (application) =>
                application.status === "Interview"
        ).length;

    const selectedApplications =
        applications.filter(
            (application) =>
                application.status === "Selected"
        ).length;

    const rejectedApplications =
        applications.filter(
            (application) =>
                application.status === "Rejected"
        ).length;

    return (
        <div className="applications-page">

            <div className="applications-header">

                <div>
                    <h1>
                        Job Applications
                    </h1>

                    <p>
                        Track and manage your job applications.
                    </p>
                </div>

                <Link
                    to="/applications/add"
                    className="add-button"
                >
                    + Add Application
                </Link>

            </div>

            {message && (
                <div className="message">
                    {message}
                </div>
            )}

            <div className="application-stats">

                <div className="application-stat-card">
                    <h3>Total Applications</h3>
                    <h2>{totalApplications}</h2>
                </div>

                <div className="application-stat-card">
                    <h3>Interviews</h3>
                    <h2>{interviewApplications}</h2>
                </div>

                <div className="application-stat-card">
                    <h3>Selected</h3>
                    <h2>{selectedApplications}</h2>
                </div>

                <div className="application-stat-card">
                    <h3>Rejected</h3>
                    <h2>{rejectedApplications}</h2>
                </div>

            </div>

            <div className="application-filters">

                <input
                    type="text"
                    placeholder="Search company or job role..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(e.target.value)
                    }
                >
                    <option value="All">
                        All Status
                    </option>

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

            <div className="applications-card">

                {filteredApplications.length === 0 ? (

                    <div className="empty-state">

                        <div>
                            📋
                        </div>

                        <h2>
                            No applications found
                        </h2>

                        <p>
                            Try changing your search or filter.
                        </p>

                        <Link
                            to="/applications/add"
                            className="add-button"
                        >
                            + Add Application
                        </Link>

                    </div>

                ) : (

                    <div className="table-container">

                        <table>

                            <thead>

                                <tr>
                                    <th>Company</th>
                                    <th>Job Role</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Type</th>
                                    <th>Actions</th>
                                </tr>

                            </thead>

                            <tbody>

                                {filteredApplications.map(
                                    (application) => (

                                        <tr
                                            key={application._id}
                                        >

                                            <td>
                                                <strong>
                                                    {application.companyName}
                                                </strong>

                                                <small>
                                                    {application.location}
                                                </small>
                                            </td>

                                            <td>
                                                {application.jobRole}
                                            </td>

                                            <td>
                                                {new Date(
                                                    application.applicationDate
                                                ).toLocaleDateString()}
                                            </td>

                                            <td>

                                                <span
                                                    className={
                                                        `application-status ${application.status
                                                            .toLowerCase()
                                                            .replace(" ", "-")}`
                                                    }
                                                >
                                                    {application.status}
                                                </span>

                                            </td>

                                            <td>
                                                {application.jobType}
                                            </td>

                                            <td>

                                                <Link
                                                    to={`/applications/edit/${application._id}`}
                                                    className="edit-button"
                                                >
                                                    ✏️
                                                </Link>

                                                <button
                                                    className="delete-button"
                                                    onClick={() =>
                                                        handleDelete(
                                                            application._id
                                                        )
                                                    }
                                                >
                                                    🗑️
                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Applications;
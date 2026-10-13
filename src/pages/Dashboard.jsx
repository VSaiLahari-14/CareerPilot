import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

    const navigate = useNavigate();

    const [applicationCount, setApplicationCount] = useState(0);
    const [skillCount, setSkillCount] = useState(0);
    const [recentApplications, setRecentApplications] = useState([]);

    const user = JSON.parse(
        localStorage.getItem("user")
    );


    useEffect(() => {

        const getApplicationCount = async () => {

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

                setApplicationCount(
                    response.data.applications.length
                );

                setRecentApplications(
                    response.data.applications.slice(0, 3)
                );

            } catch (error) {

                console.log(
                    "Failed to get application count"
                );

            }

        };


        const getSkillCount = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await API.get(
                    "/skills",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setSkillCount(
                    response.data.skills.length
                );

            } catch (error) {

                console.log(
                    "Failed to load skills"
                );

            }

        };


        getApplicationCount();
        getSkillCount();

    }, []);


    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };


    return (
        <div className="dashboard">

            {/* Sidebar */}

            <aside className="sidebar">

                <h1 className="logo">
                    CareerPilot
                </h1>

                <nav>

                    <Link to="/dashboard">
                        🏠 Dashboard
                    </Link>

                    <Link to="/applications">
                        💼 Applications
                    </Link>

                    <Link to="/skills">
                        🧠 Skills
                    </Link>

                    <Link to="#">
                        📚 Preparation
                    </Link>

                    <Link to="#">
                        💻 Coding Practice
                    </Link>

                    <Link to="#">
                        📅 Interviews
                    </Link>

                    <Link to="#">
                        📄 Resume
                    </Link>

                </nav>

                <div className="sidebar-bottom">

                    <Link to="#">
                        ⚙️ Settings
                    </Link>

                    <button onClick={handleLogout}>
                        🚪 Logout
                    </button>

                </div>

            </aside>


            {/* Main Content */}

            <main className="main-content">

                {/* Top Bar */}

                <header className="topbar">

                    <div>

                        <h2>
                            Dashboard
                        </h2>

                        <p>
                            Track your career journey in one place.
                        </p>

                    </div>

                    <div className="profile">

                        <div className="avatar">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>

                        <div>

                            <strong>
                                {user?.name}
                            </strong>

                            <small>
                                Student
                            </small>

                        </div>

                    </div>

                </header>


                {/* Welcome Section */}

                <section className="welcome">

                    <div>

                        <h1>
                            Good afternoon, {user?.name} 👋
                        </h1>

                        <p>
                            Stay consistent and keep moving toward your career goals.
                        </p>

                    </div>

                    <div className="readiness">

                        <span>
                            Career Readiness
                        </span>

                        <strong>
                            78%
                        </strong>

                    </div>

                </section>


                {/* Statistics */}

                <section className="stats">

                    <div className="stat-card">

                        <span>💼</span>

                        <div>

                            <p>
                                Applications
                            </p>

                            <h2>
                                {applicationCount}
                            </h2>

                        </div>

                    </div>


                    <div className="stat-card">

                        <span>📅</span>

                        <div>

                            <p>
                                Interviews
                            </p>

                            <h2>
                                3
                            </h2>

                        </div>

                    </div>


                    <div className="stat-card">

                        <span>🧠</span>

                        <div>

                            <p>
                                Skills
                            </p>

                            <h2>
                                {skillCount}
                            </h2>

                        </div>

                    </div>


                    <div className="stat-card">

                        <span>💻</span>

                        <div>

                            <p>
                                Coding Solved
                            </p>

                            <h2>
                                45
                            </h2>

                        </div>

                    </div>

                </section>


                {/* Main Grid */}

                <section className="dashboard-grid">


                    {/* Career Readiness */}

                    <div className="card">

                        <div className="card-header">

                            <h2>
                                Career Readiness
                            </h2>

                            <span>
                                78%
                            </span>

                        </div>

                        <div className="progress-bar">

                            <div
                                className="progress"
                                style={{
                                    width: "78%"
                                }}
                            ></div>

                        </div>

                        <p className="card-text">
                            You're making good progress. Improve your
                            coding practice and interview preparation.
                        </p>

                    </div>


                    {/* Preparation */}

                    <div className="card">

                        <div className="card-header">

                            <h2>
                                Preparation Progress
                            </h2>

                            <span>
                                65%
                            </span>

                        </div>

                        <div className="progress-bar">

                            <div
                                className="progress"
                                style={{
                                    width: "65%"
                                }}
                            ></div>

                        </div>

                        <p className="card-text">
                            13 of 20 preparation topics completed.
                        </p>

                    </div>


                    {/* Recent Applications */}

                    <div className="card large-card">

                        <div className="card-header">

                            <h2>
                                Recent Applications
                            </h2>

                            <Link to="/applications">
                                View All
                            </Link>

                        </div>


                        {recentApplications.length === 0 ? (

                            <p className="card-text">
                                No applications yet.
                            </p>

                        ) : (

                            recentApplications.map(
                                (application) => (

                                    <div
                                        className="application"
                                        key={application._id}
                                    >

                                        <div>

                                            <strong>
                                                {application.jobRole}
                                            </strong>

                                            <p>
                                                {application.companyName}
                                            </p>

                                        </div>

                                        <span
                                            className={
                                                `status ${application.status
                                                    .toLowerCase()
                                                    .replace(" ", "-")}`
                                            }
                                        >
                                            {application.status}
                                        </span>

                                    </div>

                                )
                            )

                        )}

                    </div>


                    {/* Upcoming Interviews */}

                    <div className="card">

                        <div className="card-header">

                            <h2>
                                Upcoming Interviews
                            </h2>

                            <Link to="/applications">
                                View All
                            </Link>

                        </div>


                        <div className="interview">

                            <div className="interview-date">

                                <strong>
                                    15
                                </strong>

                                <span>
                                    OCT
                                </span>

                            </div>

                            <div>

                                <strong>
                                    Technical Interview
                                </strong>

                                <p>
                                    Java Developer
                                </p>

                            </div>

                        </div>


                        <div className="interview">

                            <div className="interview-date">

                                <strong>
                                    20
                                </strong>

                                <span>
                                    OCT
                                </span>

                            </div>

                            <div>

                                <strong>
                                    HR Interview
                                </strong>

                                <p>
                                    Software Engineer
                                </p>

                            </div>

                        </div>

                    </div>


                </section>


                {/* AI Recommendation */}

                <section className="ai-card">

                    <div className="ai-icon">
                        🤖
                    </div>

                    <div>

                        <h2>
                            CareerPilot Recommendation
                        </h2>

                        <p>
                            Your career readiness is good, but you can improve
                            your score by solving more coding problems and
                            completing interview preparation topics.
                        </p>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default Dashboard;
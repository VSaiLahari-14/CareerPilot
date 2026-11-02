import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Skills() {

    const [skills, setSkills] = useState([]);

    const [message, setMessage] = useState("");
    const totalSkills = skills.length;

const averageProgress =
    totalSkills === 0
        ? 0
        : Math.round(
            skills.reduce(
                (total, skill) =>
                    total + skill.progress,
                0
            ) / totalSkills
        );

const advancedSkills =
    skills.filter(
        (skill) =>
            skill.level === "Advanced"
    ).length;

const highProgressSkills =
    skills.filter(
        (skill) =>
            skill.progress >= 75
    ).length;

    const getSkills = async () => {

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

            setSkills(
                response.data.skills
            );

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Failed to load skills"
            );

        }
    };

    useEffect(() => {
        getSkills();
    }, []);

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this skill?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const token = localStorage.getItem("token");

            await API.delete(
                `/skills/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setSkills(
                skills.filter(
                    (skill) =>
                        skill._id !== id
                )
            );

            setMessage(
                "Skill deleted successfully"
            );

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Failed to delete skill"
            );

        }
    };

    return (
        <div className="applications-page">

            <div className="applications-header">

                <div>

                    <h1>
                        Skills
                    </h1>

                    <p>
                        Track your technical and professional skills.
                    </p>

                </div>

                <Link
                    to="/skills/add"
                    className="add-button"
                >
                    + Add Skill
                </Link>

            </div>

            {message && (
                <div className="message">
                    {message}
                </div>
            )}

            <div className="application-stats">

    <div className="application-stat-card">
        <h3>Total Skills</h3>
        <h2>{totalSkills}</h2>
    </div>

    <div className="application-stat-card">
        <h3>Average Progress</h3>
        <h2>{averageProgress}%</h2>
    </div>

    <div className="application-stat-card">
        <h3>Advanced Skills</h3>
        <h2>{advancedSkills}</h2>
    </div>

    <div className="application-stat-card">
        <h3>75%+ Progress</h3>
        <h2>{highProgressSkills}</h2>
    </div>

</div>

            <div className="applications-card">

                {skills.length === 0 ? (

                    <div className="empty-state">

                        <div>
                            🧠
                        </div>

                        <h2>
                            No skills added yet
                        </h2>

                        <p>
                            Start building your skill profile by
                            adding your first skill.
                        </p>

                        <Link
                            to="/skills/add"
                            className="add-button"
                        >
                            + Add Skill
                        </Link>

                    </div>

                ) : (

                    <div className="skills-grid">

                        {skills.map(
                            (skill) => (

                                <div
                                    className="skill-card"
                                    key={skill._id}
                                >

                                    <div className="skill-card-header">

                                        <div>

                                            <h2>
                                                {skill.skillName}
                                            </h2>

                                            <p>
                                                {skill.category}
                                            </p>

                                        </div>

                                        <span className="skill-level">
                                            {skill.level}
                                        </span>

                                    </div>

                                    <div className="skill-progress">

                                        <div className="skill-progress-header">

                                            <span>
                                                Progress
                                            </span>

                                            <strong>
                                                {skill.progress || 0}%
                                            </strong>

                                        </div>

                                        <div className="skill-progress-bar">

                                            <div
                                                className="skill-progress-fill"
                                                style={{
                                                    width:
                                                        `${skill.progress || 0}%`
                                                }}
                                            ></div>

                                        </div>

                                    </div>

                                    <div className="skill-actions">

                                        <Link
                                            to={`/skills/edit/${skill._id}`}
                                            className="edit-button"
                        >
                                          ✏️
                                        </Link>

                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                handleDelete(
                                                    skill._id
                                                )
                                            }
                                        >
                                            🗑️
                                        </button>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>

        </div>
    );
}

export default Skills;
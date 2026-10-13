import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function AddSkill() {

    const [skillName, setSkillName] = useState("");
    const [category, setCategory] = useState("Programming");
    const [level, setLevel] = useState("Beginner");
    const [progress, setProgress] = useState(0);

    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await API.post(
                "/skills",
                {
                    skillName,
                    category,
                    level,
                    progress
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessage(
                "Skill added successfully!"
            );

            setTimeout(() => {

                navigate("/skills");

            }, 1000);

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Failed to add skill"
            );

        }
    };

    return (
        <div className="add-application-page">

            <div className="form-container">

                <div className="form-header">

                    <div>

                        <h1>
                            Add Skill
                        </h1>

                        <p>
                            Add a skill to your career profile.
                        </p>

                    </div>

                    <Link
                        to="/skills"
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
                            Skill Name *
                        </label>

                        <input
                            type="text"
                            placeholder="Example: Java"
                            value={skillName}
                            onChange={(e) =>
                                setSkillName(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Category
                        </label>

                        <select
                            value={category}
                            onChange={(e) =>
                                setCategory(e.target.value)
                            }
                        >

                            <option value="Programming">
                                Programming
                            </option>

                            <option value="Database">
                                Database
                            </option>

                            <option value="Web Development">
                                Web Development
                            </option>

                            <option value="Cloud">
                                Cloud
                            </option>

                            <option value="Tools">
                                Tools
                            </option>

                            <option value="Soft Skills">
                                Soft Skills
                            </option>

                            <option value="Other">
                                Other
                            </option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>
                            Skill Level
                        </label>

                        <select
                            value={level}
                            onChange={(e) =>
                                setLevel(e.target.value)
                            }
                        >

                            <option value="Beginner">
                                Beginner
                            </option>

                            <option value="Intermediate">
                                Intermediate
                            </option>

                            <option value="Advanced">
                                Advanced
                            </option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>
                            Progress: {progress}%
                        </label>

                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={(e) =>
                                setProgress(
                                    Number(e.target.value)
                                )
                            }
                        />

                    </div>

                    <button
                        type="submit"
                        className="submit-button"
                    >
                        Add Skill
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AddSkill;
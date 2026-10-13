import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import API from "../services/api";

function EditSkill() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [skillName, setSkillName] = useState("");
    const [category, setCategory] = useState("Programming");
    const [level, setLevel] = useState("Beginner");
    const [progress, setProgress] = useState(0);

    const [message, setMessage] = useState("");

    useEffect(() => {

        const getSkill = async () => {

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

                const skill = response.data.skills.find(
                    (item) => item._id === id
                );

                if (skill) {

                    setSkillName(skill.skillName);
                    setCategory(skill.category);
                    setLevel(skill.level);
                    setProgress(skill.progress);

                }

            } catch (error) {

                setMessage(
                    error.response?.data?.message ||
                    "Failed to load skill"
                );

            }
        };

        getSkill();

    }, [id]);


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await API.put(
                `/skills/${id}`,
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
                "Skill updated successfully!"
            );

            setTimeout(() => {

                navigate("/skills");

            }, 1000);

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Failed to update skill"
            );

        }
    };


    return (
        <div className="add-application-page">

            <div className="form-container">

                <div className="form-header">

                    <div>

                        <h1>
                            Edit Skill
                        </h1>

                        <p>
                            Update your skill information and progress.
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
                        Update Skill
                    </button>

                </form>

            </div>

        </div>
    );
}

export default EditSkill;
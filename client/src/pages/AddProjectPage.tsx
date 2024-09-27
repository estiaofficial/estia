import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext";

import { Navbar } from "../components/navbar/Navbar"

const AddProject: React.FC = () => {
    const { supabase } = useProject(); // Access supabase from the ProjectContext
    const navigate = useNavigate();

    const [projectName, setProjectName] = useState("");
    const [tech1, setTech1] = useState("");
    const [tech2, setTech2] = useState("");
    const [description, setDescription] = useState("");
    const [videoId, setVideoId] = useState("");
    const [repoPath, setRepoPath] = useState("");
    const [color, setColor] = useState("#6E00FF"); // Default color

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase
                .from("estia_projects")
                .insert([
                    {
                        project_name: projectName,
                        tech1: tech1,
                        tech2: tech2,
                        description: description,
                        video_Id: videoId,
                        repo_Path: repoPath,
                        colour: color,
                    },
                ]);

            if (error) {
                console.error("Error inserting data:", error);
            } else {
                console.log("Project added:", data);
                navigate("/"); // Navigate back to projects list after submission
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Predefined color palette
    const colors = [
        { hex: "#8A0303", label: "Red" },
        { hex: "#628400", label: "Green" },
        { hex: "#007562", label: "Teal" },
        { hex: "#6F0050", label: "Pink" },
        { hex: "#45006F", label: "Purple" },

    ];

    return (
        <>
            <Navbar/>
            <button onClick={() => navigate(-1)} className="back-button">
                Back
            </button>
            <div className="add-project-form">
                <h2>Add New Project</h2>
                <p className="subtitle">
                    Do you want to contribute to our growing collection? Submit a project
                    and we will take a look and then publish your creation.
                </p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Project Name:</label>
                        <input
                            placeholder="Give it a short name..."
                            className="name-input"
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="tech-stack">
                        <label>Tech Stacks:</label>
                        <div className="tech-inputs-container">
                            <input
                                placeholder="1st language/framework..."
                                className="tech-input"
                                type="text"
                                value={tech1}
                                onChange={(e) => setTech1(e.target.value)}
                                required
                            />
                            <input
                                placeholder="2nd language/framework..."
                                className="tech-input"
                                type="text"
                                value={tech2}
                                onChange={(e) => setTech2(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            placeholder="Small blurb describing key concepts..."

                            className="description-input"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="colours-container">
                        <label>Choose a background color:</label>
                        <div className="colour-picker">
                            {colors.map((col) => (
                                <button
                                    key={col.hex}
                                    type="button"
                                    className={`colour-button ${color === col.hex ? "active" : ""
                                        }`}
                                    style={{ backgroundColor: col.hex }}
                                    onClick={() => setColor(col.hex)}
                                ></button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label>Link to Youtube</label>
                        <div className="link-split-container">
                            <label className="link-split-font">https://www.youtube.com/watch?v=</label>
                            <input
                                placeholder="video id"
                                className="link-split-input"
                                type="text"
                                value={videoId}
                                onChange={(e) => setVideoId(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label>Link to Github</label>
                        <div className="link-split-container">
                            <label className="link-split-font">https://github.com/</label>
                            <input
                                placeholder="username/repo"
                                className="link-split-input"
                                type="text"
                                value={repoPath}
                                onChange={(e) => setRepoPath(e.target.value)}
                            />
                        </div>
                    </div>
                    <button type="submit" className="submit-button">
                        Add Project
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddProject;

import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import { ProjectDetails } from "../components/project/ProjectDetails";
import { useDispatch } from "react-redux";
import { getProjects } from "../api/projectAPI";
import { Project } from "../common/types";

const ProjectsRoutes = () => {
    const dispatch = useDispatch();

    const [projects, setProjects] = useState<Project[]>([]);
    const [projectsLoading, setProjectsLoading] = useState<boolean>(true);

    useEffect(() => {
        getProjects(dispatch).then((projects) => {
            setProjects(projects);
            setProjectsLoading(false);
        });
    }, [dispatch]);

    // Add check for projects before trying to map over them
    if (!projects || !Array.isArray(projects) || projectsLoading) {
        return <div className="loading">
        <div className="loading-animation">
            <div className="box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>;
    }

    return (
        <Routes>
            {/* need to change home page home */}
            <Route path="/" element={<HomePage />} />

            {/* <Route path=":projectId" element={<ProjectDetails />} /> */}

            {projects.map((project, index) => {
                return (
                    <Route key={index} path={`/${project.projectId}`} element={<ProjectDetails />} />
                );
            })}
        </Routes>
    );
};

export default ProjectsRoutes;

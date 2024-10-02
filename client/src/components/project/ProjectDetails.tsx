import React from "react";
import { useNavigate } from "react-router-dom";
import YouTubeEmbed from "./embed/YoutubeEmbed";
import GitHubRepo from "./embed/GithubEmbed";
import { useProject } from "../../context/ProjectContext";

// Import the new projects data

// Import components
import { Navbar } from "../navbar/Navbar";
import TechStack from "./TechStack";
import DifficultyLevel from "./DifficultyLevel";
import Comments from "./Comments";
// import Comments from "./Comments";

const ProjectDetails: React.FC = () => {
  const { projects } = useProject();
  const navigate = useNavigate(); // Hook for navigation

  // Get the current URL and extract the project title
  const url = window.location.href;
  const urlParts = url.split("/");
  const rawTitle = urlParts[urlParts.length - 1];

  // Decode the project name from URL
  const decodedTitle = decodeURIComponent(rawTitle);

  // Get the project details based on the decoded title parameter
  const project = projects.find(
    (project) => project.project_name === decodedTitle,
  ) || {
    project_name: `${decodedTitle} was not found`,
    tech1: "Not Found",
    tech2: "",
    colour: "#000000",
    description: "Details not available",
    video_Id: "No video link found",
    repo_Path: "No repo found",
  };

  console.log(projects); //
  return (
    <>
      <Navbar />
      <div className="details-main-container">
        <button onClick={() => navigate(-1)} className="back-button">
          Back
        </button>
        {/* Left side of page */}
        <div className="grid-container">
          <div className="">
            <div className="details-container">
              <div className="title-and-description">
                <h1 className="details-title">{project.project_name}</h1>
              </div>
              <div className="embed-container">
                <div className="">
                  <div className="">
                    <YouTubeEmbed videoId={project.video_Id as string} />
                  </div>
                  <p className="details-subtitle">{project.description}</p>
                </div>
              </div>
            </div>
            <div className=""><Comments/></div>
          </div>

          {/* Right side of page */}
          <div className="additional-information-container">
            <div className="">
              <TechStack
                tech1={project.tech1 || ""}
                tech2={project.tech2 || ""}
              />
            </div>

            <div className="">
              <GitHubRepo repoPath={project.repo_Path as string} />
            </div>

            <div className="">
              <DifficultyLevel />
            </div>

            <div className="">
              <div className="sidebar-container">
                <h1>Similar Projects</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;

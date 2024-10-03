import React from "react";
import { useNavigate } from "react-router-dom";
import YouTubeEmbed from "./embed/YoutubeEmbed";
import GitHubRepo from "./embed/GithubEmbed";
import { useProject } from "../../context/ProjectContext";

// Import the new projects data

// Imported icons
import LikeImage from "../../img/ThumbsUp.svg";
import FavImage from "../../img/Star.svg";

// Import components
import { Navbar } from "../navbar/Navbar";
import TechStack from "./TechStack";
import DifficultyLevel from "./DifficultyLevel";
import DiscussionBoard from "./DiscussionBoard";

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
  const project = projects.find((project) => {
    if (project.projectName === decodedTitle) {
      return project
    }
  });

  // console.log(projects);
  return (
    <>
      <Navbar />
      <div className="details-main-container">
        {/* Left side of page */}
        <div className="grid-container">
          <div className="">
          <button onClick={() => navigate(-1)} className="back-button">
          Back
        </button>
            <div className="details-container">
              <div className="title-and-description">
                <h1 className="details-title">{project?.projectName}</h1>
              </div>
              {/* <div className="embed-container"> */}
                <div className="description-container">
                    <YouTubeEmbed videoId={project?.videoId as string} />
                    <p className="details-subtitle">{project?.description}</p>
                </div>
              {/* </div> */}
            </div>
            <div className ="button-container">
              <button className="save-and-like-button">
                 <img className="like-fav-icon" src={FavImage}/>
                 <p>Save</p> 
                <p></p>  {/* change to number of saves */}
              </button>
              <button className="save-and-like-button" >
              <img className="like-fav-icon" src={LikeImage}/>
              <p>Like</p>
                <p></p> {/*  change to number of likes */}
              </button>
</div>
            <div className="">
              <DiscussionBoard/>
            </div>
          </div>
          {/* Right side of page */}
          <div className="additional-information-container">
            <div className="">
              <TechStack
                tech1={project?.tech1 || ""}
                tech2={project?.tech2 || ""}
              />
            </div>

            <div className="">
              <GitHubRepo repoPath={project?.repoPath as string} />
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

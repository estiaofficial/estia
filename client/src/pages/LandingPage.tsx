import React, { useEffect, useState, useRef } from "react";
import { LocomotiveScrollBar } from "../components/LocomotiveScrollBar";

import "../index.css";

import HomePage from "./HomePage";

import { Session } from "@supabase/supabase-js";
import { getSession } from "../api/authAPI";
import { Link } from "react-router-dom";

import { InitialNavbar } from "../components/navbar/InitialNavbar";
import { FeatureList } from "../components/landingpage/FeatureList";

import PrototypeImage from "../img/prototype.svg";
import EstiaVideo from "../videos/EstiaDemo.mp4";
import backgroundstars from "../img/background.svg"

import { FadeInSection } from "../components/FadeInSection";

export const LandingPage: React.FC = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [sessionLoading, setSessionLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePlay = () => {
        if (videoRef.current) {
            // Request fullscreen mode first
            const videoElement = videoRef.current;
            if (videoElement.requestFullscreen) {
                videoElement.requestFullscreen().then(() => {
                    videoElement.play(); // Play the video after entering fullscreen
                    setIsPlaying(true);
                }).catch((err) => {
                    console.error("Fullscreen request failed:", err);
                });
            } else {
                // Fallback if requestFullscreen is not supported
                videoElement.play();
                setIsPlaying(true);
            }
        }
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    useEffect(() => {
        getSession().then((session) => {
            setSession(session);
            setSessionLoading(false);
        });
    }, []);

    if (sessionLoading) {
        return <div className="loading-overlay"><div className="loading-spinner"></div></div>;
    }

    if (session && !sessionLoading) {
        return (
            <>
                <HomePage />
            </>
        );
    }

    return (
        <div className="landing-page-wrapper">
            <div className="background-stars"></div>
            <div>
                <InitialNavbar />
                <div className="wrapper">
                    <div className="initial-container">
                        <div className="initial-heading-container">
                            <h3 className="initial-slogan">
                                The world's largest
                                <span className="initial-highlight"> collection </span>
                                of coding projects
                            </h3>
                            <h2 className="initial-secondary-slogan">
                                Whether you're a seasoned coder or just starting out,
                                our personalized knowledge bank is here to change how you learn.
                            </h2>
                            <Link to="/login" style={{ textDecoration: "none" }}>
                                <button className="initial-button">
                                    Start Building
                                </button>
                            </Link>
                        </div>
                        <div className="video-container">
                            <video
                                ref={videoRef}
                                src={EstiaVideo}
                                controls
                                onPlay={handlePlay}
                                onPause={handlePause}
                            />
                            {!isPlaying && (
                                <div className="play-button" onClick={handlePlay}></div>
                            )}
                        </div>
                        <div className="landing-scrollbar">
                            <h2 className="landing-subheading">
                                Develop Any Skill You Can Imagine
                            </h2>
                            <div className="feature-list-container">
                                <LocomotiveScrollBar />
                            </div>
                            <FeatureList />
                        </div>
                        <FadeInSection>
                            <div className="background-stars"></div>
                            <div className="contribution-container">
                                <h2 className="landing-subheading">
                                    Interested in Contributing?
                                </h2>
                                <h2 className="contribution-header">
                                    Estia was created by a group of passionate Waterloo students
                                    who believe the best way to learn is by building something meaningful.
                                    If you're excited about
                                    this project, <a className="contact-tag" href="https://github.com/yvjnlee/estia?tab=readme-ov-file#contact" target="_blank">contact us</a> to
                                    get involved.
                                </h2>
                                <button className="star-button"
                                    onClick={() => window.open('https://github.com/yvjnlee/estia',
                                        '_blank')}
                                >
                                    ⭐ Give our Repo a Star
                                </button>
                            </div>
                        </FadeInSection>
                    </div>
                    <footer className="footer">
                        <p>&copy; 2024 Estia. All rights reserved.</p>
                        <p>
                            Follow us on <a href="https://github.com/yvjnlee/estia" target="_blank" rel="noopener noreferrer">GitHub</a>
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
};

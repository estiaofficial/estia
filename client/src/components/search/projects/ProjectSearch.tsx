import React, { useEffect, useState } from "react";
import { SearchBar } from "../SearchBar";
import { Filters } from "../Filters";

import GreyFilter from "../../../img/Grey_Filters.svg";
import WhiteFilter from "../../../img/White_Filters.svg";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { setSearchFilter } from "../../../store/slices/projectSlice";
import { filterProjects } from "../../../api/projectAPI";

export const ProjectSearch: React.FC = () => {
    const dispatch = useAppDispatch();
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleEnter = () => {
        dispatch(setSearchFilter(searchQuery));
        handleSearch(searchQuery);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch(searchQuery);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        dispatch(setSearchFilter(e.target.value));
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        dispatch(setSearchFilter(query));
    };

    const handleToggleFilters = () => {
        setShowFilters(!showFilters);
    };

    return (
        <div className="heading-container">
            <div className="heading-content">
                <h2 className="main-h2" data-scroll-section>
                    Welcome to the world&apos;s largest collective of coding projects.
                </h2>

                <div className="search-bar-and-filters">
                    <SearchBar
                        searchQuery={searchQuery}
                        handleEnter={handleEnter}
                        handleKeyPress={handleKeyPress}
                        handleInputChange={handleInputChange}
                    />

                    <button
                        className={
                            showFilters
                                ? "filters-button grey-Filter"
                                : "filters-button white-filter"
                        }
                        onClick={handleToggleFilters}
                    >
                        <img
                            className="filters-logo"
                            src={showFilters ? GreyFilter : WhiteFilter}
                            alt="Filter Icon"
                        />
                        Filters
                    </button>
                </div>

                {/* Smooth height transition */}
                <div className={`filters-container ${showFilters ? "show" : ""}`}>
                    <Filters />
                </div>
            </div>
        </div>
    );
};

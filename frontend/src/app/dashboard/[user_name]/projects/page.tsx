"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ProjectList from "./ProjectsList";

const mockProjects = [
  {
    id: "1",
    name: "React Dashboard",
    description: "A modern dashboard built with React and Tailwind CSS",
    language: "TypeScript",
    lastUpdated: "2023-11-15T10:30:00Z",
    isStarred: true,
  },
  {
    id: "2",
    name: "API Service",
    description: "Backend API service with Express and MongoDB",
    language: "JavaScript",
    lastUpdated: "2023-11-10T14:20:00Z",
    isStarred: false,
  },
  {
    id: "3",
    name: "E-commerce Frontend",
    description: "E-commerce website frontend with Next.js",
    language: "TypeScript",
    lastUpdated: "2023-11-05T09:15:00Z",
    isStarred: true,
  },
  {
    id: "4",
    name: "Mobile App",
    description: "React Native mobile application",
    language: "JavaScript",
    lastUpdated: "2023-10-28T16:45:00Z",
    isStarred: false,
  },
  {
    id: "5",
    name: "Documentation Site",
    description: "Technical documentation site built with Docusaurus",
    language: "JavaScript",
    lastUpdated: "2023-10-20T11:10:00Z",
    isStarred: false,
  }
];

export default function ProjectsPage() {
  const params = useParams();
  const userName = params.user_name as string;
  
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("updated");
  const [projects, setProjects] = useState(mockProjects);

  useEffect(() => {
    let filteredProjects = [...mockProjects];
    
    if (searchQuery) {
      filteredProjects = filteredProjects.filter(project => 
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    filteredProjects.sort((a, b) => {
      if (sortBy === "updated") {
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
    
    setProjects(filteredProjects);
  }, [searchQuery, sortBy]);



  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">My Projects</h1>
        <button className="bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white px-4 py-2 rounded-md transition duration-150 ease-in-out">
          New Project
        </button>
      </div>
      <ProjectList />
  
    </div>
  );
}

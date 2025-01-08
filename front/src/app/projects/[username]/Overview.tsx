export default function AllProjects() {
  // Generate sample projects data
  const projects = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Project ${i + 1}`,
    description: `Description for project ${i + 1}`,
  }));

  return (
    <div className="mt-6 space-y-4">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        >
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {project.name}
          </h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {project.description}
          </p>
        </div>
      ))}
    </div>
  );
}

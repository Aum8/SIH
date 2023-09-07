document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("search-button");
    const projectList = document.getElementById("project-list");
    const searchInput = document.getElementById("search-input");
    const filterDropdown = document.getElementById("filter");

    const projectsDatabase = [
        {
            title: "Project 1",
            description: "Description of project 1 goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            topic: "Topic A",
            techStack: "php",
            university: "University X"
        },
        {
            title: "Project 2",
            description: "Description of project 2 goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            topic: "Topic B",
            techStack: "Stack 2",
            university: "University Y"
        },
        {
            title: "Project 3",
            description: "Description of project 3 goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            topic: "Topic C",
            techStack: "Stack 3",
            university: "University Z"
        }
    ];

    function populateProjects(projects) {
        projectList.innerHTML = "";
        for (const project of projects) {
            const listItem = document.createElement("li");
            listItem.className = "project";
            listItem.innerHTML = `
                <h2>${project.title}</h2>
                <p>${project.description}</p>
                <p>Topic: ${project.topic} | Tech Stack: ${project.techStack} | University: ${project.university}</p>
            `;
            projectList.appendChild(listItem);
        }
    }
    populateProjects(projectsDatabase);

    searchButton.addEventListener("click", function () {
        const searchTerm = searchInput.value.toLowerCase();
        const filter = filterDropdown.value;

        let filteredProjects = projectsDatabase;

        // Filter based on selected filter criteria
        if (filter !== "all") {
            filteredProjects = projectsDatabase.filter((project) => project[filter].toLowerCase().includes(searchTerm));
        } else {
            // If "All" is selected, show all projects that contain the search term in any field
            filteredProjects = projectsDatabase.filter((project) => {
                for (const key in project) {
                    if (project[key].toLowerCase().includes(searchTerm)) {
                        return true;
                    }
                }
                return false;
            });
        }

        // Populate the filtered projects
        populateProjects(filteredProjects);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("search-button");
    const projectList = document.getElementById("project-list");
    const searchInput = document.getElementById("search-input");
    const filterDropdown = document.getElementById("filter");
    
    let projectsData; // Define a variable to store the fetched data

    // Fetch data from the JSON file
    fetch("projects.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            projectsData = data; // Store the fetched data in the variable
            populateProjects(data);
        })
        .catch(error => {
            console.error("Error:", error);
        });

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

    searchButton.addEventListener("click", function () {
        const searchTerm = searchInput.value.toLowerCase();
        const filter = filterDropdown.value;

        let filteredProjects = projectsData; // Use the variable containing the data

        // Filter based on selected filter criteria
        if (filter !== "all") {
            filteredProjects = projectsData.filter((project) => project[filter].toLowerCase().includes(searchTerm));
        } else {
            // If "All" is selected, show all projects that contain the search term in any field
            filteredProjects = projectsData.filter((project) => {
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


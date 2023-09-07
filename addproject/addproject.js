document.addEventListener("DOMContentLoaded", function () {

    const cityDropdown = document.getElementById("city");
    const stateDropdown = document.getElementById("state");
    const selectedFileName = document.getElementById("selectedFileName");

    // Function to populate the state dropdown
    function populateStateDropdown() {
        stateDropdown.innerHTML = '<option value="" disabled selected>Select State</option>';
        fetch("states.json")
            .then(response => response.json())
            .then(data => {
                console.log(data); // Log the retrieved JSON data to the console for debugging

                // Extract state names from the JSON data
                const stateNames = Object.keys(data);

                // Populate the state dropdown with state names
                stateNames.forEach(stateName => {
                    const option = document.createElement("option");
                    option.value = stateName;
                    option.textContent = stateName;
                    stateDropdown.appendChild(option);
                });
            })
            .catch(error => console.error(error)); // Log any errors to the console
    }

    // Event listener to populate the city dropdown when a state is selected
    stateDropdown.addEventListener("change", () => {
        const selectedState = stateDropdown.value;
        populateCityDropdown(selectedState);
    });

    // Function to populate the city dropdown based on the selected state
    function populateCityDropdown(selectedState) {
        cityDropdown.innerHTML = '<option value="" disabled selected>Select City</option>';
        fetch("states.json")
            .then(response => response.json())
            .then(data => {
                // Extract city names for the selected state from the JSON data
                const cities = data[selectedState];

                // Populate the city dropdown with city names
                cities.forEach(city => {
                    const option = document.createElement("option");
                    option.value = city;
                    option.textContent = city;
                    cityDropdown.appendChild(option);
                });
            })
            .catch(error => console.error(error));
    }

    const projectImagesInput = document.getElementById("projectImages");

    projectImagesInput.addEventListener("change", function () {
        const files = projectImagesInput.files;
        if (files.length > 0) {
            let fileNameList = "";
            for (let i = 0; i < files.length; i++) {
                fileNameList += files[i].name;
                if (i < files.length - 1) {
                    fileNameList += ", ";
                }
            }
            selectedFileName.textContent = "Selected Files: " + fileNameList;
        } else {
            selectedFileName.textContent = "";
        }
    });

    // Optionally, you can add a "Remove" button for selected files
    selectedFileName.addEventListener("click", function () {
        projectImagesInput.value = "";
        selectedFileName.textContent = "";
    });

    const form = document.getElementById("projectForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the form from submitting traditionally

        // Collect form data
        const formData = new FormData(form);

        // Send data to the server or API using Fetch
        fetch("submit_project_endpoint", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response from the server/API
                if (data.success) {
                    // Display a success message or redirect to a thank-you page
                    alert("Project submitted successfully!");
                } else {
                    // Display an error message or handle the error appropriately
                    alert("Project submission failed. Please try again.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred. Please try again later.");
            });
    });

    // Populate the state dropdown initially
    populateStateDropdown();
});

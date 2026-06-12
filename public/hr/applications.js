let allApplications = [];

async function loadApplications() {

    const response = await fetch("/applications");

    allApplications = await response.json();

    renderApplications(allApplications);
}

function renderApplications(applications) {

    const list =
        document.getElementById("applicationList");

    list.innerHTML = "";

    applications.forEach(app => {

        list.innerHTML += `

        <tr>

            <td>${app.id}</td>

            <td>${app.name}</td>

            <td>${app.email}</td>

            <td>${app.position}</td>

            <td>

                <select
                    class="form-select"
                    onchange="updateStatus(${app.id}, this.value)">

                    <option value="Applied"
                    ${app.status === "Applied" ? "selected" : ""}>
                    Applied
                    </option>

                    <option value="Shortlisted"
                    ${app.status === "Shortlisted" ? "selected" : ""}>
                    Shortlisted
                    </option>

                    <option value="Interview Scheduled"
                    ${app.status === "Interview Scheduled" ? "selected" : ""}>
                    Interview Scheduled
                    </option>

                    <option value="Selected"
                    ${app.status === "Selected" ? "selected" : ""}>
                    Selected
                    </option>

                    <option value="Rejected"
                    ${app.status === "Rejected" ? "selected" : ""}>
                    Rejected
                    </option>

                </select>

            </td>

            <td>

                <a
                    href="candidate_details.html?id=${app.id}"
                    class="btn btn-primary btn-sm">

                    View Details

                </a>

            </td>

        </tr>

        `;
    });

}

async function updateStatus(id, status) {

    await fetch(`/applications/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            status
        })

    });

}

function searchApplications() {

    const searchText =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    const filteredApplications =
        allApplications.filter(app =>
            app.name
            .toLowerCase()
            .includes(searchText)
        );

    renderApplications(filteredApplications);

}

window.onload = loadApplications;
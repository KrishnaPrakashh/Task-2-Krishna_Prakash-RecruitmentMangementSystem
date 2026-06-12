const params =
new URLSearchParams(window.location.search);

const id =
parseInt(params.get("id"));

fetch("/applications")
.then(res => res.json())
.then(applications => {

    const app =
    applications.find(a => a.id === id);

    if (!app) {

        document.getElementById("details")
        .innerHTML =
        "<p>Candidate not found</p>";

        return;
    }

    document.getElementById("details")
    .innerHTML = `

        <p><strong>ID:</strong> ${app.id}</p>

        <p><strong>Name:</strong> ${app.name}</p>

        <p><strong>Email:</strong> ${app.email}</p>

        <p><strong>Position:</strong> ${app.position}</p>

        <p><strong>Status:</strong> ${app.status}</p>

        <p><strong>About:</strong></p>

        <div class="border rounded p-3 bg-light">
            ${app.about || "No description provided"}
        </div>

    `;
});


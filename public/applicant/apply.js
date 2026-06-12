document
.getElementById("applicationForm")
.addEventListener("submit", async (e) => {

    e.preventDefault();

    const application = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        position: document.getElementById("position").value,

        about: document.getElementById("about").value

    };

    const response = await fetch("/apply", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(application)

    });

    const data = await response.json();

    document.getElementById("message")
        .innerText = data.message;

    document.getElementById("applicationForm")
        .reset();

});
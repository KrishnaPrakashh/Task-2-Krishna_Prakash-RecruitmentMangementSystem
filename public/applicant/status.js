async function checkStatus() {

    const email =
        document.getElementById("email").value;

    const result =
        document.getElementById("result");

    try {

        const response =
            await fetch(`/application-status/${email}`);

        const application =
            await response.json();

        let html = `

            <h3>Application Details</h3>

            <hr>

            <p><strong>Name:</strong> ${application.name}</p>

            <p><strong>Email:</strong> ${application.email}</p>

            <p><strong>Position:</strong> ${application.position}</p>

            <p><strong>Status:</strong> ${application.status}</p>

        `;

        if (application.status === "Interview Scheduled") {

            const interviewResponse =
                await fetch(`/interviews/${application.id}`);

            if (interviewResponse.ok) {

                const interviewData =
                    await interviewResponse.json();

                interviewData.interviews.forEach(i => {

                    html += `

                    <div class="card mt-3">

                        <div class="card-body">

                            <h5>Interview Details</h5>

                            <p>
                                <strong>Date:</strong>
                                ${i.date}
                            </p>

                            <p>
                                <strong>Time:</strong>
                                ${i.time}
                            </p>

                            <p>
                                <strong>Interviewer:</strong>
                                ${i.interviewer}
                            </p>

                        </div>

                    </div>

                    `;

                });

            }

        }

        result.style.display = "block";
        result.innerHTML = html;

    } catch (error) {

        result.style.display = "block";

        result.innerHTML = `

            <div class="alert alert-danger">

                Application not found

            </div>

        `;

    }

}
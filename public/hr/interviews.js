document
.getElementById("interviewForm")
.addEventListener("submit",
async (e) => {

    e.preventDefault();

    const interview = {

        candidateId:
        document.getElementById(
        "candidateId").value,

        date:
        document.getElementById(
        "date").value,

        time:
        document.getElementById(
        "time").value,

        interviewer:
        document.getElementById(
        "interviewer").value

    };

    const response =
    await fetch("/interviews", {

        method:"POST",

        headers:{
            "Content-Type":
            "application/json"
        },

        body:
        JSON.stringify(interview)

    });

    const data =
    await response.json();

    document
    .getElementById("message")
    .innerText =
    data.message;

});



async function loadInterviews(){

    const response =
    await fetch("/interviews");

    const interviews =
    await response.json();

    const list =
    document.getElementById(
    "interviewList");

    list.innerHTML = "";

    interviews.forEach(i => {

        list.innerHTML += `

        <tr>

            <td>${i.id}</td>

            <td>${i.candidateId}</td>

            <td>${i.date}</td>

            <td>${i.time}</td>

            <td>${i.interviewer}</td>

        </tr>

        `;

    });

}
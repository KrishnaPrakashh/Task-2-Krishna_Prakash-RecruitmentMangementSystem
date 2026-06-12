

const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const applicationRoutes = require("./routes/application");

const interviewRoutes =
require("./routes/interview");

app.use("/", applicationRoutes);
app.use("/", interviewRoutes);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

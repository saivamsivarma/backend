const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser')
require("dotenv").config();

// set up express
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/uploads/profilepic', express.static('uploads/profilepic'));

//Routes
app.use("/users", require("./routes/userRouter"));
app.use("/recruiters", require("./routes/recruiterRouter"));
app.use("/jobs",require("./routes/jobRouter"));
app.use("/applications",require("./routes/applicationRouter"));
app.use("/skills",require("./routes/skillsRouter"))


mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

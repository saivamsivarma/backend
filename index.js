const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require( 'mongoose');
const cors = require( 'cors');
const dotenv = require( 'dotenv');

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const companyRoute = require("./routes/company");
const jobRoute = require("./routes/job");
const applicationRoute = require("./routes/application");
const referenceRoute = require("./routes/reference");

dotenv.config();

const app = express();
app.use(express.json());

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use('/uploads/images', express.static('uploads/images'));

app.get("/",(req,res)=>{
  res.send("Welcome to jobfinder")
})

app.use("/auth",authRoute);
app.use("/user",userRoute);
app.use("/company",companyRoute);
app.use("/job",jobRoute);
app.use("/application",applicationRoute);
app.use("/reference",referenceRoute);

const PORT = process.env.PORT|| 4000;

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true,useFindAndModify:false })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
  
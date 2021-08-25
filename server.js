const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
app.use(cors())

const corsOptions = {
	origin: "http://localhost:3000",
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

const port = process.env.PORT || 4000
const dbURI = "mongodb://localhost:27017/the-housekeeper"

app.listen(port, () => {
	console.log("Server running on port : 4000")
})

mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("Connected to the Database"))
	.catch((err) => console.log(err))

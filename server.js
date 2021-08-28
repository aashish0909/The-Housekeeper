const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const config = require('config')
mongoose.promise = global.promise

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname,'client','build','index.html'))
	})
}

const corsOptions = {
	origin: "http://localhost:3000",
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

const port = process.env.PORT || 4000
const dbURI = config.get('dbURI')
mongoose
.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to the Database"))
.catch((err) => console.log(err))

const authStudent = require("./routes/authStudent")
app.use("/api/users/student",authStudent)

app.listen(port, () => {
	console.log(`Server running on port : ${port}`)
})
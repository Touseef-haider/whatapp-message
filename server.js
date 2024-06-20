
require("dotenv")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const morgan = require("morgan")
const whatsappRoutes = require("./routes/whatsapp")


const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan("dev"))


app.use("/api/whatsapp_integration",whatsappRoutes)

app.use((err, req, res,next) => {
    // console.log(err)
    const statusCode = err.statusCode || 500
    const message = err?.message

    return res.status(statusCode).json({
        message: err,
        status: statusCode
    })

})


const PORT = process.env.PORT || 8081

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})



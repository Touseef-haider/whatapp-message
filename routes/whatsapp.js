

const router = require("express").Router()
const { sendWhatsappMessage, } = require("../utils/whatsapp")


router.post("/", async (req, res, next) => {
    try {

        const recipient = "923312924590"
        const text = req.body.text

        console.log("text", text)

        const data = {
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": recipient,
            "type": "text",
            "text": {
                "preview_url": false,
                "body": text
            }
        };


        const responseData = await sendWhatsappMessage(data)

        return res.status(200).json({
            data: responseData
        })
    } catch (error) {
        return next(error)
    }
})

module.exports = router

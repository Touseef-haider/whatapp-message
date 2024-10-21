

const router = require("express").Router()
const { sendWhatsappMessage, getNumbers } = require("../utils/whatsapp")


router.post("/", async (req, res, next) => {
    try {

        const recipients = [
            "92 331 2924590",
            "92 311 2332937",
            "27 79 799 5119",
            "27 82 771 9524"
        ]
        const text = `Emergency: Emergency response from Guardian. Your son is in an emergency situation GPS location 
Latitude: -25.7461
Longitude: 28.1881 
Link to maps: https://goo.gl/maps/Qp5HRMojQBtXMcA28

Steps to take:

*Call Guardian:  +2797995119
*Alert other family members: https://pinguard.ai/alert/Qp5H `


        const sendMessagePromises = recipients.map((number) => {
            const data = {
                "messaging_product": "whatsapp",
                "recipient_type": "individual",
                "to": number,
                "type": "text",
                "text": {
                    "preview_url": false,
                    "body": text
                }
            };
            return sendWhatsappMessage(data)
        })


        const responsesData = await Promise.all(sendMessagePromises)

        return res.status(200).json({
            data: responsesData,
            status: true
        })
    } catch (error) {
        return next(error)
    }
})

module.exports = router

require('dotenv').config({
    path:".env"
})
const { default: axios } = require("axios")
WHATSAPP_BUSINESS_ACCOUNT_ID = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID
WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID
WHATSAPP_TESTING_PHONE_NUMBER = process.env.WHATSAPP_TESTING_PHONE_NUMBER
VERSION = process.env.VERSION
WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN

const META_URL = `https://graph.facebook.com/${VERSION}`


exports.sendWhatsappMessage = async function (data) {
    try {

        const response = await axios({
            method: "POST",
            url: `${META_URL}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${WHATSAPP_ACCESS_TOKEN}`
            },
            data:data,
        })

        return response.data

    } catch (error) {
        throw error
    }
}


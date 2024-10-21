require('dotenv').config({
    path:".env"
})
const { default: axios } = require("axios")
const { response } = require('express')
WHATSAPP_BUSINESS_ACCOUNT_ID = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID
WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID
WHATSAPP_TESTING_PHONE_NUMBER = process.env.WHATSAPP_TESTING_PHONE_NUMBER
VERSION = process.env.VERSION
WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN

const META_URL = `https://graph.facebook.com/${VERSION}`


exports.getNumbers = async function(){
    try {
        const response = await axios({
            method:"GET",
            url: `${META_URL}/${WHATSAPP_BUSINESS_ACCOUNT_ID}/phone_numbers?access_token=${WHATSAPP_ACCESS_TOKEN}`,
        })

        return response.data
        
    } catch (error) {
        console.log(error.response)
        throw error
    }
}

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
        console.log(response.error)
        throw error
    }
}


const axios = require('axios');
const { transaction_id, BASE_URL } = require('./constants');

export const makePayment = async (products, totalAmount) => {

    const isLogin = localStorage.getItem('clientId')
    if (!isLogin) {
        toast.error("Please signin first.")
        return;
    }


    const transaction_id = "pu-01258-01kj21058" + new Date().getSeconds()


    const items = products.map(product => ({
        price_description: {
            unit_amount: product.price
        },
        product_description: {
            name: product.title,
            image_url: product.img,
            about_product: product.description
        },
        quantity: product.quantity
    }))

    const api_token = "live_6ZDeyUInCHE6r2PYuTWXUFSc9C448XxQAG2SQkZ5";
    const api_user = "a27ede04-bcef-4f1e-8cc8-82b05733c387";
    const api_password = "e01cdab1-b872-461c-b571-677e0af66794";

    const credentials = btoa(`${api_user}:${api_password}`)
    const authorization = `Basic ${credentials}`
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': api_token,
            'Authorization': authorization,
            "mode": "live",
        }
    }

    const payload = {
        "total_amount": totalAmount,
        "cancel_url": "https://example.com/cancel",
        "success_url": "https://example.com/success",
        "currency": "XAF",
        "mode": "payment",
        "transaction_id": transaction_id,
        "return_url": "https://webhook.site/d457b2f3-dd71-4f04-9af5-e2fcf3be8f34",
        "notify_url": "https://webhook.site/d457b2f3-dd71-4f04-9af5-e2fcf3be8f34",
        items,
        "meta": {
            "phone_number_collection": false,
            "address_collection": false
        }
    }

    try {
        // const response = await axios.post( BASE_URL + '/api/gateway/checkout/initialize', payload, config);
        // console.log("Payment responst: "+response.data);
        // return await response?.data.redirect;
        const res = await fetch(`https://gateway.payunit.net/api/gateway/checkout/initialize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': api_token,
                'Authorization': authorization,
                "mode": "live",
            },
            body: JSON.stringify(payload)
        })
        const req = await res.json()
        return req.data.redirect;
    } catch (error) {
        console.error("Error payment: ", error.message);
    }
}
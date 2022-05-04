// @ts-nocheck (TODO KE: remove after typescript refactor)
const axios = require("axios");
exports.handler = async function (event, context) {
  console.log(event);
  console.log(context);
  try {
    // const { id } = event.queryStringParameters;
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=Aap_uEAkQC_LMHuyp10G7d0dkdEiVJ4-6jsIUKS99EHS5kn5j2KumG4kOqAGEjvFMIbi0QRf-ugPBInEEKgzylE5U_oUf0oDtRlU_8LLMKzYHT8cOD_bncZgEgtWynTyDeeicZ57UvWhlTP8n_7XUxOSNq7yhjR9z03j32avnpuhUkOULocC&key=AIzaSyC3_vtSfDK5doLZH-9ERb458Q5oeLNW72M`
    );
    return {
      statusCode: 200,
      body: JSON.stringify(response.json()),
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};

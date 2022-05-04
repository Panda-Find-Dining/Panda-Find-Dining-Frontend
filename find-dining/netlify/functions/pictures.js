// @ts-nocheck (TODO KE: remove after typescript refactor)
const axios = require("axios");
exports.handler = async function (event, context) {
  console.log(event);
  console.log(context);
  try {
    // const { id } = event.queryStringParameters;
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference="
    );
    return {
      statusCode: 200,
      body: JSON.stringify({ title: response.data.title }),
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};

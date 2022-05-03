// @ts-nocheck (TODO KE: remove after typescript refactor)

exports.handler = async (event, context, callback, restaurant) => {
  const pass = (body) => {
    callback(null, { statusCode: 200, body: JSON.stringify(body) });
  };

  try {
    const { restaurant } = event.queryStringParameters;
    let response = await fetch(
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${restaurant}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
      {
        method: event.httpMethod,
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GOOGLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: event.body,
      }
    );
    let data = await response.json();
    await pass(data);
  } catch (err) {
    let error = {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({ error: err.message }),
    };
    await pass(error);
  }
};

export {}
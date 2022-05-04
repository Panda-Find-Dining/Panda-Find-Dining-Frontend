// @ts-nocheck (TODO KE: remove after typescript refactor)


  import axios from "axios"

const handler = async (event) => {
  // const {restaurant} = event.queryStringParameters

  const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=Aap_uEA9-OWU73s-8F2SV1fDj4VzEw0NWTGlhXrUyaQ-gPyf1kinnApe8WVakQbsf-ZPtQ0yica1yvUVO6ZnjVH1eqpTYjjpH4FiKW0JMcXjlNI3_nChIDxRCXIu7-3_EjQTmSLWWNPyij3iAzAmfm1x5Z9FqpCmTVyFj2KDphfhPwRKZUHL&key=${process.env.GOOGLE_API_KEY}`

  try {
    const { data } = await axios.get(url)

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }

  } catch (error) {
    const { status, statusText, headers, data } = error.response
    return {
      statusCode: status,
      body: JSON.stringify({status, statusText, headers, data})
    }
  }
}

export default  handler 
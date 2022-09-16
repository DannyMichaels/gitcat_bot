const axios = require('axios');

const getCatImage = async () => {
  try {
    const url = `http://thecatapi.com/api/images/get?format=json`;
    const { data } = await axios.post(url);
    //  [{
    //     "id": "V0BUA3pVA",
    //     "url": "https://s3.us-west-2.amazonaws.com/cdn2.thecatapi.com/images/V0BUA3pVA.jpg",
    //     "source_url": "https://thecatapi.com/?image_id=V0BUA3pVA"
    // }]

    return data[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getCatImage,
};

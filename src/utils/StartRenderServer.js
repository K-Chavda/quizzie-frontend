import axios from "axios";
import { RENDER_SERVICE_ID } from "./Constants";

const StartRenderServer = () => {
  axios
    .post(`https://api.render.com/v1/services/${RENDER_SERVICE_ID}/restart`, {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${import.meta.env.VITE_RENDER_API_KEY}`,
      },
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};

export default StartRenderServer;

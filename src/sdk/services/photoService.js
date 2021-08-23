import { NetworkRequest } from "../network";
import { BASE_URL, PATH } from "./../api";

const PhotoService = {
  getRecentPhotos: function ({ page = 1, perPage = 8, extras = "" }) {
    return NetworkRequest(
      "GET",
      BASE_URL,
      PATH.getRecentPhotos
        .replace("{{extras}}", extras)
        .replace("{{page}}", page)
        .replace("{{perPage}}", perPage),
      null
    );
  },
  serchPhotos: function ({ page = 1, perPage = 8, extras = "", searchQuery='' }) {
    return NetworkRequest(
      "GET",
      BASE_URL,
      PATH.searchPhotos
        .replace("{{extras}}", extras)
        .replace("{{page}}", page)
        .replace("{{perPage}}", perPage)
        .replace("{{searchQuery}}",searchQuery),
      null
    );
  },
};

export default PhotoService;

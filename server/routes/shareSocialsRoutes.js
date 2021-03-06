const shareServices = require("../services/shareSocials");
const shareServicesCached = require("../services/shareSocial-cached");
const requireLogin = require("../middleware/requireLogin");
const rateLimit = require("express-rate-limit");

// bitly has a rate limit of 1000 req per hour; hence windowMs = 60*60 * 1000 & max = 1000
const bitlyRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 1000
});

module.exports = app => {
  app.post(
    "/api/shareOnTwitter",
    requireLogin,
    bitlyRateLimit,
    shareServicesCached.postTwitter
  );
  app.post(
    "/api/shareOnLinkedin",
    requireLogin,
    bitlyRateLimit,
    shareServicesCached.uploadImageLinkedin
  );
  app.post("/api/shareOnFacebook", requireLogin, shareServices.postFacebook);
  app.post(
    "/api/checkTweetCharacters",
    requireLogin,
    shareServicesCached.checkTweetCharacters
  );
  // Not working : issue in uploading image to uploadURL; tried cURL, HTTPie, axios
  // app.get("/api/uploadImageLinkedin",shareServices.uploadImageLinkedin);
};

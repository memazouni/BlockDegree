const blogServices = require("../services/blogs");
const requireLogin = require("../middleware/requireLogin");
const requireAdmin = require("../middleware/requireAdmin");
const requireBlogOwner = require("../middleware/requireBlogOwner");

module.exports = app => {
  app.get("/blogs/loadBlogs", blogServices.loadBlogs); // initial loading of the blogs on the site
  app.get("/blogs/read", blogServices.readBlog); //  read a particular blog referred by its unique ID
  app.post("/blogs/keywordSearch", blogServices.keywordSearch); // get a collection of blogs from their keywords
  app.get("/blogs/getFavs", requireLogin, blogServices.getMyFavs); // get a collection of blogs favorited by the request sender
  app.post("/blogs/makeFav", requireLogin, blogServices.makeFav);

  app.get("/blogs/newPost", requireLogin, requireAdmin, blogServices.newPost);
  app.get("/blogs/editBlog", requireLogin, requireAdmin, blogServices.editBlog);
  app.get(
    "/blogs/getDrafts",
    requireLogin,
    requireAdmin,
    blogServices.getDrafts
  );

  app.get(
    "/api/blogs/createNewPost",
    requireLogin,
    requireAdmin,
    blogServices.createNewPost
  );
  app.post(
    "/api/blogs/saveDraft",
    requireLogin,
    requireAdmin,
    blogServices.saveDraft
  );
  app.post("/api/blogs/fetchBlog", blogServices.fetchBlog);
  app.post(
    "/api/blogs/postBlog", // post a new blog or draft
    requireLogin,
    requireAdmin,
    blogServices.postBlog
  );
  app.post(
    // edit a blog which is already posted
    "/api/blogs/editBlog",
    requireLogin,
    requireAdmin,
    blogServices.editBlog
  );
  app.post(
    // delete a blog which is already posted
    "/api/blogs/deleteBlog",
    requireLogin,
    requireAdmin,
    blogServices.deleteBlog
  );
};
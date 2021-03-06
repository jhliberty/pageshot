
let gitRevision;

exports.init = function () {
  gitRevision = require("./build-time").gitrevision;
  return Promise.resolve(gitRevision);
};

exports.setGitRevision = function (rev) {
  gitRevision = rev;
};

exports.getGitRevision = function () {
  return gitRevision;
};

exports.staticLink = function (resource) {
  if (! resource.startsWith("/")) {
    resource = "/" + resource;
  }
  if (resource.startsWith("/static")) {
    throw new Error("staticLink URL should not start with /static: " + resource);
  }
  return "/static" + resource + "?rev=" + gitRevision;
};

exports.staticLink.simple = function (resource) {
  if (! resource.startsWith("/")) {
    resource = "/" + resource;
  }
  return "/static" + resource;
};

exports.staticLinkWithHost = function (req, resource) {
  return req.protocol + "://" + req.headers.host + exports.staticLink(resource);
};

exports.imageLink = function (urlBase, resource) {
  if (! resource.startsWith("/")) {
    resource = "/" + resource;
  }
  if (resource.startsWith("/images")) {
    throw new Error("imageLink URL should not start with /images: " + resource);
  }
  return urlBase + "/images" + resource;
};

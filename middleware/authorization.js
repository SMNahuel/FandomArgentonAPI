const { jwtDecode } = require("jwt-decode");
function isCreator(req, res, next) {
  const decoded = jwtDecode(req.headers.authorization);

  if (decoded.user.type === "Creator") {
    return next();
  } else {
    return res.status(401).send("Unauthorized");
  }
}

function isAdmin(req, res, next) {
  const decoded = jwtDecode(req.headers.authorization);

  if (decoded.user.type === "Admin") {
    return next();
  } else {
    return res.status(401).send("Unauthorized");
  }
}

function isCreatorOrAdmin(req, res, next) {
  const decoded = jwtDecode(req.headers.authorization);

  if (decoded.user.type === "Creator" || decoded.user.type === "Admin") {
    return next();
  } else {
    return res.status(401).send("Unauthorized");
  }
}

module.exports = { isCreator, isAdmin, isCreatorOrAdmin };

// This initializes session state
const setUpSessionMiddleware = (req, res, next) => {
  console.log(`\nsession object: ${JSON.stringify(req.session)}`);
	console.log(`session id: ${req.session.id}`);
  if (!req.session.user) {
      req.session.user = {role: "guest"};
  };
  next();
};

// only members can access routes that are protected with this auth middleware
const checkMemberMiddleware = (req, res, next) => {
  if (req.session.user.role === "guest") {
      res.status(401).json({msg: "Not permitted"});
      } else {
      console.log(`Session info: ${JSON.stringify(req.session)} \n`);
      next();
  }
};

// only members can access routes that are protected with this auth middleware
const checkAdminMiddleware = (req, res, next) => {
  console.log(req.session)
  if (req.session.user.role !== "admin") {
      res.status(401).json({msg: "Not permitted"});
  } else {
      next();
  }
};

module.exports.setUpSessionMiddleware = setUpSessionMiddleware;
module.exports.checkMemberMiddleware = checkMemberMiddleware;
module.exports.checkAdminMiddleware = checkAdminMiddleware;
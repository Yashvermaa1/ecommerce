const passport = require('passport');

const isAuth = () => (req, res, next) => {
  passport.authenticate('jwt', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // Handle unauthenticated user
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      next();
    });
  })(req, res, next);
};

const sanitizeUser = (user) => {
  // Add any user sanitization logic here if needed
  return user;
};

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['your_cookie_name']; // replace with your actual cookie name
  }
  return token;
};

module.exports = {
  isAuth,
  sanitizeUser,
  cookieExtractor,
};

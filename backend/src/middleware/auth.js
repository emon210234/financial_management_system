import passport from 'passport';

export const authenticateJWT = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Authentication error',
        error: err.message,
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized access',
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

export const optionalAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);
};

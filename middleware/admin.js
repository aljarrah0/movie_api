module.exports = (req, res, next) => {
    // 403 forbidden

    // note : {res.user.isAdmin} variable from the auth middleware
    if (!req.user.isAdmin) return res.status(403).send('Access denied');
    next();
}
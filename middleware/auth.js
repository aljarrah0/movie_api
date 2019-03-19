const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    // 1) get token exist or not
    const token = req.header('x-auth-token');
    if (!token) res.status(401).send('access denied. No token provided.');
    else {
        // 2) check the token valid or not
        try {
            // valid token
            const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
            req.user = decoded;
            //console.log(decoded);
            next();
        } catch (ex) {
            // invalid token
            res.status(400).send(ex.message);
            console.log(ex.message)
        }
    }
}
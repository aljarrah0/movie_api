const config = require('config');

module.exports = () => {
    if (!config.get('jwtPrivateKey')) {
        console.log('FATAL ERROR');
    }
}


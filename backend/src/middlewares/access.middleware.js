const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY

const authenticateToken = (req, res, next) => {
    const getToken = req.header('Authorization');
    if (!getToken) return res.status(401).json({ error: 'Authentication failed' });
    const extractedToken = getToken.replace('Bearer ', '')

    jwt.verify(extractedToken, secretKey, (err, user) => {
        if (err) return res.status(403).json({ error: 'Forbidden', error: err });
        req.user = user;
        next();
    });
};


module.exports = authenticateToken
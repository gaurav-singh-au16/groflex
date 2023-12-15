const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Authentication failed' });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ error: 'Forbidden' });
        req.user = user;
        next();
    });
};


module.exports = authenticateToken
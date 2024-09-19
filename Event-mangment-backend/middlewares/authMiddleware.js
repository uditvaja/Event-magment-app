const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    let token = req.header('Authorization');

    if (token && token.startsWith('Bearer ')) {
        token = token.split(' ')[1];
    } else {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

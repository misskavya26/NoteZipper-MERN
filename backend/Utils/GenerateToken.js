const jwt = require('jsonwebtoken');

const GenerateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}

module.exports = GenerateToken;
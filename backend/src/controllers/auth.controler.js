const jwt = require('jsonwebtoken')
const User = require("../schemas/user.schema")

const secretKey = process.env.SECRET_KEY
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(500).json({ success: false, message: 'email & password required!' })
        }

        const findUser = await User.findOne({
            where: { email: email }
        })

        if (findUser) {
            const userData = {first_name: findUser.first_name, id: findUser.id, email:findUser.email} 
            // jwt token
            const token = jwt.sign(userData, secretKey);
          
            return res.status(500).json({ success: true, message: 'user login successfully!', token: token, data: findUser })
        } else {
            return res.status(500).json({ success: false, message: 'no user found!' })
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(500).json({ success: false, message: 'email required!' })
        }

        const findUser = await User.findOne({
            where: { email: email }
        })

        if (findUser) {
            const resetPassword = await User.update(
                { password },
                { where: { email: email } }
            )
            return res.status(500).json({ success: false, message: 'password reset successfully!' })
        } else {
            return res.status(500).json({ success: false, message: 'no user found with this email!' })
        }

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

module.exports = { login, forgotPassword }
const User = require("../schemas/user.schema")

const getUser = async (req, res) => {

    try {
        const users = await User.findAll(
            {
                attributes: ["id", "first_name", "last_name", "gender", "dob", "city", "zip", "interest", "profile_image"],
                
            }
        )
        return res.status(200).json({ success: true, data: users })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

module.exports = {getUser}
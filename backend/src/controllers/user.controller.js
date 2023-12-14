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

const registerUser = async (req, res) => {
    try {
        const { first_name, last_name, gender, dob, city, zip, interest, profile_image, password } = req.body

        if (!first_name || !last_name || !gender || !dob || !city || !zip) {
            return res.status(500).json({ success: false, message: 'fill all required fields!' })
        }

        const addUser = await User.create(
            {
                first_name,
                last_name,
                gender,
                dob,
                city,
                zip,
                interest,
                profile_image,
                password
            }
        )

        return res.status(201).json({ success: true, message: 'User Added Successfully!' })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

const updateUser = async (req, res) => {
    try {
        const { id, first_name, last_name, gender, dob, city, zip, interest, profile_image, password } = req.body
        const updateUser = await User.update(
            {
                first_name,
                last_name,
                gender,
                dob,
                city,
                zip,
                interest,
                profile_image,
                password
            },
            {
                where: { id: id }
            }
        )

        return res.status(200).json({ success: true, message: 'User updated Successfully!' })

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

const removeUser = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(500).json({ success: false, message: 'user id is required!' })
        }

        const removeUser = await User.destroy({
            where: { id: id }
        })
        return res.status(200).json({ success: true, message: 'User removed Successfully!', data: removeUser })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}


module.exports = { getUser, registerUser, updateUser, removeUser }
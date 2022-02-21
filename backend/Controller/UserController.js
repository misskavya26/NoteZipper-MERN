const asyncHandler = require('express-async-handler');
const User = require('../Models/UserModel');
const GenerateToken = require('../Utils/GenerateToken');

const UserRegister = asyncHandler(async (req, res) => {
    const { name, email, password, picture } = req.body;

    const UserExists = await User.findOne({ email });

    if (UserExists) {
        res.status(400);
        throw new Error('User Already Exists!');
    }

    const UserCreate = await User.create({
        name, email, password, picture
    });


    if (UserCreate) {
        res.status(201).json({
            _id: UserCreate._id,
            name: UserCreate.name,
            email: UserCreate.email,
            isAdmin: UserCreate.isAdmin,
            picture: UserCreate.picture,
            token: GenerateToken(UserCreate._id)
        })
    } else {
        res.status(400);
        throw new Error('Error Occuried!');
    }
});

const UserLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const UserExists = await User.findOne({ email });

    if (UserExists && (await UserExists.matchPassword(password))) {
        res.json({
            _id: UserExists._id,
            name: UserExists.name,
            email: UserExists.email,
            isAdmin: UserExists.isAdmin,
            picture: UserExists.picture,
            token: GenerateToken(UserExists._id)

        })
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }

});

const UserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.picture = req.body.picture || user.picture;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            picture: updatedUser.picture,
            isAdmin: updatedUser.isAdmin,
            token: GenerateToken(updatedUser._id)
        })
    }
    else {
        res.status(404);
        throw new Error('User not Found');
    }

})

module.exports = { UserRegister, UserLogin, UserProfile };
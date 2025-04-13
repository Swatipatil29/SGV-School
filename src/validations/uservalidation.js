const User = require("../models/usermodel")

const userValidationSchema = {
    email: {
        notEmpty: {
            errorMessage: "Email cannot be empty"
        },
        isEmail: {
            errorMessage: "Email should be in proper format"
        },
        custom: {
            options: async (value) => {
                const user = await User.findOne({ email: value });
                if (!user) {
                    return true;
                }
                throw new Error('Email is already registered');
            }
        }
    },

    password: {
        notEmpty: {
            errorMessage: "Password cannot be empty"
        },
        isLength: {
            options: { min: 8, max: 128 },
            errorMessage: "Password must be between 8 and 128 characters"
        }
    },

    confirmpassword: {
        notEmpty: {
            errorMessage: "Confirm password cannot be empty"
        },
        custom: {
            options: (value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Confirm password does not match password');
                }
                return true;
            }
        }
    },

    firstname: {
        notEmpty: {
            errorMessage: "First name cannot be empty"
        },
        isLength: {
            options: { min: 4 },
            errorMessage: "First name must be at least 4 characters"
        }
    },

    lastname: {
        notEmpty: {
            errorMessage: "Last name cannot be empty"
        },
        isLength: {
            options: { min: 4 },
            errorMessage: "Last name must be at least 4 characters"
        }
    },

    phonenumber: {
        notEmpty: {
            errorMessage: "Phone number cannot be empty"
        },
        isLength: {
            options: { min: 10, max: 10 },
            errorMessage: "Phone number must be exactly 10 digits"
        },
        isNumeric: {
            errorMessage: "Phone number must contain only numbers"
        }
    },

    role: {
        notEmpty: {
            errorMessage: "Role cannot be empty"
        },
        isIn: {
            options: [["Manager", "Principle", "Teacher", "User", "General"]],
            errorMessage: "Role must be either Teacher, Student, or Principle"
        }
    }
};



const userLoginValidationSchema={
    email:{
        notEmpty:{
            errorMessage:'email should be valid'
        },
        isEmail:{
            errorMessage:'invalid email format'
        }
    },
    password:{
        notEmpty:{
            errorMessage:'password is required'
        },
        isLength:{
            options:{min:8,max:128},
            errorMessage:'password should be 8 to 128 charecters'
        }
    }
}



module.exports = {
  userValidationSchema : userValidationSchema,
  userLoginValidationSchema: userLoginValidationSchema,
}
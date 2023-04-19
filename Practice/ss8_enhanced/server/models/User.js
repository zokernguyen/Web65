import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 30,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        // validate: {
        //     validator: function (value) {
        //         // Regular expression to match password format
        //         const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;
        //         return passwordRegex.test(value);
        //     },
        //     message: props => `${props.value} is not a valid password!`
        // }
    },

    role: {
        type: String,
        default: "user",
    }

},
    // { collection: "students" }
);

const User = mongoose.model("User", userSchema, 'users');
//By default, mongooes has an implicit pluralize mechanism to read the model name (1st arg, "User") and find a collection with name suitable to it to set that collection to be the default place to save new model(User =(pluralize)=> users / matched with "users" collection). The 3rd arg "users" and option {collection: 'myCollection} in the schema can be use to explicitly set the collection to save new doc.

export default User;
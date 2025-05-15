const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    registro: { type: Date, default: Date.now },
    favoritos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Work' }],
    isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 8 },
  role: { type: String, enum: ['Admin', 'ResponsableRH', 'Employe'] },
  isActive: { type: Boolean, default: false },
  connecte: { type: Boolean, default: false }
}, { timestamps: true });

// Hash password avant sauvegarde
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    this.isActive = false;
    next();
  } catch (error) {
    next(error);
  }
});

// Méthode statique login
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("incorrect email");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("incorrect password");

  return user;
};

module.exports = mongoose.model("user", userSchema);

const jwt = require("jsonwebtoken");
const userModel = require("../models/userSchema");

const requireAuthUser = (req, res, next) => {
  
  const token = req.cookies.jwt_token;  //partie 1 postman
  //console.log("token", token); //token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODg5OWI0ZDViODAzM2UxY2M1MTNiMyIsImlhdCI6MTY4Njc1MzQ4NCwiZXhwIjoxNjg2NzYwNjg0fQ.KPnsNPjL0PS3oyZ5l3mMC9GUc0ymgheVr-FYt_31pN0
  
  //const authHeader = req.headers.authorization; //partie2 => non postman
  // Middleware d'authentification
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Non authentifié' });

    const decoded = jwt.verify(token, 'net 9antra25 secret');
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Session invalide' });
  }
};

// Appliquez-le à vos routes
router.get('/:id', authMiddleware, getEmployeById);
router.post('/', authMiddleware, createEmploye);
router.put('/:id', authMiddleware, updateEmploye);
  //const token = authHeader && authHeader.split(" ")[1]; //Partie2
  
  if (token) {
    jwt.verify(token, "jwt token SECRET", async (err, decodedToken) => {
      if (err) {
        console.log("il ya une erreur au niveau du token", err.message);
        res.json("/Problem_token");
      } else {
        req.user = await userModel.findById(decodedToken.id);
        console.log("user", req.user); //user { _id: new ObjectId("648899b4d5b8033e1cc513b3"), nom: 'admin', prenom: 'admin', email: '
        next();
      }
    });
  } else {
    res.json("/pas_de_token");
  }
};
module.exports = { requireAuthUser };
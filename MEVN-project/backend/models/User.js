// Importuj niezbędne moduły Sequelize
const { DataTypes } = require("sequelize");

// Definiuj model dla użytkownika
const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Synchronizuj model z bazą danych (utwórz tabelę w bazie danych, jeśli nie istnieje)
User.sync().then(() => {
  console.log("Model User został zsynchronizowany z bazą danych");
});

// Eksportuj model User
module.exports = User;

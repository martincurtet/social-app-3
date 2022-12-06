module.exports = (sequelize, DataType) => {
  const User = sequelize.define(
    'user',
    {
      firstName: {
        type: DataType.STRING
      },
      lastName: {
        type: DataType.STRING
      },
      email: {
        type: DataType.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataType.STRING
      }
    },
    {
      createdAt: 'created',
      updatedAt: 'modified'
    }
  )
  User.associate = (models) => {
    User.hasMany(models.post, { foreignKey: 'user_id' })
    User.hasMany(models.like, { foreignKey: 'user_id' })
    User.hasMany(models.comment, { foreignKey: 'user_id' })
    User.hasMany(models.token, { foreignKey: 'user_id' })
  }
  return User
}

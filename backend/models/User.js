module.exports = (sequelize, DataType) => {
  const User = sequelize.define(
    'user',
    {
      username: {
        type: DataType.STRING,
        allowNull: false
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
  }
  return User
}

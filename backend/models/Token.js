module.exports = (sequelize, DataType) => {
  const Token = sequelize.define(
    'token',
    {
      token: {
        type: DataType.STRING,
        allowNull: false,
        unique: true
      },
      active: {
        type: DataType.BOOLEAN,
        allowNull: false
      }
    },
    {
      createdAt: 'created',
      updatedAt: 'modified'
    }
  )
  return Token
}
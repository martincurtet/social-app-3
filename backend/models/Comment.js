module.exports = (sequelize, DataType) => {
  const Comment = sequelize.define(
    'comment',
    {
      message: {
        type: DataType.STRING,
        allowNull: false
      }
    },
    {
      createdAt: 'created',
      updatedAt: 'modified'
    }
  )
  return Comment
}

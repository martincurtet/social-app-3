module.exports = (sequelize, DataType) => {
  const Post = sequelize.define(
    'post',
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
  return Post
}

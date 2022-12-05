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
  Post.associate = (models) => {
    Post.hasMany(models.like, { foreignKey: 'post_id' })
    Post.hasMany(models.comment, { foreignKey: 'post_id' })
  }
  return Post
}

module.exports = (sequelize, DataType) => {
  const Like = sequelize.define(
    'like',
    {},
    {
      timestamps: false
    }
  )
  return Like
}

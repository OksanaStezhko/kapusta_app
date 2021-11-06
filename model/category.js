const { Schema, model } = require('mongoose')

const categorySchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Name of category is required'],
    },
    sign: {
      type: String,
      default: 'expenses',
    },
  },
  { versionKey: false, timestamps: true }
)

const Category = model('category', categorySchema)

module.exports = Category

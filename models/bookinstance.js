const mongoose = require("mongoose");
const formatDate = require("../helpers/formatDate");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true }, // reference to the associated book
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Maintenance", "Loaned", "Reserved"],
    default: "Maintenance",
  },
  due_back: { type: Date, default: Date.now },
});

// Virtual for bookinstance's URL
BookInstanceSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/bookinstance/${this._id}`;
});

BookInstanceSchema.virtual("due_back_formatted").get(function () {
  return formatDate(this.due_back);
});

// returns due_back in YYYY-MM-DD
BookInstanceSchema.virtual("due_back_yyyy_mm_dd").get(function () {
  return this.due_back
    ? DateTime.fromJSDate(new Date(this.due_back)).toFormat("yyyy-MM-dd")
    : "";
});

// Export model
module.exports = mongoose.model("BookInstance", BookInstanceSchema);

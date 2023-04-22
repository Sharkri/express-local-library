const { DateTime } = require("luxon");

module.exports = function formatDate(date) {
  return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED);
};

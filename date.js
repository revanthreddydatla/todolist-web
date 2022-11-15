// module.exports = getDate; for single export

module.exports.getDate = getDate;

function getDate(){
  let date = new Date();
  let dateOptions = {
    weekday: "long"
  }
  let day = date.toLocaleDateString("en-US",dateOptions);
  return day;
}

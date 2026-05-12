// setup
const DAYS = 6;
const LIMIT = 30;
let studentReport = [11, 42, 33, 64, 29, 37, 44];


// for loop
for (let i = 0; i < studentReport.length; i++) {
  if (studentReport[i] < LIMIT) {
    console.log(studentReport[i]);
  }
}
// Output: 11, 29


// while loop
let i = 0;
while (i < studentReport.length) {
  if (studentReport[i] < LIMIT) {
    console.log(studentReport[i]);
  }
  i++;
}
// Output: 11, 29


// forEach loop
studentReport.forEach(function(value) {
  if (value < LIMIT) {
    console.log(value);
  }
});
// Output: 11, 29


// for...in loop
for (let index in studentReport) {
  if (studentReport[index] < LIMIT) {
    console.log(studentReport[index]);
  }
}
// Output: 11, 29


// Dynamic day names for the next DAYS days
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const today = new Date();

for (let i = 1; i <= DAYS; i++) {
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + i);
  console.log(dayNames[nextDay.getDay()]);
}
// Starting from today (Monday, May 11):
// Output: Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
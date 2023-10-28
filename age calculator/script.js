const calculate = document.getElementById("Calculate");

calculate.addEventListener("click", calculateAge);
function calculateAge(e) {
  const DOB = document.getElementById("birthDate").value;
  const TillDate = document.getElementById("tillDate").value;

  const birthDate = new Date(DOB);
  const tillDate = new Date(TillDate);

  //log bithdate and tilldate
  console.log(birthDate);
  console.log(tillDate);

  // Calculate the difference in milliseconds between the two dates
  const ageInMilliseconds = tillDate - birthDate;

  // Calculate the number of years, months, and days
  const ageInYears = tillDate.getFullYear() - birthDate.getFullYear();
  const ageInMonths = tillDate.getMonth() - birthDate.getMonth();
  const ageInDays = tillDate.getDate() - birthDate.getDate();

  //log all ageInyears and ageInmonths and ageIndays
  console.log(ageInYears);
  console.log(ageInMonths);
  console.log(ageInDays);

  // If the day of birth is after the day in the tillDate, adjust months and days
  if (ageInDays < 0) {
    ageInMonths--;
    ageInDays += new Date(
      tillDate.getFullYear(),
      tillDate.getMonth(),
      0
    ).getDate();
  }

  // If the birth month is after the tillDate month, adjust years and months
  if (ageInMonths < 0) {
    ageInYears--;
    ageInMonths += 12;
  }

  // Display the calculated age in the HTML
  const ageResult = document.getElementById("result");
  ageResult.innerHTML = `
      <div class="col1">
        <div class="row">${ageInYears} Years</div>
        <div class="row2">${ageInMonths} Months</div>
        <div class="row3">${ageInDays} Days</div>
      </div>
    `;
}

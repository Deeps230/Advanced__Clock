let selectedTimezone = 'local';

function updateClock() {
    const now = new Date();
    let localTime;

    // Adjust the time based on the selected timezone
    if (selectedTimezone === 'local') {
        localTime = now; // Local time
    } else {
        localTime = new Date(now.toLocaleString('en-US', { timeZone: selectedTimezone }));
    }

    const dayname = localTime.getDay(),
          month = localTime.getMonth(),
          date = localTime.getDate(),
          year = localTime.getFullYear(),
          hours24 = localTime.getHours(),
          min = localTime.getMinutes(),
          sec = localTime.getSeconds();
          
    let period = "AM";
    let hours = hours24;

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // 12-hour format logic
    if (hours >= 12) {
        period = "PM";
    }
    if (hours == 0) {
        hours = 12;
    } else if (hours > 12) {
        hours -= 12;
    }

    // Add leading zeros for single-digit hours, minutes, seconds
    hours = (hours < 10) ? "0" + hours : hours;
    const formattedMin = (min < 10) ? "0" + min : min;
    const formattedSec = (sec < 10) ? "0" + sec : sec;

    // Update the clock HTML
    document.querySelector("#dayname").innerHTML = days[dayname];
    document.querySelector("#month").innerHTML = months[month];
    document.querySelector("#daynum").innerHTML = date;
    document.querySelector("#year").innerHTML = year;
    document.querySelector("#hour").innerHTML = hours;
    document.querySelector("#minutes").innerHTML = formattedMin;
    document.querySelector("#seconds").innerHTML = formattedSec;
    document.querySelector("#period").innerHTML = period;

    // Greeting based on the time of day
    let greeting;
    if (hours24 < 12) {
        greeting = "Good Morning!";
    } else if (hours24 < 18) {
        greeting = "Good Afternoon!";
    } else {
        greeting = "Good Evening!";
    }
    document.querySelector("#greeting").innerHTML = greeting;
}

function initClock() {
    updateClock(); // Initial call
    setInterval(updateClock, 1000); // Update every second (1000ms)
}

// Handle timezone selection
document.querySelector("#timezone").addEventListener("change", function() {
    selectedTimezone = this.value;
    updateClock(); // Update clock immediately on change
});

initClock(); // Start the clock

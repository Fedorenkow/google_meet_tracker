let studentDetails = new Map();
let studentsNameSet = new Set();
let ui_buttons;
let totalClassDuration = 0;
let StartTime = new Date()
    .toLocaleTimeString();
let goingToStop = 0;
let isAttendanceWorking = false;
let buttonClickInd = 0;

function start() {
    startAttendanceTracker = setInterval(attendanceTracker, 1000);
}

let stop = STOP = function() {
    clearInterval(startAttendanceTracker);
    let meetingCode = window.location.pathname.substring(1);
    let date = new Date();
    let dd = date.getDate();
    let mm = date.toLocaleString('default', {
        month: 'short'
    })
    let yyyy = date.getFullYear();
    date = dd + "-" + mm + "-" + yyyy;
    let sortedtstudentsNameSet = [];
    let studentsAttendedDuration = [];
    let studentsJoiningTime = [];
    let mapKeys = studentDetails.keys();
    for (i = 0; i < studentDetails.size; i++) {
        let studentName = mapKeys.next()
            .value;
        sortedtstudentsNameSet.push(studentName);
    }
    sortedtstudentsNameSet.sort();
    for (studentName of sortedtstudentsNameSet) {
        let data = studentDetails.get(studentName);
        studentsAttendedDuration.push(data[0]);
        studentsJoiningTime.push(data[1]);
    }
    var newRecord = {
        meetingCode: meetingCode,
        date: date,
        attendanceStartTime: StartTime,
        attendanceStopTime: new Date()
            .toLocaleTimeString(),
        studentNames: sortedtstudentsNameSet,
        attendedDuration: studentsAttendedDuration,
        joiningTime: studentsJoiningTime,
        meetingDuration: totalClassDuration
    }
    console.log(newRecord);

    fetch("https://sheet.best/api/sheets/2198ff4c-2996-42ac-b4ea-5f14fb99c2db", {
    method: "POST",
    mode: "cors",
    headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ 
    meetingCode: meetingCode,
    date: date,
    attendanceStartTime: StartTime,
    attendanceStopTime: new Date()
    .toLocaleTimeString(),
    studentNames: sortedtstudentsNameSet,
    attendedDuration: studentsAttendedDuration,
    joiningTime: studentsJoiningTime,
    meetingDuration: totalClassDuration

  }),
})
  .then((r) => r.json())
  .then((data) => {
    // The response comes here
    console.log(data);
  })
  .catch((error) => {
    // Errors are reported there
    console.log(error);
  });
}

function attendanceTracker() {
    let currentlyPresentStudents = document.getElementsByClassName("zWGUib");
    if (currentlyPresentStudents.length > 0) {
        studentsNameSet.clear();
        let numberOfjoinedStudents = -1;
        try {
            numberOfjoinedStudents = Number(document.getElementsByClassName("uGOf1d")[0].innerHTML);
            numberOfjoinedStudents = Number.isInteger(numberOfjoinedStudents) && numberOfjoinedStudents > 0 && numberOfjoinedStudents != -1 ? numberOfjoinedStudents : currentlyPresentStudents.length;
        } catch (e) {
            numberOfjoinedStudents = currentlyPresentStudents.length;
        }
        for (i = 0; i < numberOfjoinedStudents; i++) {
            try {
                studentsNameSet.add(currentlyPresentStudents[i].innerHTML.toUpperCase());
            } catch (exception) {
            }
        }
        for (studentName of studentsNameSet) {
            if (studentDetails.has(studentName)) {
                let data = studentDetails.get(studentName);
                data[0] += 1;
                studentDetails.set(studentName, data);
            } else {
                let joiningTime = new Date()
                    .toLocaleTimeString();
                let currStatus = 1;
                let data = [];
                data.push(currStatus);
                data.push(joiningTime);
                studentDetails.set(studentName, data);
            }
        }
        if (((studentsNameSet.size) - 1) == -1) {
            goingToStop += 1;
        } else {
            newButton.innerHTML = "Tracking Started<br>" + toTimeFormat(totalClassDuration) + " ago<br>" + "Click To Generate Report";
            totalClassDuration += 1;
            goingToStop = 0;
        }
        if (goingToStop == 2) {
            isAttendanceWorking = false;
            newButton.innerHTML = "Track Attendance";
            newButton.style.border = "2px solid #C5221F";
            goingToStop = 0;
            stop();
        }
    } else {
        try {
            ui_buttons[buttonClickInd % ui_buttons.length].click();
            buttonClickInd += 1;
            goingToStop = 0;
        } catch (error) {
            goingToStop += 1;
            if (goingToStop == 2) {
                isAttendanceWorking = false;
                newButton.innerHTML = "Track Attendance";
                newButton.style.border = "2px solid #C5221F";
                goingToStop = 0;
                stop();
            }
        }
    }
}

let newButton = document.getElementById("btn");
newButton.addEventListener("click", start);

let tryInsertingButton = setInterval(insertButton, 1000);
function insertButton(){
    newButton.addEventListener("click", function() {
        try{
            ui_buttons = document.getElementsByClassName("VfPpkd-kBDsod NtU4hc");
            //ui_buttons[1].click();
            document.getElementsByClassName("lefKC")[0].appendChild(newButton);
            document.getElementById('newButton')
        if (!isAttendanceWorking) {
            isAttendanceWorking = true;
            newButton.innerHTML = "Click To<br>Generate Attendance Report";
            newButton.style.border = "1px solid white";
            newButton.style.backgroundColor = "#00796b";
            StartTime = new Date()
                .toLocaleTimeString();
            studentDetails.clear();
            studentsNameSet.clear();
            totalClassDuration = 0;
            start();
        } else if(isAttendanceWorking) {
            isAttendanceWorking = false;
            newButton.innerHTML = "Track Attendance";
            newButton.style.border = "1px solid white";
            newButton.style.backgroundColor = "#C5221F";
          stop();
        }
         clearInterval(tryInsertingButton);
    }catch{error}
      });
}

  

function toTimeFormat(time) {
    hh = Math.floor(time / 3600);
    time = time - (hh * 3600);
    mm = Math.floor(time / 60);
    time = time - (mm * 60);
    ss = time;
    if (hh == 0) return mm + " min " + ss + "s";
    else return hh + " hr " + mm + " min " + ss + "s";
}
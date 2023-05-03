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
    

  const meetCodeOutput = meetingCode
  const dateOutput = date;
  const startTimeOutput = StartTime;
  const stopTimeOutput = new Date().toLocaleTimeString();
  const studentNamesOutput = sortedtstudentsNameSet;
  const studentsAttendedDurationOutput = studentsAttendedDuration;
  const studentsJoiningTimeOutput = studentsJoiningTime;
    

  // Створити новий текстовий файл з отриманим текстом
  const fileToSave = new Blob(["Код міта: ",meetCodeOutput,
  "\n","Дата відслідковування: ",dateOutput,
  "\n","Година початку відслідковування: ",startTimeOutput,
  "\n","Година закінчення відсклідковування: ",stopTimeOutput,
  "\n\n",
  studentNamesOutput.join('\n'), "   " , studentsAttendedDurationOutput.join(''),"   ", studentsJoiningTimeOutput.join('')


],
  {type: 'text/plain'});
  
  // Створити посилання на файл для завантаження
  const downloadLink = document.createElement('a');
  downloadLink.download = 'Звіт відслідковування.txt';
  downloadLink.href = window.URL.createObjectURL(fileToSave);
  
  // Додати посилання на сторінку та автоматично його клікнути
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
// Додати обробник події на кнопку збереження
saveButton.addEventListener('click', saveTextToFile);
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
            newButton.innerHTML = "Tracking Started<br>" + toTimeFormat(totalClassDuration) + " ago<br>";
            totalClassDuration += 1;
            goingToStop = 0;
        }
        if (goingToStop == 2) {
            isAttendanceWorking = false;
            newButton.innerHTML = "Track Attendance";
            newButton.style.border = "2px solid #8142f5";
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
                newButton.style.border = "2px solid #8142f5";
                goingToStop = 0;
                stop();
            }
        }
    }
}
// Adding button to meet ui
let newButton = document.createElement("button");
newButton.id = "newButton";
newButton.className = "Jyj1Td CkXZgc";
newButton.type = "button";
newButton.innerHTML = "Start tracking";
newButton.style.border = "1px solid white";
newButton.style.backgroundColor = "#8142f5";
newButton.style.color = "white";
newButton.style.borderRadius = "2px";
newButton.style.padding = "auto auto auto auto";
newButton.style.height = "100px";
newButton.style.width = "150px";
newButton.style.borderRadius = "10px";


let tryInsertingButton = setInterval(insertButton, 1000);
function insertButton() {
    try {
        ui_buttons = document.getElementsByClassName("VfPpkd-kBDsod NtU4hc");
        //ui_buttons[1].click();
        document.getElementsByClassName("lefKC")[0].appendChild(newButton);
        document.getElementById('newButton')
            .addEventListener('click', function() {
                if (!isAttendanceWorking) {
                    isAttendanceWorking = true;
                    newButton.innerHTML = "Stop tracking";
                    newButton.style.border = "1px solid white";
                    newButton.style.backgroundColor = "#00796b";
                    StartTime = new Date()
                        .toLocaleTimeString();
                    studentDetails.clear();
                    studentsNameSet.clear();
                    totalClassDuration = 0;
                    start();
                } else if (isAttendanceWorking) {
                    isAttendanceWorking = false;
                    newButton.innerHTML = "Start tracking";
                    newButton.style.border = "1px solid white";
                    newButton.style.backgroundColor = "#8142f5";
                    stop();
                }
            });
        clearInterval(tryInsertingButton);
    } catch (error) {}
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
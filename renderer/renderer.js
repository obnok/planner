//  ---{   Navigation Bar   }---
document.addEventListener('DOMContentLoaded', function() {
    const edit = document.getElementById('nav-bar');
    edit.innerHTML = `
        <nav>
            <div class="uni">
                <ul id="nav-active" class="uni__holder default">    
                    <li><a href="index.html">Menu</a></li>
                    <li><a href="calendar.html">Calendar</a></li>
                    <li><a href="tasks.html">Tasks</a></li>
                    <li><a href="notes.html">Notes</a></li>
                    <li><a href="timers.html">Timers</a></li>
                    <li><a href="settings.html">Settings</a></li>
                </ul>
            <div>
        </nav>
    `;
    var navItem = document.getElementById('nav-active').children; 
    for(let i = 0; i < 6; i++) {
        if(document.title == navItem[i].firstChild.innerHTML) {
            navItem[i].firstChild.style.textDecoration = 'underline';
            navItem[i].firstChild.style.textDecorationColor = '#8b579f';
            navItem[i].firstChild.style.textUnderlineOffset = '3px';
        }
    }
})

//  ---{   Calendar Page   }---
let calendarEl;
let calendar;
let calendarName;
let dateStr;
let date;

function getEventDetails() {
    calendarName = document.getElementById('eventName').value
    dateStr = document.getElementById('eventDate').value
    date = new Date(dateStr + 'T00:00:00');

    if (!isNaN(date.valueOf())) {
        calendar.addEvent({
          title: calendarName,
          start: date,
          allDay: true
        });
      overlayOff()
      resetEventPrompt()
      } else {
        console.log('Invalid date.');
      }
}

function createCalendar() {
    calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        
        initialView: 'dayGridMonth',
        dayMaxEvents: true,
        selectable: true,
        googleCalendarApiKey: 'AIzaSyDQBM_jydsIATVSXj_IoaddW-izCStnWfw',
        events: [
            {
                title: 'Random Event',
                start: '2023-04-19'
            },
            {
                title: 'Another Event',
                start: '2023-04-24'
            }
        ],
        contentHeight: 'auto',
        headerToolbar: {
            left: 'addEventButton prev,next',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        customButtons: {
            addEventButton: {
              text: 'Add Event',
              click: function() {
                overlayOn()
              },
              editable: true
            }
          }
    });
    calendar.render();
}

function resetEventPrompt() {
    document.getElementById('eventName').value = ''
}

// ---{  Tasks Page  }---

function addTask() {
    const taskName = document.getElementById('taskName').value
    const task = document.createElement('li')
    const box = document.createElement('input')
    const div = document.createElement('div')

    box.setAttribute("type", "checkbox");

    task.classList.add('task-item')
    task.innerHTML = taskName

    div.classList.add('task-holder')

    div.appendChild(box)
    div.appendChild(task)
    document.getElementById('tasks').appendChild(div)

    document.getElementById('taskName').value = ''
}

//  ---{   Notes Page   }---
let quill;

const toolbarOptions = [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'font': [] }],
    ['bold', 'italic', 'underline'],
    [{align: ''}, {align: 'center'}, {align: 'right'}],
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'color': [] }, { 'background': [] }],
    ['image', 'clean'],
    ['button', 'export()']
]

function createQuill() {
    quill = new Quill('#editor', {
        modules: {
            toolbar: toolbarOptions,
        },
        theme: 'snow'
    })
}
function exportPDF() {
    var html = document.getElementById('editor').firstChild.innerHTML;
    html2pdf(html);
}

function overlayOn() {
    document.getElementById("overlay").style.display = "block";
}

function overlayOff() {
    document.getElementById("overlay").style.display = "none";
}
//  ---{   Timers Page   }---
let timer
let stopwatch
let kanban
let iterations

function startTimer(action) {
    const time = document.getElementById('timer-time').value
    let minutes = parseInt(time.split(':')[0])
    let seconds = parseInt(time.split(':')[1])

    if (action == 'stop') {
        clearTimeout(timer)
        return
    }

    if (action == 'reset') {
        clearTimeout(timer)
        document.getElementById('timer-time').value = '0:0'
        return
    }

    if (seconds == 0) {
        if (minutes == 0) {
            clearTimeout(timer)
            return
        }
        document.getElementById('timer-time').value = (minutes-1)+':59'
    } else if (seconds < 60) {
        document.getElementById('timer-time').value = minutes+':'+(seconds-1)
    } else {
        document.getElementById('timer-time').value = (minutes-1)+':59'
    }
    if (minutes < 0) {
        clearTimeout(timer)
        document.getElementById('timer-time').value = '0:0'
    } else {
        timer = setTimeout(startTimer, 1000)
    }
}

function startStopwatch(action) {
    const time = document.getElementById('stopwatch-time').value
    let minutes = parseInt(time.split(':')[0])
    let seconds = parseInt(time.split(':')[1])
    
    if (action == 'stop') {
        clearTimeout(stopwatch)
        return
    }

    if (action == 'reset') {
        clearTimeout(stopwatch)
        document.getElementById('stopwatch-time').value = '0:0'
        return
    }

    if(seconds > 59) {
        document.getElementById('stopwatch-time').value = (minutes+1)+':0'
        stopwatch = setTimeout(startStopwatch, 1000)
    } else {
        document.getElementById('stopwatch-time').value = minutes+':'+(seconds+1)
        stopwatch = setTimeout(startStopwatch, 1000)
    }
}

function startKanban(action) {
    const time = document.getElementById('kanban-time').value
    let minutes = parseInt(time.split(':')[0])
    let seconds = parseInt(time.split(':')[1])
    const minSec = minutes+':'+seconds
    iterations = parseInt(time.split(':')[2])
    
    if (action == 'stop') {
        clearTimeout(kanban)
        return
    }

    if (action == 'reset') {
        clearTimeout(kanban)
        document.getElementById('kanban-time').value = '15:0:0'
        return
    }

    if (iterations > 0) {
        if (seconds == 0) {
            if (minutes == 0) {
                iterations = iterations-1
                document.getElementById('kanban-time').value = '3:0:'+iterations
                kanban = setTimeout(startKanbanHelper, 1000)
                return
            }
            document.getElementById('kanban-time').value = (minutes-1)+':59:'+iterations    
        } else if (seconds < 60) {
            document.getElementById('kanban-time').value = minutes+':'+(seconds-1)+':'+iterations
        } else {
            document.getElementById('kanban-time').value = (minutes-1)+':59:'+iterations
        }
        if (minutes < 0) {
            clearTimeout(timer)
            document.getElementById('kanban-time').value = '15:0:0'
        } else {
            kanban = setTimeout(startKanban, 1000)
        }
    }
}

function startKanbanHelper() {
    const time = document.getElementById('kanban-time').value
    let minutes = parseInt(time.split(':')[0])
    let seconds = parseInt(time.split(':')[1])

    if (seconds == 0) {
        if (minutes == 0) {
            clearTimeout(kanban)
            document.getElementById('kanban-time').value = '15:0:'+iterations    
            kanban = setTimeout(startKanban, 1000)
            return
        }
        document.getElementById('kanban-time').value = (minutes-1)+':59:'+iterations
    } else if (seconds < 60) {
        document.getElementById('kanban-time').value = minutes+':'+(seconds-1)+':'+iterations
    } else {
        document.getElementById('kanban-time').value = (minutes-1)+':59:'+iterations
    }
    if (minutes < 0) {
        clearTimeout(kanban)
        document.getElementById('kanban-time').value = '0:0'
    } else {
        kanban = setTimeout(startKanbanHelper, 1000)
    }
}

// ---{    Settings    }---

function notification() {
    overlayOn()
}

//  ---{   Universal   }---

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = document.title;
    if (currentPage == "Calendar") { createCalendar(); } 
    else if (currentPage == "Notes") { createQuill(); }
    else if (currentPage == "Settings") { notification(); }
})
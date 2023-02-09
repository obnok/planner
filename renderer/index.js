// document.addEventListener('DOMContentLoaded', function() {
//     var calendarEl = document.getElementById('calendar');
//     var calendar = new FullCalendar.Calendar(calendarEl, {
//     headerToolbar: {
//         left: 'today prev,next',
//         center: 'title',
//       initialView: 'dayGridMonth',
//       selectable: true
//     },
//     });
//     calendar.render();
//   });

document.addEventListener('DOMContentLoaded', function() {
    console.log('Please');
    var edit = document.getElementById('nav-bar');
    edit.innerHTML = `
        <nav>
            <ul id="uni" class="uni default">
            <li><a href="index.html">Menu</a></li>
            <li><a href="calendar.html">Calendar</a></li>
            <li><a href="tasks.html">Tasks</a></li>
            <li><a href="notes.html">Notes</a></li>
            <li><a href="timers.html">Timers</a></li>
            <li><a href="settings.html">Settings</a></li>
            </ul>
        </nav>
        `;
    var navItem = document.getElementById('uni').children; 
    for(let i = 0; i <= 5; i++) {
        if(document.title == navItem[i].firstChild.innerHTML) {
            navItem[i].style.backgroundColor = '#8b579f';
        }
    }
});
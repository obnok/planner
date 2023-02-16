document.addEventListener('DOMContentLoaded', function() {
    // Loads navigation bar on each page
    var edit = document.getElementById('nav-bar');
    edit.innerHTML = `
        <nav>
            <ul id="nav-active" class="uni default">
            <li><a href="index.html">Menu</a></li>
            <li><a href="calendar.html">Calendar</a></li>
            <li><a href="tasks.html">Tasks</a></li>
            <li><a href="notes.html">Notes</a></li>
            <li><a href="timers.html">Timers</a></li>
            <li><a href="settings.html">Settings</a></li>
        </ul>
    </nav>
    `;
    var navItem = document.getElementById('nav-active').children; 
    for(let i = 0; i < 6; i++) {
        if(document.title == navItem[i].firstChild.innerHTML) {
            navItem[i].style.backgroundColor = '#8b579f';
        }
    }
});

if (document.title == 'Calendar') {
    document.addEventListener('DOMContentLoaded', function() {
        // Loads the calendar
        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            editable: true,
            selectable: true,
            headerToolbar: {
                left: 'today prev,next',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            events: [
                {
                    title: 'Test Event With a Long Name',
                    start: '2023-02-01'
                }
            ]
        });
        calendar.render();
        });
}

if (document.title == 'Notes') {
    // Provides Note page functionality
    const textarea = document.getElementsByTagName('textarea');

    function decrease(e) {
        let value = e.value - 1; 
        textarea.style.fontSize = value + "px";
    }

    function resize(e) {
        let value = e.value;
        textarea.style.fontSize = value + "px";
    }

    function increase(e) {
        let fontSize = document.getElementById('font-size');
        let value = +fontSize.value + 1;
        fontSize.value = value;
        textarea[0].style.fontSize = value + "px";
    }
}
function activeNav() {
    var navItem = document.getElementById('uniNav').children; 
    console.log(document.title)
    for(let i = 0; i < 6; i++) {
        console.log(navItem[i].firstChild.innerHTML)
        if(document.title == navItem[i].firstChild.innerHTML) {
            navItem[i].style.backgroundColor = '#8b579f';
        }
    }
}

function loadNav() {
    const template = document.createElement('template');
    template.innerHTML = `
    <nav>
        <ul id="uniNav" class="uni default">
            <li><a href="index.html">Menu</a></li>
            <li><a href="calendar.html">Calendar</a></li>
            <li><a href="tasks.html">Tasks</a></li>
            <li><a href="notes.html">Notes</a></li>
            <li><a href="timers.html">Timers</a></li>
            <li><a href="settings.html">Settings</a></li>
        </ul>
    </nav>
    `;
    document.getElementById('loadNav').appendChild(template.content);
    activeNav();
}

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
        left: 'today prev,next',
        center: 'title',
      initialView: 'dayGridMonth',
      selectable: true,
    });
    calendar.render();
  });
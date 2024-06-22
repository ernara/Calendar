var events = [];
//var daysUntilSeptember = 0;
//var daysUntilDecember = 0;

function toggleCountdown(event) {
    event.preventDefault(); // Prevent default link behavior (if used as a link)

    var countdownContent = document.getElementById('countdownContent');
    var countdownContainer = document.querySelector('.countdown-container');

    if (countdownContent.style.display === 'none') {
        countdownContent.style.display = 'block';
        countdownContainer.classList.add('show');
    } else {
        countdownContent.style.display = 'none';
        countdownContainer.classList.remove('show');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    function GenerateEvent(startDate, eventTitle) {
        var endDate = new Date('2024-12-31');
        
        while (startDate <= endDate) {
            events.push({
                title: eventTitle,
                start: startDate.toISOString().split('T')[0]
            });
            startDate.setDate(startDate.getDate() + 12); 
        }
    }

    function countEventsFromUntil(fromDate, untilDate) {
        var count = 0;
    
        for (var i = 0; i < events.length; i++) {
            var eventDate = new Date(events[i].start);

            if (eventDate > fromDate && untilDate > eventDate) {
                count++;
            }
        }

        return count;
    }

    function daysUntil(untilDate) {
        const target = new Date(untilDate);
    
        const today = new Date();
    
        const difference = target.getTime() - today.getTime();
    
        const days = Math.ceil(difference / (1000 * 3600 * 24));
        return days;
    }



    DaysUntilSeptember= countEventsFromUntil(new Date(), new Date('2024-09-01'));
    DaysUntilDecember= countEventsFromUntil(new Date(), new Date('2024-12-01'));

    GenerateEvent(new Date('2024-01-01'), 'N1');
    GenerateEvent(new Date('2024-01-02'), 'N2');
    GenerateEvent(new Date('2024-01-03'), 'N3');
    GenerateEvent(new Date('2024-01-08'), 'R1');
    GenerateEvent(new Date('2024-01-09'), 'R2');
    GenerateEvent(new Date('2024-01-10'), 'R3');
    
    
    document.getElementById("daysUntilSeptember").innerText = daysUntil(new Date('2024-09-01'));
    document.getElementById("daysUntilDecember").innerText = daysUntil(new Date('2024-12-01'));
    document.getElementById("workDaysUntilSeptember").innerText = countEventsFromUntil(new Date(), new Date('2024-09-01'));
    document.getElementById("workDaysUntilDecember").innerText = countEventsFromUntil(new Date(), new Date('2024-12-01'));


    var calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'lt', 
        initialView: 'dayGridMonth',
        events: events
    });

    calendar.render();
});

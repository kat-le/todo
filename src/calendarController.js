import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isToday,
    addMonths,
    subMonths
} from "date-fns";

import "./calendar.css"

let currentMonth = new Date();

function renderCalendar() {
    const date = document.querySelector(".day")
    const today = new Date();
    date.textContent = format(today, "MM/dd/yyyy")


    const container = document.querySelector(".calendar");

    container.innerHTML = "";

     // Month header
    const header = document.createElement("div");
    header.classList.add("calendar-header");

    const prevBtn = document.createElement("button");
    prevBtn.className = "prev-btn"
    // prevBtn.textContent = "<";

    const title = document.createElement("p");
    title.textContent = format(currentMonth, "MMMM yyyy");

    const nextBtn = document.createElement("button");
    nextBtn.className = "next-btn"
    // nextBtn.textContent = ">";

    header.append(prevBtn, title, nextBtn);

    container.appendChild(header);

     // Weekday names
    const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    const weekdayRow = document.createElement("div");
    weekdayRow.classList.add("weekday-row");

    weekdays.forEach(day => {
        const cell = document.createElement("div");
        cell.classList.add("weekday");
        cell.textContent = day;
        weekdayRow.appendChild(cell);
    });

     container.appendChild(weekdayRow);

    // Calendar grid
    const grid = document.createElement("div");
    grid.classList.add("calendar-grid");

    const firstDay = startOfMonth(currentMonth);
    const lastDay = endOfMonth(currentMonth);

    const calendarStart = startOfWeek(firstDay);
    const calendarEnd = endOfWeek(lastDay);

    const days = eachDayOfInterval({
        start: calendarStart,
        end: calendarEnd
    });

    days.forEach(day => {
            const cell = document.createElement("div");
            cell.classList.add("calendar-day");
            cell.textContent = format(day, "d");

            if (!isSameMonth(day, currentMonth)) {
                cell.classList.add("outside-month");
            }

            if (isToday(day)) {
                cell.classList.add("today");
                cell.textContent = "";
                const circle = document.createElement("div")
                circle.textContent = format(day, "d")
                circle.className = "today-circle"
                cell.appendChild(circle)
            }

            grid.appendChild(cell);
        });

        container.appendChild(grid);

    prevBtn.addEventListener("click", () => {
        currentMonth = subMonths(currentMonth, 1);
        renderCalendar();
    });

    nextBtn.addEventListener("click", () => {
        currentMonth = addMonths(currentMonth, 1);
        renderCalendar();
    });
}

export default {
    renderCalendar
};
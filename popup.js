document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const timerDisplay = document.getElementById('timer');
    const startButton = document.getElementById('start');
    const resetButton = document.getElementById('reset');
    const breakCountDisplay = document.getElementById('break-count');
    const nextBreakDisplay = document.getElementById('next-break');

    let timerInterval;
    let minutes = 25;
    let seconds = 0;
    let isTimerRunning = false;
    let pomodoroCount = 0;

    // Function to update the timer display
    function updateTimerDisplay() {
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Function to start the timer
    function startTimer() {
        if (!isTimerRunning) {
            isTimerRunning = true;
            timerInterval = setInterval(updateTime, 1000);
        }
    }

    // Function to update the time every second
    function updateTime() {
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(timerInterval);
                isTimerRunning = false;
                // Handle Pomodoro completion
                pomodoroCount++;
                breakCountDisplay.textContent = `Pomodoros Completed: ${pomodoroCount}`;
                // Start the break after 4 Pomodoros
                if (pomodoroCount % 4 === 0) {
                    minutes = 15; // Long break
                    nextBreakDisplay.textContent = 'Next Break: Long Break';
                } else {
                    minutes = 5; // Short break
                    nextBreakDisplay.textContent = 'Next Break: Short Break';
                }
                startTimer();
            } else {
                minutes--;
                seconds = 59;
            }
        } else {
            seconds--;
        }
        updateTimerDisplay();
    }

    // Function to reset the timer
    function resetTimer() {
        clearInterval(timerInterval);
        minutes = 25;
        seconds = 0;
        isTimerRunning = false;
        updateTimerDisplay();
    }

    // Event listeners for start and reset buttons
    startButton.addEventListener('click', startTimer);
    resetButton.addEventListener('click', resetTimer);

    // Initialize timer display
    updateTimerDisplay();
});

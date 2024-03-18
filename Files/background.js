chrome.runtime.onInstalled.addListener(function() {
    // Initialize timer parameters
    let minutes = 25;
    let seconds = 0;
    let isTimerRunning = false;
    let pomodoroCount = 0;

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
                // Start the break after 4 Pomodoros
                if (pomodoroCount % 4 === 0) {
                    minutes = 15; // Long break
                    chrome.notifications.create({
                        type: 'basic',
                        iconUrl: 'icon.png',
                        title: 'Pomodoro Timer',
                        message: 'Take a 15-minute break!',
                    });
                } else {
                    minutes = 5; // Short break
                    chrome.notifications.create({
                        type: 'basic',
                        iconUrl: 'icon.png',
                        title: 'Pomodoro Timer',
                        message: 'Take a 5-minute break!',
                    });
                }
                startTimer();
            } else {
                minutes--;
                seconds = 59;
            }
        } else {
            seconds--;
        }
    }
});

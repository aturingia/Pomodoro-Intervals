document.addEventListener("DOMContentLoaded", function() {
  const intervalElements = document.querySelectorAll('.interval');
  const intervalInputs = [
    document.getElementById('intervalInput1'),
    document.getElementById('intervalInput2'),
    document.getElementById('intervalInput3'),
    document.getElementById('intervalInput4'),
    document.getElementById('intervalInput5'),
    document.getElementById('intervalInput6'),
    document.getElementById('intervalInput7'),
    document.getElementById('intervalInput8'),
  ];
  const startBtn = document.getElementById('startBtn');
  const stopBtn = document.getElementById('stopBtn');
  const resetBtn = document.getElementById('resetBtn');
  const updateBtn = document.getElementById('updateBtn');
  const alarm = document.getElementById('alarm');

  let intervals = [25, 5, 25, 5, 25, 5, 25, 15]; // Intervalos por defecto
  let currentIntervalIndex =  0;
  let timerId;

 function updateIntervalDisplay() {
    intervalElements[currentIntervalIndex].textContent = formatInterval(intervals[currentIntervalIndex]);
  }

  function formatInterval(minutes) {
    return minutes.toString().padStart(2, '0');
  }

  function countdown() {
    updateIntervalDisplay();
    if (intervals[currentIntervalIndex] > 0) {
      intervals[currentIntervalIndex]--;
      timerId = setTimeout(countdown, 60000); // Llama a la función countdown cada minuto
    } else {
      if (currentIntervalIndex < intervals.length - 1) {
        currentIntervalIndex++;
        playAlarm();
        countdown();
      } else {
        playAlarm();
        resetTimer();
      }
    }
  }

  function startTimer() {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    resetBtn.disabled = false;
    updateBtn.disabled = false;
    countdown();
  }

  function stopTimer() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = false;
    updateBtn.disabled = false;
    clearInterval(timerId);
  }

  function resetTimer() {
    startBtn.disabled = false;
    stopBtn.disabled = false;
    resetBtn.disabled = true;
    updateBtn.disabled = false;
    clearInterval(timerId);
    updateIntervalDisplay();
    //intervals = intervalInputs.map(input => parseInt(input.value));
    currentIntervalIndex = 0;
  }

  function updateTimer() {
    startBtn.disabled = false;
    stopBtn.disabled = false;
    resetBtn.disabled = false;
    updateBtn.disabled = true;
    clearInterval(timerId);
    intervals = intervalInputs.map(input => parseInt(input.value));
    currentIntervalIndex = 0;
    updateIntervalDisplay();
  }

  function playAlarm() {
    alarm.play();
  }

  const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
  button.addEventListener('click', function() {
    // Remover la clase 'active' de todos los botones
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Agregar la clase 'active' solo al botón clickeado
    this.classList.add('active');
  });
});

  startBtn.addEventListener('click', startTimer);
  stopBtn.addEventListener('click', stopTimer);
  resetBtn.addEventListener('click', resetTimer);
  updateBtn.addEventListener('click', updateTimer);

  // Inicializar la visualización de intervalos
  updateIntervalDisplay();
});

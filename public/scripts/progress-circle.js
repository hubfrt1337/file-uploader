const circularProgress = document.querySelectorAll(".circular-progress");


Array.from(circularProgress).forEach((progressBar) => {


  const innerCircle = progressBar.querySelector(".inner-circle");
  const progressNumber = progressBar.querySelector(".progress-number")

  
  let startValue = 0,
    endValue = Number(progressBar.getAttribute("data-percentage")),
    speed = 50,
    secColor = "#4A90E2",
    accColor = "#2ECC71"

  const progress = setInterval(() => {
    startValue++;
    progressNumber.textContent = `${startValue}`;
   // progressValue.style.color = `${secColor}`;

    innerCircle.style.backgroundColor = 'white';

    progressBar.style.background = `conic-gradient(${accColor} ${
      startValue * 3.6}deg, rgba(0,0,0,0.15) 0deg)`;

    if (startValue === endValue) {
      clearInterval(progress);
    }

  }, speed);
});
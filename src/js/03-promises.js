const form = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position: position, delay: delay });
      } else {
        reject({ position: position, delay: delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const delayInput = event.target.elements.delay;
  const stepInput = event.target.elements.step;
  const amountInput = event.target.elements.amount;
  let delay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);
  let position = 0;

  for (let i = 0; i < amount; i++) {
    const promise = createPromise(position, delay);
    promise
      .then(function ({ position, delay }) {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(function ({ position, delay }) {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    position++;
    delay += step;
  }
});

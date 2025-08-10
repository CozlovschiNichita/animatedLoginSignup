const container = document.querySelector('.container');
const loginForm = document.querySelector('.form.login');
const signupForm = document.querySelector('.form.signup');
const toggleElements = document.querySelectorAll('.toggle-text');

let isAnimating = false;
const ANIMATION_TIMEOUT = 700; 

function switchForm(toSignup) {
  if (isAnimating) return;
  isAnimating = true;

  toggleElements.forEach(el => (el.style.pointerEvents = 'none'));

  container.classList.add('move-right');
  const currentForm = toSignup ? loginForm : signupForm;
  currentForm.classList.add('move-faster');

  // Функция очистки после анимации
  function finishAnimation() {
    container.classList.remove('move-right');
    currentForm.classList.remove('move-faster');

    if (toSignup) {
      loginForm.classList.remove('active');
      signupForm.classList.add('active');
    } else {
      signupForm.classList.remove('active');
      loginForm.classList.add('active');
    }

    toggleElements.forEach(el => (el.style.pointerEvents = 'auto'));
    isAnimating = false;
  }

  // Обработчик события transitionend
  function onTransitionEnd(e) {
    if (e.propertyName === 'transform') {
      clearTimeout(timeoutId);
      finishAnimation();
      currentForm.removeEventListener('transitionend', onTransitionEnd);
    }
  }

  currentForm.addEventListener('transitionend', onTransitionEnd);

  // Таймаут на всякий случай, если событие не сработает
  const timeoutId = setTimeout(() => {
    console.warn('Transitionend timeout: сброс анимации');
    finishAnimation();
    currentForm.removeEventListener('transitionend', onTransitionEnd);
  }, ANIMATION_TIMEOUT);
}

toggleElements.forEach(el => {
  el.addEventListener('click', () => {
    if (isAnimating) return;
    if (el.dataset.toggle === 'signup' && loginForm.classList.contains('active')) {
      switchForm(true);
    } else if (el.dataset.toggle === 'login' && signupForm.classList.contains('active')) {
      switchForm(false);
    }
  });
});
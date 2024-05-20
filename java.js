window.onload = function() {
  setTimeout(function() {
      document.getElementById('intro').style.display = 'none';
      document.getElementById('projects').style.display = 'block';
  }, 2000); // 2 секунды задержки для анимации

  // Показывать кнопку прокрутки вверх при прокрутке страницы
  window.onscroll = function() {scrollFunction()};
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("scrollToTopBtn").style.display = "block";
  } else {
    document.getElementById("scrollToTopBtn").style.display = "none";
  }
}

// Прокрутка вверх при клике на кнопку
document.getElementById("scrollToTopBtn").addEventListener("click", function() {
  document.body.scrollTop = 0; // Для Safari
  document.documentElement.scrollTop = 0; // Для Chrome, Firefox, IE и Opera
});
// Плавная прокрутка к разделам страницы
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      window.scrollTo({
          top: target.offsetTop,
          behavior: 'smooth'
      });
  });
});

// Открытие модального окна при нажатии на кнопку "Посмотреть" под каждым проектом
document.querySelectorAll('.view-project').forEach(button => {
  button.addEventListener('click', function() {
      const projectTitle = this.parentElement.querySelector('h3').textContent;
      const projectDescription = this.parentElement.querySelector('.description').innerHTML;
      const modalContent = document.querySelector('.modal-content');
      modalContent.querySelector('h2').textContent = projectTitle;
      modalContent.querySelector('p').innerHTML = projectDescription;
      document.getElementById('projectModal').style.display = 'block';
  });
});

// Закрытие модального окна при нажатии на кнопку закрытия
document.querySelector('.close').addEventListener('click', function() {
  document.getElementById('projectModal').style.display = 'none';
});

// Закрытие модального окна при клике вне области окна
window.addEventListener('click', function(e) {
  const modal = document.getElementById('projectModal');
  if (e.target === modal) {
      modal.style.display = 'none';
  }
});

window.onload = function() {
  setTimeout(function() {
      document.getElementById('intro').style.display = 'none';
      document.getElementById('projects').style.display = 'block';
  }, 2000); // 2 секунды задержки для анимации

  // Добавляем обработчик события для кнопки "Наверх"
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  scrollToTopBtn.addEventListener("click", scrollToTop);
  
  // Показываем кнопку "Наверх" при прокрутке страницы
  window.addEventListener("scroll", handleScroll);
}

// Функция для плавной прокрутки страницы вверх
function scrollToTop() {
  window.scrollTo({
      top: 0,
      behavior: "smooth"
  });
}

// Функция для отображения кнопки "Наверх" при прокрутке вниз
function handleScroll() {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (window.pageYOffset > 100) {
      scrollToTopBtn.style.display = "block";
  } else {
      scrollToTopBtn.style.display = "none";
  }
}
function jumbledNumbers(str) {
  const counts = new Map();

  // Подсчитываем количество каждой цифры в строке
  for (const char of str) {
    if (!isNaN(parseInt(char))) {
      counts.set(char, (counts.get(char) || 0) + 1);
    }
  }

  // Сортируем цифры и формируем итоговую строку
  let result = '';
  for (let i = 0; i <= 9; i++) {
    if (counts.has(String(i))) {
      result += i + counts.get(String(i));
    }
  }

}

// Пример использования:
const jumbledString = "reuonnoinfe";
const result = jumbledNumbers(jumbledString);
console.log(result); // Выведет "149"

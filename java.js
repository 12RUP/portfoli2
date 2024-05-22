window.onload = function() {
  setTimeout(function() {
      document.getElementById('intro').style.display = 'none';
      document.getElementById('projects').style.display = 'block';
  }, 2000);

  window.onscroll = function() {scrollFunction()};

  document.getElementById("scrollToTopBtn").addEventListener("click", function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  document.querySelectorAll('.view-project').forEach(button => {
    button.addEventListener('click', function() {
      const projectTitle = this.parentElement.querySelector('h3').textContent;
      const projectDescription = this.parentElement.querySelector('.description').innerHTML;
      const modalContent = document.querySelector('.modal-content');
      modalContent.querySelector('h2').textContent = projectTitle;
      modalContent.querySelector('p').innerHTML = projectDescription;
      document.getElementById('project-modal').style.display = 'block';
    });
  });

  document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('project-modal').style.display = 'none';
  });

  window.addEventListener('click', function(e) {
    const modal = document.getElementById('project-modal');
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("scrollToTopBtn").style.display = "block";
  } else {
    document.getElementById("scrollToTopBtn").style.display = "none";
  }
}

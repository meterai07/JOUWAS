// automatically hide navbar on scroll down and show on scroll up
let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-100px";
  }
  prevScrollpos = currentScrollPos;
}

// carousel

const carousels = document.querySelectorAll(".destination-recomendation-box, .tour-destination-recomendation-box, .food-destination-recomendation-box");

carousels.forEach(carousel => {
  const firstImg = carousel.querySelectorAll("img")[0];
  let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
  const autoSlide = () => {
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;
    if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
  }
  const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
  }
  const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
  }
  const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
    if(!isDragging) return;
    isDragging = false;
    autoSlide();
  }
  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("touchstart", dragStart);
  document.addEventListener("mousemove", dragging);
  carousel.addEventListener("touchmove", dragging);
  document.addEventListener("mouseup", dragStop);
  carousel.addEventListener("touchend", dragStop);
})

// overlay
function on() {
  document.querySelectorAll(".overlay, .pop-up").forEach(el => {
    el.style.display = "flex";
    if (el.classList.contains("pop-up")){
      el.style.animation = "swipe-in 0.5s";
    }
  });
}

function off() {
  document.querySelectorAll(".overlay, .pop-up").forEach(el => {
    if (el.classList.contains("pop-up")){
      el.style.animation = "swipe-out 0.6s";
    }
    setTimeout(() => {
      el.style.display = "none";
    }, 500);
  });
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    off();
  }
});

// warning

function warning() {
  alert('Silahkan Login Terlebih Dahulu\nUntuk Melakukan Reservasi!');
}

// login success
function success() {
  const email = document.getElementById('email');
  const psw = document.getElementById('password');
  const notice = document.getElementById('notice');

  if (email.value === 'darmaji' && psw.value === 'darmaji') {
    location.href = "../Logged-In/index.html";
  } else {
    notice.innerText = 'Masukkan email dan password yang benar!'
  }
}

// sign up checked

function checked() {
  let username = document.getElementById('username');
  let email = document.getElementById('email');
  let psw = document.getElementById('psw');
  let notice = document.getElementById('notice');
  let button = document.getElementById('button-text');
  let have = document.getElementById('have');

  if (button.value === "Login") {
    location.href = "../login/login.html";
    return;
  }

  if (!username.value) {
    notice.innerText = 'Silahkan Masukkan Username';
  } else if (!email.value) {
    notice.innerText = 'Silahkan Masukkan Email';
  } else if (!psw.value) {
    notice.innerText = 'Silahkan Masukkan Password';
  } else {
    notice.innerText = 'Sign Up Berhasil, Silahkan Login!';
    button.innerText = 'Login';
    have.innerText = '.';
    have.style.color = "white";
    button.value = "Login";
  }
}

// reservation

function reservationChecked() {
  const name = document.getElementById('name');
  const date = document.getElementById('date');
  const count = document.getElementById('count');
  const countNumber = document.getElementById('countNumber');
  countNumber.value = 9;
  const notice = document.getElementById('notice');

  if (!name.value) {
    notice.innerText = 'Silahkan Masukkan Nama Anda';
  } else if (!date.value) {
    notice.innerText = 'Silahkan Masukkan Tanggal Reservasi';
  } else if (!count.value) {
    notice.innerText = 'Silahkan Masukkan Jumlah Orang';
  } else if (count.value <= 0 || count.value >= countNumber.value + 1) {
    notice.innerText = 'Silahkan Masukkan Jumlah Orang yang Sesuai';
  } else {
    countNumber.value -= count.value;
    alert('Reservasi Berhasil!');
    off();
  }
}

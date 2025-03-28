const firebaseConfig = {
    apiKey: "AIzaSyAWDFfrdHph5NXI8GLIJvDCH_7YT8U8t6Y",
    authDomain: "portofoliomisael.firebaseapp.com",
    databaseURL: "https://portofoliomisael-default-rtdb.firebaseio.com",
    projectId: "portofoliomisael",
    storageBucket: "portofoliomisael.firebasestorage.app",
    messagingSenderId: "679825659895",
    appId: "1:679825659895:web:b94dedec7167ebdafec0f2"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// ADDED: Flowbite Toast Notification Function
function showFlowbiteToast() {
    // Create toast HTML
    const toastHTML = `

<div 
  id="toast-success" 
  class="flex items-center w-full max-w-xs p-4 mb-4 bg-gray-800 text-gray-200 rounded-lg shadow z-50 overflow-hidden" 
  role="alert"
>

  <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-green-500 rounded-full">
    <svg 
      class="w-5 h-5 text-white" 
      aria-hidden="true" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="currentColor" 
      viewBox="0 0 20 20"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
    </svg>
    <span class="sr-only">Check icon</span>
  </div>
  

  <div class="ml-3 text-sm font-normal">
    Message sent successfully!
  </div>
</div>
    `;

    // Get toast container
    const toastContainer = document.getElementById('toast-container');
    
    // Insert toast HTML
    toastContainer.innerHTML = toastHTML;

    // Tambahkan class "show" agar toast bergeser masuk ke layar
toastContainer.classList.add('show');

// Jika mau hilangkan toast setelah beberapa detik:
setTimeout(() => {
  toastContainer.classList.remove('show');
}, 3000); // 3 detik

    // Use Flowbite's toast initialization if available
    if (window.flowbite && window.flowbite.Toast) {
        const toastElement = document.getElementById('toast-success');
        new flowbite.Toast(toastElement);
    }
}
// refrence to database
var portfoliomisaelDB = firebase.database().ref("portfolioMisael");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    var name = getElementVal("name");
    var email = getElementVal("email");
    var message = getElementVal("message");
    var subject = getElementVal("subject");

    saveMessages(name, email, message, subject);

    // ADDED: Show toast notification
    showFlowbiteToast();

    // reset the form after submission
    setTimeout(() => {  
        document.getElementById("toast-container").innerHTML = ''; // Clear the toast container
    }
    , 3000); // Clear after 3 seconds   

    // Reset form
    document.getElementById("contactForm").reset(); 
}

const saveMessages = (name, email, message, subject) => {
    var newMessageRef = portfoliomisaelDB.push();
    newMessageRef.set({
        name: name,
        email: email,
        message: message,
        subject: subject,
    });
}

const getElementVal = (id) => {
    return document.getElementById(id).value;
}

// Fungsi untuk menganimasikan progress bar lingkaran
function animateProgress(progressElement) {
    // Mengambil elemen yang menampilkan nilai progress (angka persen)
    let progressValue = progressElement.querySelector('.progress-value');
    
    // Mendapatkan nilai target progress dari atribut data-progress dan mengkonversinya menjadi integer
    let targetValue = parseInt(progressElement.getAttribute('data-progress'));
    
    // Inisialisasi nilai progress saat ini dengan 0%
    let currentValue = 0;
    
    // Menentukan kecepatan animasi (dalam milidetik) untuk setiap langkah peningkatan
    let speed = 20; // 20 milidetik antara setiap peningkatan nilai
    
    // Membuat interval untuk memperbarui progress setiap 'speed' milidetik
    let progressAnimation = setInterval(() => {
        // Menambah nilai progress saat ini sebanyak 1
        currentValue++;
        
        // Memperbarui teks yang ditampilkan dengan nilai progress saat ini dan menambahkan simbol %
        progressValue.textContent = `${currentValue}%`;
        
        // Memperbarui tampilan progress bar dengan menggunakan CSS conic-gradient
        // currentValue * 3.6 digunakan untuk mengkonversi persentase ke derajat (karena 100% = 360 derajat)
        progressElement.style.background = `conic-gradient(
            #5B99C2 ${currentValue * 3.6}deg,  /* Warna yang terisi sesuai progress */
            rgb(192, 204, 241) 0deg,
            rgb(0, 255, 149)                     /* Warna untuk bagian yang belum terisi */
)`;
        
        // Jika progress saat ini sudah mencapai atau melebihi nilai target,
        // hentikan interval animasi agar tidak berjalan terus-menerus
        if (currentValue >= targetValue) {
            clearInterval(progressAnimation);
        }
    }, speed);
}

// Fungsi callback untuk IntersectionObserver yang menangani perubahan visibilitas elemen
function handleIntersection(entries, observer) {
    // Melakukan iterasi terhadap setiap entry (objek yang berisi informasi mengenai elemen yang diamati)
    entries.forEach(entry => {
        // Jika elemen sudah masuk ke dalam viewport (terlihat oleh pengguna)
        if (entry.isIntersecting) {
            // Mengambil elemen progress bar lingkaran di dalam elemen yang diamati
            let progressElement = entry.target.querySelector('.circular-progress');
            
            // Memulai animasi progress pada elemen yang ditemukan
            animateProgress(progressElement);
            
            // Optional: Jika hanya ingin animasi dijalankan satu kali, bisa berhenti mengamati elemen tersebut
            // observer.unobserve(entry.target);
        }
    });
}

// Mengatur opsi untuk IntersectionObserver
let options = {
    root: null,         // Menggunakan viewport sebagai root (area tampilan pengguna)
    threshold: 0.8      // Callback dipicu ketika 10% dari elemen terlihat di viewport
};

// Membuat instance baru IntersectionObserver dengan callback handleIntersection dan opsi yang telah diatur
let observer = new IntersectionObserver(handleIntersection, options);

// Menyeleksi semua elemen dengan kelas .progress dan mendaftarkannya pada observer
document.querySelectorAll('.progress').forEach(progress => {
    // Memulai pengamatan terhadap setiap elemen progress
    observer.observe(progress);
});

//JS

//Berfungsi untuk mengatur selected pada project
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".filter-btn");
    const items = document.querySelectorAll(".gallery-item");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            // Hapus kelas 'active' dari semua tombol
            buttons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const filter = this.getAttribute("data-filter");

            items.forEach(item => {
                if (filter === "all" || item.classList.contains(filter)) {
                    item.classList.remove("hidden");
                } else {
                    item.classList.add("hidden");
                }
            });
        });
    });
});

const backToTop = document.getElementById('backToTop');
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
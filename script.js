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
// SPA loader: load page by id or hash
const routes = {
  login: "login.html",
  register: "register.html",
  landing: "landing.html",
  "form-siswa": "form-siswa.html",
  "form-ortu": "form-ortu.html",
  validasi: "validasi.html",
  pengumuman: "pengumuman.html",
  status: "status.html"
};

function navigate(page) {
  if (!routes[page]) page = "login";
  window.location.hash = "#" + page;
  loadPage(page);
}

async function loadPage(page) {
  const html = await fetch(routes[page]).then(res=>res.text());
  document.getElementById("app").innerHTML = `<div class="container">${html}</div>`;
  if (window[page+"Init"]) window[page+"Init"]();
}

window.addEventListener("hashchange",()=> {
  const page = window.location.hash.replace("#","");
  loadPage(page || "login");
});

window.onload = function() {
  const page = window.location.hash.replace("#","");
  loadPage(page || "login");
};

/* Fungsionalitas utama (modularisasi) */
// Simulasi user login
let currentUser = null;
const users = { admin: "123" };

// Data status kelulusan dummy
function cekKelulusan(nama) {
  const namaLulus = ["Budi", "Siti", "Joko"];
  return namaLulus.map(n => n.toLowerCase()).includes(nama.toLowerCase());
}

// LOGIN
function loginUser() {
  const user = document.getElementById("loginUsername");
  const pass = document.getElementById("loginPassword");
  if (users[user.value] === pass.value) {
    currentUser = user.value;
    navigate('landing');
  } else {
    user.classList.add("shake");
    pass.classList.add("shake");
    setTimeout(()=>{user.classList.remove("shake"); pass.classList.remove("shake");}, 500);
    alert("Username atau password salah!");
  }
}

// REGISTER
function registerUser() {
  const user = document.getElementById("regUsername");
  const pass = document.getElementById("regPassword");
  if (user.value && pass.value) {
    if (users[user.value]) {
      alert("Username sudah terdaftar!");
      user.classList.add("shake");
      setTimeout(()=>user.classList.remove("shake"), 500);
      return;
    }
    users[user.value] = pass.value;
    alert("Registrasi berhasil. Silakan login.");
    navigate('login');
  } else {
    if (!user.value) user.classList.add("shake");
    if (!pass.value) pass.classList.add("shake");
    setTimeout(()=>{user.classList.remove("shake"); pass.classList.remove("shake");}, 500);
    alert("Semua kolom wajib diisi!");
  }
}

// Mulai Formulir dari landing
function startFormulir() {
  navigate('form-siswa');
}

// DATA SISWA
function simpanSiswa() {
  const s_nama = document.getElementById("s_nama").value.trim();
  const s_nik = document.getElementById("s_nik").value.trim();
  const s_tempat_lahir = document.getElementById("s_tempat_lahir").value.trim();
  const s_tanggal_lahir = document.getElementById("s_tanggal_lahir").value;
  const s_jk = document.getElementById("s_jk").value;
  const s_alamat = document.getElementById("s_alamat").value.trim();
  const s_hp = document.getElementById("s_hp").value.trim();
  const s_email = document.getElementById("s_email").value.trim();
  const s_ijazah = document.getElementById("s_ijazah").value.trim();
  const s_nisn = document.getElementById("s_nisn").value.trim();
  const s_sekolah = document.getElementById("s_sekolah").value.trim();
  if (!s_nama || !s_nik || !s_tempat_lahir || !s_tanggal_lahir || !s_jk || !s_alamat || !s_hp || !s_email || !s_ijazah || !s_nisn || !s_sekolah) {
    alert("Semua kolom wajib diisi!");
    return;
  }
  const dataSiswa = {
    s_nama, s_nik, s_tempat_lahir, s_tanggal_lahir, s_jk, s_alamat, s_hp, s_email, s_ijazah, s_nisn, s_sekolah
  };
  localStorage.setItem("dataSiswa", JSON.stringify(dataSiswa));
  navigate('form-ortu');
}
function backToSiswa() {
  navigate('form-siswa');
}

// DATA ORTU
function simpanOrtu() {
  const o_nama = document.getElementById("o_nama").value.trim();
  const o_alamat = document.getElementById("o_alamat").value.trim();
  const o_tanggal_lahir = document.getElementById("o_tanggal_lahir").value;
  const o_pekerjaan = document.getElementById("o_pekerjaan").value.trim();
  const o_penghasilan = document.getElementById("o_penghasilan").value.trim();
  const o_hp = document.getElementById("o_hp").value.trim();
  if (!o_nama || !o_alamat || !o_tanggal_lahir || !o_pekerjaan || !o_penghasilan || !o_hp) {
    alert("Semua kolom wajib diisi!");
    return;
  }
  const dataOrtu = {
    o_nama, o_alamat, o_tanggal_lahir, o_pekerjaan, o_penghasilan, o_hp
  };
  localStorage.setItem("dataOrtu", JSON.stringify(dataOrtu));
  tampilValidasi();
}

// VALIDASI
function tampilValidasi() {
  navigate('validasi');
  setTimeout(()=>{
    const s = JSON.parse(localStorage.getItem("dataSiswa")) || {};
    const o = JSON.parse(localStorage.getItem("dataOrtu")) || {};
    // Siswa
    document.getElementById("v_s_nama").textContent = s.s_nama||"";
    document.getElementById("v_s_nik").textContent = s.s_nik||"";
    document.getElementById("v_s_tempat_lahir").textContent = (s.s_tempat_lahir||"") + ', ' + (s.s_tanggal_lahir||"");
    document.getElementById("v_s_jk").textContent = s.s_jk||"";
    document.getElementById("v_s_alamat").textContent = s.s_alamat||"";
    document.getElementById("v_s_hp").textContent = s.s_hp||"";
    document.getElementById("v_s_email").textContent = s.s_email||"";
    document.getElementById("v_s_ijazah").textContent = s.s_ijazah||"";
    document.getElementById("v_s_nisn").textContent = s.s_nisn||"";
    document.getElementById("v_s_sekolah").textContent = s.s_sekolah||"";
    // Orang tua
    document.getElementById("v_o_nama").textContent = o.o_nama||"";
    document.getElementById("v_o_alamat").textContent = o.o_alamat||"";
    document.getElementById("v_o_tanggal_lahir").textContent = o.o_tanggal_lahir||"";
    document.getElementById("v_o_pekerjaan").textContent = o.o_pekerjaan||"";
    document.getElementById("v_o_penghasilan").textContent = o.o_penghasilan||"";
    document.getElementById("v_o_hp").textContent = o.o_hp||"";
  }, 50);
}
function editData() {
  navigate('form-siswa');
  setTimeout(()=>{
    const s = JSON.parse(localStorage.getItem("dataSiswa")) || {};
    document.getElementById("s_nama").value = s.s_nama||"";
    document.getElementById("s_nik").value = s.s_nik||"";
    document.getElementById("s_tempat_lahir").value = s.s_tempat_lahir||"";
    document.getElementById("s_tanggal_lahir").value = s.s_tanggal_lahir||"";
    document.getElementById("s_jk").value = s.s_jk||"";
    document.getElementById("s_alamat").value = s.s_alamat||"";
    document.getElementById("s_hp").value = s.s_hp||"";
    document.getElementById("s_email").value = s.s_email||"";
    document.getElementById("s_ijazah").value = s.s_ijazah||"";
    document.getElementById("s_nisn").value = s.s_nisn||"";
    document.getElementById("s_sekolah").value = s.s_sekolah||"";
    // Prefill data ortu saat pindah ke form ortu
    setTimeout(()=>{
      const o = JSON.parse(localStorage.getItem("dataOrtu")) || {};
      document.getElementById("o_nama").value = o.o_nama||"";
      document.getElementById("o_alamat").value = o.o_alamat||"";
      document.getElementById("o_tanggal_lahir").value = o.o_tanggal_lahir||"";
      document.getElementById("o_pekerjaan").value = o.o_pekerjaan||"";
      document.getElementById("o_penghasilan").value = o.o_penghasilan||"";
      document.getElementById("o_hp").value = o.o_hp||"";
    }, 300);
  }, 50);
}
function konfirmasiData() {
  navigate('pengumuman');
  setTimeout(()=>{
    const s = JSON.parse(localStorage.getItem("dataSiswa")) || {};
    document.getElementById("p_s_nama").textContent = s.s_nama||"";
    document.getElementById("p_s_nik").textContent = s.s_nik||"";
    document.getElementById("p_s_tempat_lahir").textContent = (s.s_tempat_lahir||"") + ', ' + (s.s_tanggal_lahir||"");
    document.getElementById("p_s_jk").textContent = s.s_jk||"";
    document.getElementById("p_s_alamat").textContent = s.s_alamat||"";
    document.getElementById("p_s_hp").textContent = s.s_hp||"";
    document.getElementById("p_s_email").textContent = s.s_email||"";
    document.getElementById("p_s_ijazah").textContent = s.s_ijazah||"";
    document.getElementById("p_s_nisn").textContent = s.s_nisn||"";
    document.getElementById("p_s_sekolah").textContent = s.s_sekolah||"";
  }, 50);
}

// STATUS KELULUSAN
function lihatStatus() {
  navigate('status');
  setTimeout(()=>{
    const s = JSON.parse(localStorage.getItem("dataSiswa")) || {};
    if (cekKelulusan(s.s_nama||"")) {
      document.getElementById("kelulusanInfo").innerHTML = `<strong style="color:var(--accent);">Selamat!</strong> Anda dinyatakan <b>LULUS</b> seleksi PPDB tahun ini.`;
    } else {
      document.getElementById("kelulusanInfo").innerHTML = `<strong style="color:var(--danger);">Mohon Maaf</strong>, Anda <b>TIDAK LULUS</b> seleksi PPDB tahun ini.`;
    }
  }, 50);
}

// Kembali ke landing
function backToLandingPage() {
  navigate('landing');
}
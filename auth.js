const login = document.getElementById('google-login');
const logout = document.getElementById('google-logout');
const status = document.getElementById('auth-status');
try {
 const { initializeApp } = await import('https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js');
 const { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, setPersistence, browserSessionPersistence } = await import('https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js');
 const app = initializeApp({apiKey:'AIzaSyD7TvdjIaaW5TTIBX5HeonEf32l_elGm-w',authDomain:'kesehatan-mental-47c9a.firebaseapp.com',projectId:'kesehatan-mental-47c9a',storageBucket:'kesehatan-mental-47c9a.firebasestorage.app',messagingSenderId:'94038280625',appId:'1:94038280625:web:4f9efd6b98bddfdd839590'});
 const auth = getAuth(app);
 await setPersistence(auth, browserSessionPersistence);
 const provider = new GoogleAuthProvider(); provider.setCustomParameters({prompt:'select_account'});
 login.disabled=false;
 onAuthStateChanged(auth,user=>{login.hidden=!!user;logout.hidden=!user;document.getElementById('aktivitas').hidden=!user;status.textContent=user?'Selamat datang, '+(user.displayName || user.email || 'mahasiswa')+'.':'Masuk dengan Google untuk membuka aktivitas belajar.'});
 login.onclick=async()=>{login.disabled=true;status.textContent='Membuka pilihan akun Google…';try{await signInWithPopup(auth,provider)}catch(e){const errors={'auth/unauthorized-domain':'Domain website belum diizinkan. Tambahkan domain ini di Firebase Authentication → Settings → Authorized domains.','auth/popup-blocked':'Jendela login diblokir browser. Izinkan pop-up lalu coba lagi.','auth/popup-closed-by-user':'Login dibatalkan. Silakan coba lagi.','auth/operation-not-allowed':'Login Google belum diaktifkan pada proyek Firebase.'};status.textContent=errors[e.code] || 'Login belum berhasil. Periksa koneksi lalu coba lagi.'}finally{login.disabled=false}};
 logout.onclick=async()=>{try{await signOut(auth)}catch{status.textContent='Belum dapat keluar. Coba lagi.'}};
} catch {status.textContent='Layanan login tidak dapat dimuat. Periksa koneksi internet lalu muat ulang halaman.';login.disabled=true;}

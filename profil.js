document.addEventListener("DOMContentLoaded", () => {
  const fullname = localStorage.getItem("userFullname");
  const email = localStorage.getItem("userEmail");
  const role = localStorage.getItem("userRole");
  const birthdate = localStorage.getItem("userBirthdate");
  const gender = localStorage.getItem("userGender");

  if (!fullname || !email) {
    alert("Vous devez être connecté !");
    window.location.href = "connexion.html";
    return;
  }

  // Affichage des infos

  
  document.getElementById("profilName").textContent = fullname;
  document.getElementById("profilEmail").textContent = email;
  document.getElementById("profilRole").textContent = "Rôle : " + role;
  document.getElementById("profilBirthdate").textContent = "Date de naissance : " + birthdate;
  document.getElementById("profilGender").textContent = "Genre : " + gender;



  

  // Gestion upload image de couverture
  const coverInput = document.getElementById("uploadCover");
  const coverImage = document.getElementById("coverImage");
  coverInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) coverImage.src = URL.createObjectURL(file);
  });

// Gestion upload image de profil
  const profileInput = document.getElementById("uploadProfile");
  const profileImage = document.getElementById("profileImage");
  profileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) profileImage.src = URL.createObjectURL(file);
  });

  // Déconnexion
  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn.addEventListener("click", () => {
    localStorage.clear();
    alert("Déconnexion réussie !");
    window.location.href = "connexion.html";
  });



  //  COMMANDES / PREFERENCES 
  const btnCommandes = document.getElementById("btnCommandes");
  const btnPreferences = document.getElementById("btnPreferences");
  const commandesSection = document.getElementById("commandesSection");
  const preferencesSection = document.getElementById("preferencesSection");

  btnCommandes.addEventListener("click", () => {
    commandesSection.classList.remove("hidden");
    preferencesSection.classList.add("hidden");
  });

  btnPreferences.addEventListener("click", () => {
    preferencesSection.classList.remove("hidden");
    commandesSection.classList.add("hidden");
  });


  

});


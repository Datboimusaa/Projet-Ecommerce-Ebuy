document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("inscriptionForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value;
     const email = document.getElementById("email").value;
      const birthdate = document.getElementById("birthdate").value;
      const gender = document.getElementById("gender").value;
      const password = document.getElementById("password").value;

    const confirmPassword = document.getElementById("confirmPassword").value;
    
    // Vérifi button
    const roleElement = document.querySelector('input[name="role"]:checked');
    const role = roleElement ? roleElement.value : "Non défini";

    if (!fullname || !email || !password || password !== confirmPassword) {
      alert("Vérifiez vos informations et la confirmation du mot de passe.");
      return;
    }

    // Sauvegarde info
    localStorage.setItem("userFullname", fullname);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userRole", role);
    localStorage.setItem("userBirthdate", birthdate); 
    localStorage.setItem("userGender", gender);

    alert("Compte créé avec succès !");
    window.location.href = "profil.html";
  });
});
localStorage.setItem("userFullname", fullname);
localStorage.setItem("userEmail", email);
localStorage.setItem("userRole", role);
localStorage.setItem("userBirthdate", birthdate); 
localStorage.setItem("userGender", gender);       

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("connexionForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Vérification 
    if (email === "" || password === "") {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    
    const savedEmail = localStorage.getItem("userEmail");
    const savedPassword = localStorage.getItem("userPassword");

    if (email === savedEmail && password === savedPassword) {
      alert("Connexion réussie !");
      window.location.href = "profil.html";
    } else {
      alert("Email ou mot de passe incorrect !");
    }
  });
});

const formProduit = document.getElementById('formProduit');

const fetchLocalProduits = () => {
  const produits = localStorage.getItem('produits');
  return produits ? JSON.parse(produits) : [];
};

// Sauvegarder les produits dans le localStorage
const saveLocalProduits = (produits) => {
  localStorage.setItem('produits', JSON.stringify(produits));
};

formProduit.addEventListener('submit', (e) => {
  try {
    e.preventDefault();

    const nouveauProduit = {
      id: crypto.randomUUID(),
      nom: document.getElementById('nom').value,
      prix: document.getElementById('prix').value,
      stock: document.getElementById('stock').value,
      categorie: document.getElementById('categorie').value,
      description: document.getElementById('description').value,
      image: document.getElementById('imgLink').value,
    };

    const produits = fetchLocalProduits();
    produits.push(nouveauProduit);
    saveLocalProduits(produits);
    formProduit.reset();
    getProduits();
  } catch (error) {
    console.error(error);
    alert("Une erreur est survenue lors de l'ajout");
  }
});

const getProduits = () => {
  const produits = fetchLocalProduits();
  const lesProduits = document.getElementById('lesProduits');

  let pros = '';
  produits.forEach((produit) => {
    pros += `
    <tr>
      <td>${produit.prix} FCFA</td>
      <td>${produit.stock}</td>
      <td>${produit.nom}</td>
      <td>${produit.categorie}</td>
      <td><button idPro="${produit.id}" class="btnDelete btn btn-outline btn-error px-2 h-7">Supprimer</button></td>
    </tr>
    `;
  });
  lesProduits.innerHTML = pros;

  const boutons = document.querySelectorAll('.btnDelete');
  boutons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('idPro');
      if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
        deleteProduit(id);
      }
    });
  });
};

const deleteProduit = (id) => {
  let produits = fetchLocalProduits();
  produits = produits.filter((p) => p.id !== id);
  saveLocalProduits(produits);
  getProduits();
};

getProduits();

const contProduits = document.getElementById('contProduits');
const contCommandes = document.getElementById('contCommandes');
const btnCommandes = document.getElementById('btnCommandes');
const btnProduits = document.getElementById('btnProduits');

btnCommandes.addEventListener('click', () => {
  contProduits.classList.add('hidden');
  contCommandes.classList.remove('hidden');
});
btnProduits.addEventListener('click', () => {
  contCommandes.classList.add('hidden');
  contProduits.classList.remove('hidden');
});

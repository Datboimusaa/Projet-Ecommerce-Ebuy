const formProduit = document.getElementById('formProduit');

formProduit.addEventListener('submit', async (e) => {
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
    const reponse = await axios.post('http://localhost:3000/produits', nouveauProduit);
  } catch (error) {
    console.log(error);
    alert('Une erreur est survenue de notre part');
  }
});

const getProduits = async () => {
  try {
    const res = await axios.get('http://localhost:3000/produits');
    const produits = res.data;
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
      btn.addEventListener('click', async (e) => {
        const id = e.currentTarget.getAttribute('idPro');
        if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
          await deleteProduits(id);
          getProduits();
        }
      });
    });
  } catch (error) {
    console.log('Erreur lors du chargement :', error);
  }
};
getProduits();

const deleteProduits = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/produits/${id}`);
  } catch (error) {
    console.error('Erreur d suppression :', error);
  }
};

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

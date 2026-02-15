const lesProduits = document.getElementById('lesProduits');

const getProduits = async () => {
  try {
    const res = await axios.get('http://localhost:3001/produits');
    const produits = res.data.reverse();

    let pros = '';
    produits.forEach((produit) => {
      pros += `
        <div class="w-75 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden p-2">
          <div class="relative bg-primary-purple rounded-2xl mb-4 p-4 flex justify-center items-center h-56">
            <i class="bi bi-heart text-2xl text-gray-400 absolute top-4 right-4 cursor-pointer"></i>
            <div class="w-full h-full flex items-center justify-center">
              <img src="${produit.image}" alt="Sneakers" class="max-h-55 w-60 object-contain" />
            </div>
          </div>

          <div class="px-2">
            <div class="flex justify-between items-center mb-3">
              <h1 class="text-xl font-medium text-text-color">${produit.nom}</h1>
              <div class="flex items-center text-yellow-500">
                <i class="bi bi-star-fill text-lg"></i>
                <span class="ml-1 text-sm font-semibold text-text-color">4.7</span>
              </div>
            </div>

            <p class="text-2xl font-bold text-text-color mb-5">${produit.prix}</p>

            <button idPro="${produit.id}"
              class="btnPro w-full cursor-pointer bg-primary text-white font-semibold py-3 px-3 rounded-xl flex items-center justify-center shadow-md hover:bg-amber-700 transition duration-150"
            >
              <i class="bi bi-cart3 text-xl mr-3"></i>
              Ajouter au Panier
            </button>
          </div>
        </div>
      `;
    });
    lesProduits.innerHTML = pros;

    const clickPro = document.querySelectorAll('.btnPro');
    clickPro.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = btn.getAttribute('idPro');
        ajouterAuPanier(id);
      });
    });
  } catch (error) {
    console.log(error);
  }
};
getProduits();

const ajouterAuPanier = async (id) => {
  try {
    const com = await axios.get('http://localhost:3001/commandes');
    const comds = com.data;
    const existe = comds.some((p) => p.produitId === id);
    if (existe) return;

    const res = await axios.get(`http://localhost:3001/produits/${id}`);
    const produit = res.data;

    const commande = {
      id: crypto.randomUUID(),
      produitId: produit.id,
      nom: produit.nom,
      prix: produit.prix,
      image: produit.image,
      quantite: 1,
    };
    await axios.post('http://localhost:3001/commandes', commande);
    getCommandes();
    alert('produit ajouté');
  } catch (error) {
    console.error('Erreur pour ajout dans le panier', error);
  }
};

const getCommandes = async () => {
  try {
    const res = await axios.get('http://localhost:3001/commandes');
    const data = res.data.reverse();

    const lesCommandes = document.getElementById('lesCommandes');
    const nombreArticle = document.getElementById('nombreArticle');
    const totalPanier = document.getElementById('totalPanier');

    if (nombreArticle) nombreArticle.textContent = data.length;

    let total = 0;
    data.forEach((p) => {
      total += Number(p.prix) * p.quantite;
    });
    if (totalPanier) {
      totalPanier.textContent = total;
    }

    let content = '';
    data.forEach((produit) => {
      content += `
       <div class="flex items-center justify-between bg-white border border-slate-100 rounded-2xl p-3 shadow-sm">
            <div class="flex items-center gap-4">
              <img src="${produit.image}" class="w-20 h-20 rounded-2xl object-cover" alt="Produit" />
              <div>
                <h3 class="font-bold text-lg text-slate-800">${produit.nom}</h3>
                <p class="text-slate-400 font-medium">${produit.prix} FCFA</p>
              </div>
            </div>
            <div class="flex items-center gap-6">
              <span class="font-bold text-slate-800 text-lg">${produit.prix} FCFA</span>
              <div class="join bg-slate-100 rounded-lg">
                <button data-id="${produit.id}" class="btnMoins btn btn-ghost btn-xs join-item">-</button>
                <button class="btn btn-ghost btn-xs join-item pointer-events-none">${produit.quantite}</button>
                <button data-id="${produit.id}" class="btnPlus btn btn-ghost btn-xs join-item">+</button>
              </div>
              <button data-id="${produit.id}" class="btnDeleteCommande btn btn-ghost text-red-400 hover:text-red-600 hover:bg-red-50 btn-sm">Supprimer</button>
            </div>
        </div>
      `;
    });
    if (lesCommandes) {
      lesCommandes.innerHTML = content;
    }

    activerPanier();
  } catch (error) {
    console.log('Erreur lors de la récupération des commandes:', error);
  }
};

const activerPanier = () => {
  document.querySelectorAll('.btnPlus').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const res = await axios.get(`http://localhost:3001/commandes/${id}`);
      await axios.patch(`http://localhost:3001/commandes/${id}`, {
        quantite: res.data.quantite + 1,
      });
      getCommandes();
    });
  });

  document.querySelectorAll('.btnMoins').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const res = await axios.get(`http://localhost:3001/commandes/${id}`);
      if (res.data.quantite > 1) {
        await axios.patch(`http://localhost:3001/commandes/${id}`, {
          quantite: res.data.quantite - 1,
        });
        getCommandes();
      }
    });
  });

  document.querySelectorAll('.btnDeleteCommande').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Voulez-vous supprimé cet article ?')) {
        await axios.delete(`http://localhost:3001/commandes/${id}`);
        getCommandes();
      }
    });
  });
};
getCommandes();

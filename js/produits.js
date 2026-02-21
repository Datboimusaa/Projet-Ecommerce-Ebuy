const lesProduits = document.getElementById('lesProduits');

const fetchLocal = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const saveLocal = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getProduits = () => {
  try {
    const produits = fetchLocal('produits').reverse();

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

            <p class="text-2xl font-bold text-text-color mb-5">${produit.prix} FCFA</p>

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
      btn.addEventListener('click', (e) => {
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

const ajouterAuPanier = (id) => {
  try {
    let commandes = fetchLocal('commandes');

    const existe = commandes.some((p) => p.produitId === id);
    if (existe) {
      alert('Ce produit est déjà dans le panier');
      return;
    }

    const produits = fetchLocal('produits');
    const produit = produits.find((p) => p.id === id);

    if (!produit) return;

    const commande = {
      id: crypto.randomUUID(),
      produitId: produit.id,
      nom: produit.nom,
      prix: produit.prix,
      image: produit.image,
      quantite: 1,
    };

    commandes.push(commande);
    saveLocal('commandes', commandes);
    nombreSurPanier();
    getCommandes();
    alert('Produit ajouté au panier');
  } catch (error) {
    console.error('Erreur pour ajout dans le panier', error);
  }
};

const getCommandes = () => {
  try {
    const data = fetchLocal('commandes').reverse();

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
              <span class="font-bold text-slate-800 text-lg">${produit.prix * produit.quantite} FCFA</span>
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
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      let commandes = fetchLocal('commandes');
      const index = commandes.findIndex((c) => c.id === id);
      if (index !== -1) {
        commandes[index].quantite += 1;
        saveLocal('commandes', commandes);
        getCommandes();
      }
    });
  });

  document.querySelectorAll('.btnMoins').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      let commandes = fetchLocal('commandes');
      const index = commandes.findIndex((c) => c.id === id);
      if (index !== -1 && commandes[index].quantite > 1) {
        commandes[index].quantite -= 1;
        saveLocal('commandes', commandes);
        getCommandes();
      }
    });
  });

  document.querySelectorAll('.btnDeleteCommande').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Voulez-vous supprimer cet article du panier ?')) {
        let commandes = fetchLocal('commandes');
        commandes = commandes.filter((c) => c.id !== id);
        saveLocal('commandes', commandes);
        getCommandes();
      }
    });
  });
};

getCommandes();

const nombreSurPanier = () => {
  const data = fetchLocal('commandes');
  const totalPan = document.getElementById('totalPan');
  totalPan.textContent = data.length;
};
nombreSurPanier();

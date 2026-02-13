const lesProduits = document.getElementById('lesProduits');

const getProduits = async () => {
  try {
    const res = await axios.get('http://localhost:3000/produits');
    const produits = res.data.reverse();

    let pros = '';
    produits.forEach((produit) => {
      pros += `
     <div idPro=${produit.id} class="cursor-pointer block w-67 rounded-lg pb-3 shadow-sm shadow-gray-500 hover:scale-102 duration-300">
          <img alt="" src="${produit.image}" class="h-56 w-full rounded-md object-cover" />

          <div class="mt-2 pr-3">
            <div class="flex flex-between">
              <div>
                <h1 class="pl-3 text-gray-700 font-mono text-sm">${produit.prix} FCFA</h1>
                <p class="pl-3 font-medium text-[15px]">${produit.nom}</p>
              </div>
              <button idPro="${produit.id}" type="button" class="btnPro btn btn-neutral btn-dash px-3 h-8">Ajouter</button>
            </div>

            <div class="mt-6 pl-3 flex items-center gap-8 text-xs">
              <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <svg class="size-4 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
                </svg>

                <div class="mt-1.5 sm:mt-0">
                  <p class="text-gray-500">État</p>

                  <p class="font-medium">Neuf / Vérifié</p>
                </div>
              </div>

              <div class="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <svg class="size-4 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                </svg>

                <div class="mt-1.5 sm:mt-0">
                  <p class="text-gray-500">Livraison</p>

                  <p class="font-medium">24h - 48h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });
    lesProduits.innerHTML = pros;

    const clickPro = document.querySelectorAll('.btnPro');
    clickPro.forEach((produit) => {
      produit.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = produit.getAttribute('idPro');
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
    const com = await axios.get('http://localhost:3000/commandes');
    const comds = com.data;
    const existe = comds.some((p) => p.produitId === id);
    if (existe) return;

    const res = await axios.get(`http://localhost:3000/produits/${id}`);
    const produit = res.data;

    const commande = {
      id: crypto.randomUUID(),
      produitId: produit.id,
      nom: produit.nom,
      prix: produit.prix,
      image: produit.image,
      quantite: 1,
    };
    await axios.post('http://localhost:3000/commandes', commande);
    alert('produit ajouté');
  } catch (error) {
    console.error('Erreur pour ajout dans le panier', error);
  }
};

const getCommandes = async () => {
  try {
    const res = await axios.get('http://localhost:3000/commandes');
    const data = res.data.reverse();

    const lesCommandes = document.getElementById('lesCommandes');
    const nombreArticle = document.getElementById('nombreArticle');

    nombreArticle.textContent = data.length;

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
    lesCommandes.innerHTML = content;
    activerPanier();
  } catch (error) {
    console.log('Erreur lors de la récupération des commandes:', error);
  }
};

const activerPanier = () => {
  document.querySelectorAll('.btnPlus').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const res = await axios.get(`http://localhost:3000/commandes/${id}`);
      await axios.patch(`http://localhost:3000/commandes/${id}`, {
        quantite: res.data.quantite + 1,
      });
      getCommandes();
    });
  });

  document.querySelectorAll('.btnMoins').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const res = await axios.get(`http://localhost:3000/commandes/${id}`);
      if (res.data.quantite > 1) {
        await axios.patch(`http://localhost:3000/commandes/${id}`, {
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
        await axios.delete(`http://localhost:3000/commandes/${id}`);
        getCommandes();
      }
    });
  });
};
getCommandes();

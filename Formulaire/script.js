// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 6

// le main sera appelé quand la page est chargée
window.addEventListener("load", main);

// fonction principale du script
function main() {
  const yeux = document.getElementsByTagName("i");

  for (const oeil of yeux) {
    oeil.addEventListener("click", changerEye);
  }

  const mdp1 = document.getElementById("mdp1");
  const mdp2 = document.getElementById("mdp2");
  const formulaire = document.querySelector("form");

  const field = mdp2.parentNode.parentNode;

  formulaire.addEventListener("submit", fForm);

  function changerEye(evt) {
    evt.target.classList.toggle("fa-eye");

    evt.target.classList.toggle("fa-eye-slash");

    //ou : const input = evt.target.parentNode.querySelector('input');
    //input.type === ...
    if (evt.target.parentNode.lastElementChild.type === "password") {
      evt.target.parentNode.lastElementChild.type = "text";
    } else if (evt.target.parentNode.lastElementChild.type === "text") {
      evt.target.parentNode.lastElementChild.type = "password";
    }
  }

  function fForm(ev) {
    ev.preventDefault();
    if (mdp1.value !== mdp2.value) {
      ev.preventDefault();
      field.classList.add("invalid");
    } else {
      field.classList.remove("invalid");
    }
  }

  const cp = document.getElementById("CP");
  const commune = document.getElementById("commune");


  cp.addEventListener("change", recupererCp);

  async function recupererCp() {
    const code = cp.value;
    
    try {
      const response = await fetch(
        `https://apicarto.ign.fr/api/codes-postaux/communes/${code}`,
      );

      if (response.ok) {
        const data = await response.json();
        
            const select = document.createElement('select');
            
            for(const obj of data) {
                const option = document.createElement('option');
                option.textContent = obj.nomCommune;
                
                select.appendChild(option);
                
            }
            select.id = "commune";
            document.getElementById("commune").replaceWith(select); //bien aller chercher sa référence à chaque fois car nouvel élément non présent au chargement de la page
        

      } else {
        throw "Err " + response.status;
      }
      
      
    } catch (error) {
      console.log(error);
      if (commune.tagName === 'SELECT') {
        const newElt = document.createElement('input');
        newElt.id='commune';
        commune.replaceWith(newElt);
      }
    }

  }

}

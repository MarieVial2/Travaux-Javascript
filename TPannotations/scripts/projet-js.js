// projet JS 2025 
(async function(){
  const btn = document.getElementById('commentBtn');
  // const comment = document.getElementsByClassName('comment');
  const span = document.getElementsByClassName('annote');

//Fonction pour afficher les commentaires et changer le texte du bouton
//   btn.addEventListener('click', afficher);
//   function afficher() {
//     for (com of comment) {
//       com.classList.toggle('invisible');
      
//     }
//     if(btn.textContent === "Masquer les commentaires") {
//       btn.textContent = "Afficher les commentaires";
//     } else {
//       btn.textContent = "Masquer les commentaires";
//     }
//   }
  

//   for (com of comment) {
//     com.addEventListener('mouseenter', (evt) => {
//         let num = evt.target.id.split('-');
//         span[num[0]-1].classList.add('active');
//       })

//     com.addEventListener('mouseleave', normalize);

//       function normalize(evt) {
//         let num = evt.target.id.split('-');
//         span[num[0]-1].classList.remove('active');
//       }
// }

let nbClics = 0;
btn.addEventListener('click', recupererDonnees);

async function recupererDonnees() {
  try {
    const response = await fetch('../json/comments.json');
    let data;
    if(response.ok) {
      data = await response.json();

    } else {
      throw ("Err " + response.status); 
    }

    createDiv(data);
    


  } catch (error) {
    console.log("Erreur");
  }
}
  
  //Creation des commentaires à partir des données JSON récupérées
function createDiv(data) {
  nbClics++;
  if (nbClics%2===1){
    for (const donnees of data){
      let comment = document.createElement('div');
      comment.id = donnees.id;
      
      comment.textContent = donnees.text;
      comment.classList.add('comment');
      
      for (let i = 0; i<span.length; i++) {
        let numAnnote = span[i].id.split('-');
        let numComment = donnees.id.split('-');
        if (numAnnote[0] === numComment[0]){
          
          let parentP = span[i].parentNode;
          
          parentP.parentNode.insertBefore(comment, parentP);
        }
      }

    }
} else  {
  Array.from(document.getElementsByTagName('div')).forEach(div => div.remove());
}
}
  
})();


// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 6

// le main sera appelé quand la page est chargée 
window.addEventListener('load', main);


// fonction principale du script
function main() {
    
    const yeux = document.getElementsByTagName('i');
    
    for (const oeil of yeux) {
        oeil.addEventListener('click', changerEye);
        
    }

    const mdp1 = document.getElementById('mdp1');
    const mdp2 = document.getElementById('mdp2');
    const formulaire = document.querySelector('form');

    const field = mdp2.parentNode.parentNode;

    formulaire.addEventListener('submit', fForm);


    function changerEye(evt) {
        evt.target.classList.toggle("fa-eye");
        
        evt.target.classList.toggle("fa-eye-slash");
        
        //ou : const input = evt.target.parentNode.querySelector('input');
        //input.type === ...
        if (evt.target.parentNode.lastElementChild.type === 'password'){
            evt.target.parentNode.lastElementChild.type = 'text';
        } else if (evt.target.parentNode.lastElementChild.type === 'text') {
            evt.target.parentNode.lastElementChild.type = 'password';
        }
    }

    

    function fForm (ev) {
        if (mdp1.value !== mdp2.value) {
            ev.preventDefault();
            field.classList.add('invalid');
        } else {
            field.classList.remove('invalid');
        }
    }
    
}
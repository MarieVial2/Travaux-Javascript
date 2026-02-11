// jshint browser:true, eqeqeq:true, undef:true, devel:true, esversion: 7

window.onload = main;

function main() {

    // références des éléments généraux utilesdu DOM
    const buttonSaveAlarms = document.getElementById("saveAlarms");
    const divAlarms = document.getElementById("alarms");

    const form = document.querySelector("form");
    const inputHeure = form.getElementsByClassName('time')[0];
    const inputTitre = form.getElementsByClassName('name')[0];
    const selectSon = form.getElementsByClassName('sound')[0];

    const h1 = document.querySelector("h1");
    const audio = document.querySelector("audio");

    let nextId = 1;
    let tabAlarms = [];

    form.addEventListener('submit', creerNouvelleAlarme);

    restoreAlarms();

    // bouton save inactif quand rien de neuf à sauvegarder
    buttonSaveAlarms.disabled = true;
    buttonSaveAlarms.addEventListener('click', function () {
        localStorage.setItem('alarms', JSON.stringify(tabAlarms));
        buttonSaveAlarms.disabled = true;
    });

    afficheHeure();
    setInterval(afficheHeure, 500);

    function afficheHeure() {
        const date = new Date();
        const hh = format(date.getHours());
        const mm = format(date.getMinutes());
        const ss = format(date.getSeconds());
        h1.textContent = `${hh}:${mm}:${ss}`;
        /* ou
        h1.textContent = date.toLocaleTimeString();
        */
        if (ss === '00') {
            for (const alarm of tabAlarms) {
                if (alarm.time === `${hh}:${mm}`) {
                    audio.src = `./sounds/${alarm.sound}.aac` ;/* chemin par rapport au répertoire de index.html où balise audio */
                    audio.play();
                    console.log(`le son numéro ${alarm.sound} est joué`);
                }
            }
        }
    }

    function format(xx) {
        return xx < 10 ? `0${xx}` : xx;
    }

    function creerNouvelleAlarme(evt) {
        evt.preventDefault();

        //créer l'objet littéral et le pousser dans le tableau
        const newObjAlarm = {
            id: nextId++,
            name: inputTitre.value,
            sound: selectSon.value,
            time: inputHeure.value
        };
        tabAlarms.push(newObjAlarm);

        // créer le paragraphe et la div, insérer le paragraphe dans la div
        // insérer la div dans le dom
        console.log(tabAlarms);
        createDivAlarm(newObjAlarm);
        form.reset();
        buttonSaveAlarms.disabled = false;
    }

    function createDivAlarm(objAlarm) {
        const newDivAlarm = document.createElement('div');
        newDivAlarm.classList.add('alarm');

        const p = document.createElement('p');
        p.textContent = `${objAlarm.name}: ${objAlarm.time}`;
        newDivAlarm.appendChild(p);

        const button = document.createElement('button');
        button.textContent = 'Supprimer';
        button.addEventListener('click', function (evt) {
            evt.target.parentNode.remove(); // supprimer la div du DOM
            tabAlarms = tabAlarms.filter(function (elt) {
                return elt.id !== objAlarm.id;
            });
            console.log(tabAlarms);
            buttonSaveAlarms.disabled = false;
        });
        newDivAlarm.appendChild(button);

        /*newDivAlarm.addEventListener('click', function(evt){
            if(evt.target.tagName === 'BUTTON'){
                evt.currentTarget.remove(); // newDivAlarm
                tabAlarms = tabAlarms.filter(function(elt){ 
                return elt.id !== objAlarm.id
            });
            console.log(tabAlarms);

            }
        });*/

        divAlarms.appendChild(newDivAlarm);

    }

    function restoreAlarms() {
        let alarmsJSON = localStorage.getItem('alarms');
        if (alarmsJSON) {
            tabAlarms = JSON.parse(alarmsJSON);
            for (const alarm of tabAlarms) {
                createDivAlarm(alarm);
                if(alarm.id >= nextId) nextId = alarm.id +1;
            }
        }
    }

}


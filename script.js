// Definició de la classe Tasca
class Tasca {
    constructor(titol, descripcio) {
        this.titol = titol;
        this.descripcio = descripcio;
        this.completada = false; // Iniciar com no completada per defecte
    }

    // Mètode per canviar l'estat de la tasca a completada
    marcarCompletada() {
        this.completada = !this.completada; // Alterna entre completada i no completada
    }

    // Mètode per obtenir el títol i la descripció sense text addicional
    obtenirDetalls() {
        return `${this.titol} - ${this.descripcio}`;
    }
}

// Definició de la classe GestorTasques
class GestorTasques {
    constructor() {
        this.llistaTasques = [];
        this.tasquesEliminades = [];
    }

    afegirTasca(tasca) {
        this.llistaTasques.push(tasca);
        this.mostrarTasques();
    }

    eliminarTasca(titol) {
        const tasca = _.find(this.llistaTasques, { titol: titol });
        if (tasca) {
            this.tasquesEliminades.push(tasca);
            _.remove(this.llistaTasques, (tasca) => tasca.titol === titol);
            this.mostrarTasques();
            this.mostrarTasquesEliminades();
        }
    }

    marcarTascaCompletada(titol) {
        const tasca = _.find(this.llistaTasques, { titol: titol });
        if (tasca) {
            tasca.marcarCompletada();
            this.mostrarTasques();
        }
    }

    modificarTasca(tasca, nouTitol, novaDescripcio) {
        tasca.titol = nouTitol;
        tasca.descripcio = novaDescripcio;
        this.mostrarTasques();
    }

    mostrarTasques() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        this.llistaTasques.forEach(tasca => {
            const tascaItem = document.createElement('li');
            tascaItem.textContent = tasca.obtenirDetalls(); // Només mostra títol i descripció
            
            // Canviar el color del text segons l'estat de la tasca
            tascaItem.style.color = tasca.completada ? 'green' : 'red'; // Verd si completada, vermell si no

            // Botó d'eliminar
            const eliminarBtn = document.createElement('button');
            eliminarBtn.textContent = 'Eliminar';
            eliminarBtn.onclick = () => this.eliminarTasca(tasca.titol);

            // Botó de completar/desmarcar
            const completarBtn = document.createElement('button');
            completarBtn.textContent = tasca.completada ? 'Desmarcar' : 'Completar';
            completarBtn.onclick = () => this.marcarTascaCompletada(tasca.titol);

            // Botó de modificar
            const modificarBtn = document.createElement('button');
            modificarBtn.textContent = 'Modificar';
            modificarBtn.onclick = () => this.mostrarFormulariModificar(tasca);

            tascaItem.appendChild(eliminarBtn);
            tascaItem.appendChild(completarBtn);
            tascaItem.appendChild(modificarBtn);

            taskList.appendChild(tascaItem);
        });
    }

    mostrarFormulariModificar(tasca) {
        const nouTitol = prompt("Modifica el títol:", tasca.titol);
        const novaDescripcio = prompt("Modifica la descripció:", tasca.descripcio);

        if (nouTitol && novaDescripcio) {
            this.modificarTasca(tasca, nouTitol, novaDescripcio);
        }
    }

    mostrarTasquesEliminades() {
        const deletedTasks = document.getElementById('deletedTasks');
        deletedTasks.innerHTML = '';

        this.tasquesEliminades.forEach(tasca => {
            const tascaItem = document.createElement('li');
            tascaItem.textContent = tasca.obtenirDetalls();
            deletedTasks.appendChild(tascaItem);
        });
    }
}

// Crear una instància de GestorTasques
const gestorTasques = new GestorTasques();

// Afegir funcionalitat al botó d'afegir tasca
document.getElementById('addTaskBtn').addEventListener('click', function () {
    const titol = document.getElementById('taskInput').value;
    const descripcio = document.getElementById('taskDescriptionInput').value;

    if (titol && descripcio) {
        const novaTasca = new Tasca(titol, descripcio); // No es passa "false"
        gestorTasques.afegirTasca(novaTasca);

        // Netejar els inputs
        document.getElementById('taskInput').value = '';
        document.getElementById('taskDescriptionInput').value = '';
    }
});

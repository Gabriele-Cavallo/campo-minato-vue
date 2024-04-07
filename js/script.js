const { createApp } = Vue;

createApp({
   data() {
        return {
            selected: '',
            options: [
              { text: 'Easy', value: 'Easy' },
              { text: 'Hard', value: 'Hard' },
              { text: 'Extreme', value: 'Extreme' } 
            ],
            difficulty: null,
            bombs: [],
            safeBox: [],
            explosion: null,
            gameOver: false,
            counter: 0
        };
    },
    methods: {
        // funzione che ripristina gli status iniziali del chiavi come al caricamento della pagina
        // e imposta il valore di difficulty in base alla difficoltà selezionata
        // il valore di difficulty viene usato nel v-for presente nell' HTML per 
        // determinare il numero di caselle presenti in griglia
        selectDifficulty(){
            this.bombs= [];
            this.safeBox = [];
            this.explosion = null;
            this.gameOver = false;
            this.counter = 0;
            if (this.selected === 'Easy'){
                this.difficulty = 100;
            }else if(this.selected === 'Hard'){
                this.difficulty = 81;
            }else{
                this.difficulty = 49;
            }
        },
        // funzione che genera randomicamente 16 numeri che rappresentano le caselle bomba
        // compresi tra 1 e il numero massimo contenuto nell'ultima casella
        gridBombs(){
            let singleBomb;
            while (this.bombs.length < 16){
                singleBomb = Math.floor((Math.random() * this.difficulty) + 1);
                if (!this.bombs.includes(singleBomb)){
                    this.bombs.push(singleBomb);
                }
            }
            this.bombs.sort((a, b) => a - b);
        },
        // funzione che controlla se la casella cliccata è una bomba oppure no
        // index ---> indice per verificare se la casella è una bomba e quindi terminare il gioco
                  //  oppure continuare e aumentare il counter del punteggio
        areYouABomb(index){
            // index + 1 perchè l'array con i numeri delle bombe parte da 1 e non da 0 come gli indici
            if(this.bombs.includes(index + 1)){
                this.explosion = index;
                this.gameOver = true;
                alert('Hai perso, riprova!!!!')
            }else if(!this.safeBox.includes(index)){
                this.safeBox.push(index)
                this.counter++
            }
            if(this.safeBox.length >= this.difficulty - 16){
                alert('Congratulazioni, hai vinto!!!!')
                this.gameOver = true;
            }
        }
    },
    mounted() {

    }
}).mount('#app');
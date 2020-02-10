$(document).ready(function() {
    //     // Insert your JQuery code for the game

    //     var tab_game = [
    //         [0, 0, 0, 0, 0, 0, 0],
    //         [0, 0, 0, 0, 0, 0, 0],
    //         [0, 0, 0, 0, 0, 0, 0],
    //         [0, 0, 0, 0, 0, 0, 0],
    //         [0, 0, 0, 0, 0, 0, 0],
    //         [0, 0, 0, 0, 0, 0, 0]
    //     ];  // ce tableau represente la grille de jeu (6 de hauteur, 7 de largeur), il vous sera très utile pour identifier le nombre de jeton aligner !

    //     var player_turn = 1; // permet de determiner a quelle joueur c'est le tour (joueur1 = 1, joueur2 = 2)

    //     // exemple d'utilisation :

    //     $("td").click(function() {

    //         let row_id = $(this).attr('data-id'); // récupere l'index de la case cliker
    //         let col_id = $(this).parent().attr('data-id'); // récupere l'index de la colonne correspondant a la case clicker


    //         if (player_turn === 1) {  // player 1 turn

    //             tab_game[col_id][row_id] = 1; // on definis un jeton pour le player 1 dans notre tableau représentant notre grille de jeu

    //             player_turn = 2; // Comme le player 1 viens de jouer on definis player_turn à 2 pour indiquez que c'est au player 2 de jouer

    //             $(this).children().attr('src', 'img/jetonrouge.jpg'); // on affiche visuellement sur la grille de jeu le jeton correspondant au player 1

    //         }
    //         else { // player 2 turn

    //             tab_game[col_id][row_id] = 2; // on definis un jeton pour le player 2 dans notre tableau représentant notre grille de jeu

    //             player_turn = 1; // Comme le player 2 viens de jouer on definis player_turn à 1 pour indiquez que c'est au player 1 de jouer

    //             $(this).children().attr('src', 'img/jetonbleu.jpg'); // on affiche visuellement sur la grille de jeu le jeton correspondant au player 2

    //         }




    //     });

    //     // ATTENTION ! Dans l'exemple ci-dessus on insere directement le jeton sur l'élement de la colonne clicker ->
    //     // au puissance4 on veut que le jeton descende au plus bas de la colonne clicker en fonction de si il y a des jeton en dessous ou pas ->
    //     // qui plus est si vous tester vous verrez que l'on peut placer un jeton sur un autre jeton, encore une fois ceci n'est qu'un exemple pour vous aider a démarrer !

    //     // Cette exemple est codé en 'procédural', le faire en orienté objet avec une class Game serait peut etre plus adapter ;-)


    // });

    class Puissance4 {

        constructor(grid_dimension = { x: 7, y: 6 }) {
            this.grid_dimension = grid_dimension;
            this.player_one = 1;
            this.player_two = 2;
            this.turn = this.player_one;
            this.max_turn = this.grid_dimension.x * this.grid_dimension.y;
            this.count_turn = 0;
            this.winner = null;
            this.grid = [];

            this.generate_grid();

            $("td").click((e) => this.handleClick(e));
        }

        handleClick(e) {
            let x = parseFloat($(e.target).parent().attr('data-col'));
            let y = this.check_last_index(x);

            this.addJetons(y, x);
            // this.win();
            // this.reset();
        }




        addJetons(y, x) {
            // ici on update notre grille javascript
            this.grid[y][x] = this.turn;


            this.count_turn++;

            // ici on update notre table html (pour placer visuellement le jeton)
            // ps : il faut changer le jeton en fonction du joueur courant (this.turn)
            // $("tr:nth-child(" + (y+1) + ") td:nth-child(" + (x+1) + ") img").attr('src', './img/jetonrouge.jpg');


            if (this.turn === this.player_one) {
                $("tr:nth-child(" + (y + 1) + ") td:nth-child(" + (x + 1) + ") img").attr('src', './img/jetonalien.png');

            }
            if (this.turn === this.player_two) {
                $("tr:nth-child(" + (y + 1) + ") td:nth-child(" + (x + 1) + ") img").attr('src', './img/jetonswag.png');

            }
            var check = this.win(y, x, this.turn);
            console.log(check);
            this.turn = 3 - this.turn;
        }

        win(y, x, player) {
            // Horizontal
            let count = 0;

            //check horizontal
            // on boucle sur la largeur. On parcourt chaque colonne de haut en bas. Donc on parcourt chaque colonne (y) en incrémentant l (l=largeur). this.grid.dimension.x est égal à 7. Donc on boucle 7 fois (7 colonnes y) à partir de zéro.
            // Si en bouclant, l'ID du jeton (qui est égal à 1 ou 2) est le même que celui qui le touche à gauche ou à droite, on incrémente. Sinon, on coupe la chaîne de comptage. S'il y a 4 ID jeton similaires alignés, return true.
            for (let l = 0; l < this.grid_dimension.x; l++) {
                count = (this.grid[y][l] == player) ? count + 1 : 0;
                if (count >= 4) {
                    alert(player + " wins");
                    return true;
                }

            }
            // console.log(count)

            //     //check vertical
            count = 0;
            for (let h = 0; h < this.grid_dimension.y; h++) {
                count = (this.grid[h][x] == player) ? count + 1 : 0;
                if (count >= 4) {
                    alert(player + " wins");
                    return true;
                }
            }

            //     // check diagonal 
            count = 0;
            let shift = y - x;
            for (let h = Math.max(shift, 0); h < Math.min(this.grid_dimension.y, this.grid_dimension.x + shift); h++) {
                count = (this.grid[h][h - shift] == player) ? count + 1 : 0;
                if (count >= 4) {
                    alert(player + " wins");
                    return true;
                }
            }

            // check anti diagonal 
            count = 0;
            shift = y + x;
            for (let h = Math.max(shift - this.grid_dimension.y + 1, 0); h < Math.min(this.grid_dimension.y, shift + 1); h++) {
                console.log(h, shift - h, shift)
                count = (this.grid[h][shift - h] == player) ? count + 1 : 0;
                if (count >= 4) {
                    alert(player + " wins");;
                }

            }

            return false;
        }

        // reset() {
        //     for (let i = 0; i < this.grid_dimension.x; i++) {
        //         for (let j = 0; j < this.grid_dimension.y; j++) {
        //             this.grid[i][j] = 0;
        //         }
        //         console.log(reset)
        //     }
        //     this.count_turn = 0;
        //     this.winner = null;;

        // }







        // alterner joueur courant (this.turn)

        // compter les tours (this.count_turn++)

        // check horizontal/vertical/diagonal

        // regarder si victoire ou null



        check_last_index(x) {
            for (let h = this.grid_dimension.y - 1; h >= 0; h--) {
                if (this.grid[h][x] === 0) {
                    return h;
                }
            }

        }






        generate_grid() {
            for (let h = 0; h < this.grid_dimension.y; h++) {
                this.grid[h] = [];
                for (let l = 0; l < this.grid_dimension.x; l++) {
                    this.grid[h][l] = 0;
                }
            }
        }




    }

    var game1 = new Puissance4()


    // this.element.addEventListener('click', (event) => this.handle_click(event));
    //     // On fait l'affichage
    //     this.render();
    //   }

});
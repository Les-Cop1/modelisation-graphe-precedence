function drawGraph(canvas, area, style) {
    let textArea = document.getElementById(area)
    textArea.addEventListener("keyup", () => {
        Clear_Canvas(canvas)
        let args = textArea.value.split(' ').join('').split(';').join('\n').split(/\n/).filter((e) => e)
        let canvasA = document.getElementById(canvas);
        let ctxA = canvasA.getContext("2d");
        let blocs = []
        let line = 0
        let blocsPlace = []

        let destination = {}

        let optimise = () => {
            blocs.map((bloc) => {
                optimiseBloc(bloc)
            })
        }

        let optimiseBloc = (blc) => {
            if (destination[[blc]] !== undefined) {
                destination[[blc]].map((dest) => {
                    let sorties = sortie(dest)
                    sorties.shift()
                    sorties.map((element) => {
                        if (destination[[blc]].indexOf(element))
                            destination[[blc]] = arrayRemove(destination[[blc]], element)//a check

                    })
                })
            }
        }

        function arrayRemove(arr, value) {
            return arr.filter(function (ele) {
                return ele !== value;
            });
        }

        let sortie = (dest) => {
            let array = []
            array.push(dest)
            if (destination[[dest]] !== undefined) {
                let sortieDest = sortie(destination[[dest]])
                sortieDest.map((x) => {
                    if (!Array.isArray(x)) {
                        x = [x]
                    }
                    x.map((y) => {
                        array.push(y)
                    })
                })
            }
            return array
        }

        args.map((x) => {
            if (!x.includes("<")) {
                if (!blocs.includes(x))
                    blocs.push(x)
            } else {
                //récupère les flèches exemple : T1<T2
                let arrow = x.split("<")
                const start = arrow[0]
                const end = arrow[1]
                //même si l'optimisation vas la viré ca fait des vérification en moins
                if (start !== end && blocs.includes(start) && blocs.includes(end)) {
                    if (destination[[start]] === undefined)
                        destination[[start]] = []

                    destination[[start]].push(end)

                    optimise()
                }
            }
        })

        blocs.map((x) => {
            /*
            Possible solution plus propre.

            Il faut imaginer des niveau (colonnes)
            on place d'abord celles qui n'ont personne qui vont vers ce bloc (n'apparait pas dans destination[[x]])
            on place ensuite sur une deuxième colonne toutes les destination de la première colonne
            sur la deuxième ligne les destination de la 3ème colonne.

            (on a encore le droit a une putain de function récursive)

            Pour les relié ca risque d'être plus chiant par contre.
             */

            let flag = false
            console.log("On place", x)
            if (!blocsPlace.includes(x)) {
                if (destination !== undefined) {
                    console.log(x, destination[[x]])
                    for (const [, destBloc] of Object.entries(destination)) {
                        if (destBloc.includes(x))
                            flag = true
                    }
                }
                blocsPlace.push(x)

                if (flag) { //quelqu'un a cette destination
                    if (destination[[x]] === undefined) {
                        PoseTache(ctxA, TX.length ,1, x, style);
                    } else {
                        PoseTache(ctxA, TX.length ,line, x, style);
                    }
                } else {
                    PoseTache(ctxA, 0,line, x, style);
                    line++
                }

            }
        })

        blocs.map((tache) => {//il faut d'abord que les blocs soient crée pour que ca fonctionne pour ca qu'il y a 2 boucles
            if (destination[[tache]] !== undefined) {
                destination[[tache]].map((dest) => {
                    Fleche_DG(ctxA, blocs.indexOf(tache), blocs.indexOf(dest), style);
                })
            }
        })
        console.log("Destination possible :", destination)


// TODO : Afficher le nombre de mots
//document.getElementById("nbrMot").innerText = textArea.value
    });
}

/*
A
B
C
D
E
F
A<B
C<B
B<D
B<E
D<F
E<F
 */

/*
A
B
C
D
B<C
B<D
D<C
D<A
C<A
 */

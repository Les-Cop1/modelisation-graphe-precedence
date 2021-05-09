let graph = (canvas, area, style) => {
    let textArea = document.getElementById(area)
    textArea.addEventListener("keyup", _ => {
        let args = textAreaSplit(textArea.value)
        let blocs = []

        let destination = {}

        let optimise = () => {
            blocs.map((bloc) => {
                optimiseBloc(bloc)
            })
        }

        let optimiseBloc = (blc) => {
            if (!tacheHaveDestination(destination, blc)) {
                destination[[blc]].map((dest) => {
                    let sorties = sortie(dest)
                    sorties.shift()
                    sorties.map((element) => {
                        if (destination[[blc]].indexOf(element)) {
                            destination[[blc]] = arrayRemove(destination[[blc]], element)
                        }
                    })
                })
            }
        }

        let sortie = (dest) => {
            let array = []
            array.push(dest)
            if (!tacheHaveDestination(destination, dest)) {
                let sortieDest = sortie(destination[[dest]])
                sortieDest.map(desti => {
                    desti = stringToArray(desti)
                    desti.map((strDestination) => {
                        array.push(strDestination)
                    })
                })
            }
            return array
        }


        args.map((ligne) => {
            if (isTache(ligne)) {
                if (!blocs.includes(ligne))
                    blocs.push(ligne)
            } else {
                //récupère les flèches exemple : T1<T2
                let arrow = ligne.split("<")
                const start = arrow[0]
                const end = arrow[1]
                //même si l'optimisation vas la viré ca fait des vérification en moins
                if (start !== end && blocs.includes(start) && blocs.includes(end)) {
                    if (tacheHaveDestination(destination, start))
                        destination[[start]] = []

                    destination[[start]].push(end)

                    optimise()
                }
            }
        })

        drawGraph(canvas, style, blocs, destination)

        console.log("Liste des destination possible :", destination)
    });
}


const drawGraph = (canvas, style, listeTaches, listeDestination) => {

    Clear_Canvas(canvas)

    let canvasA = document.getElementById(canvas);
    let ctxA = canvasA.getContext("2d");

    let line = 0

    listeTaches.map((tache) => {
        /*
        Il faut une solution plus propre.

        Il faut imaginer des niveau (colonnes)
        on place d'abord celles qui n'ont personne qui vont vers ce bloc (n'apparait pas dans listeDestination[[tache]])
        on place ensuite sur une deuxième colonne toutes les destination de la première colonne
        sur la deuxième ligne les destination de la 3ème colonne.

        (on a encore le droit a une putain de function récursive)

        Pour les relié ca risque d'être plus chiant par contre.
         */

        let flag = false
        console.log("On place", tache)
        if (listeDestination !== undefined) {
            console.log(`destination de ${tache}`, listeDestination[[tache]])
            for (const [, destBloc] of Object.entries(listeDestination)) {
                if (destBloc.includes(tache))
                    flag = true
            }
        }

        if (flag) { //quelqu'un a cette destination
            if (tacheHaveDestination(listeDestination, tache)) {
                PoseTache(ctxA, TX.length, 1, tache, style);
            } else {
                PoseTache(ctxA, TX.length, line, tache, style);
            }
        } else {
            PoseTache(ctxA, 0, line, tache, style);
            line++
        }
    })

    listeTaches.map((tache) => {//il faut d'abord que les blocs soient crée pour que ca fonctionne pour ca qu'il y a 2 boucles
        if (!tacheHaveDestination(listeDestination, tache)) {
            listeDestination[[tache]].map((dest) => {
                Fleche_DG(ctxA, listeTaches.indexOf(tache), listeTaches.indexOf(dest), style);
            })
        }
    })
}

const arrayRemove = (arr, value) => {
    return arr.filter(ele => ele !== value);
}

const stringToArray = str => {
    if (!Array.isArray(str)) {
        return [str]
    } else
        return str;
}

const tacheHaveDestination = (destination, tache) => destination[[tache]] === undefined

const textAreaSplit = (string) => {
    string = string.split(' ').join('')//trim du bled
    string = string.split(';').join('\n')//permet d'avoir des lignes séparé par des ";"
    string = string.split(/\n/)//crée un tableau tout les "\n"

    return string.filter((e) => e) //supprime les lignes en double
}

const isTache = str => !str.includes("<")

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

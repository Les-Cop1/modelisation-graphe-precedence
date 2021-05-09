function prout(canvas, area, style) {
    let textArea = document.getElementById(area)
    textArea.addEventListener("keyup", () => {
        Clear_Canvas(canvas)
        let args = textArea.value.split(' ').join('').split(/\n/).filter((e) => e)
        let canvasA = document.getElementById(canvas);
        let ctxA = canvasA.getContext("2d");
        let blocs = []

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

        blocs.map((x) => {//a modifier il faut  check si dans la liste des destination ils peux aller a plusieurs endroit
            //dans ce cas il faut mettre en bas ou a droite ou en diagonale en bas
            TX.push(TX.length * 100)
            TY.push(20)
            Tache(ctxA, TX.length - 1, x, style);
        })

        blocs.map((x) => {
            if (destination[[x]] !== undefined) {
                destination[[x]].map((yuyu) => {
                    Fleche_DG(ctxA, blocs.indexOf(x), blocs.indexOf(yuyu), style);
                })
            }
        })
        console.log("Destination possible :", destination)


// TODO : Afficher le nombre de mots
//document.getElementById("nbrMot").innerText = textArea.value

        blocs = []
        arrows = []
        TX = []
        TY = []
    });
}

function prout(canvas, area, style) {
    let textArea = document.getElementById(area)
    textArea.addEventListener("keyup", () => {
        Clear_Canvas(canvas)
        let args = textArea.value.split(/\n/).filter((e) => e)
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
            if (!x.includes(" < ")) {
                blocs.push(x)
            } else {
                //récupère les flèches exemple : T1<T2
                let arrow = x.split(" < ")
                const start = arrow[0]
                const end = arrow[1]

                if (destination[[start]] === undefined)
                    destination[[start]] = []
                destination[[start]].push(end)

                optimise()
            }
        })

        blocs.map((x) => {
            TX.push(TX.length * 100)
            TY.push(20)
            Tache(ctxA, TX.length - 1, x, style);
        })
        blocs.map((x) => {
            console.log(destination[[x]])
            if (destination[[x]] !== undefined) {
                destination[[x]].map((yuyu) => {
                    console.log("start : ", blocs.indexOf(x) + 1)
                    console.log("end : ", blocs.indexOf(yuyu) + 1)
                    Fleche_DG(ctxA, blocs.indexOf(x), blocs.indexOf(yuyu), style);
                })
            }
        })


// TODO : Afficher le nombre de mots
//document.getElementById("nbrMot").innerText = textArea.value

        blocs = []
        arrows = []
        TX = []
        TY = []
    });
}

function removeUselessArrow(arrows, tache) {
    let arrowWith = arrows.filter(function (item) {
        return item.indexOf(tache) === 0;
    })

    //lors l'ajout d'une tache je check si il peux pas deja y aller
    //pour trouvé les liens sur le quel il peux y aller je regarde ses éléments de sortie et tant qu'il en a il les retourne

    console.log(arrowWith)
    // arrowWith.map((x)=>{
    //     removeUselessArrow(arrows,x.split("<")[1])
    // })


    return arrows
}

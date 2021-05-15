let graph = (canvas, area, style) => {
    let textArea = document.getElementById(area)
    textArea.addEventListener("keyup", _ => {
        let {blocs, fleches} = textAreaSplit(textArea.value)

        console.log("blocs", blocs)
        console.log("fleches", fleches)

        let formatedBlocs = orderBlocks(blocs, fleches)

        optimise(formatedBlocs)

        const firstCol = blocs.filter((bloc) => {
            return formatedBlocs[bloc].parents.length === 0
        })

        formatedBlocs = calculDistance(formatedBlocs, firstCol, 0)
        const nbCol = Object.entries(formatedBlocs).reduce(maxColReducer, 0) + 1

        const rows = Array.from({length: nbCol}, (v, k) => 0);
        Object.entries(formatedBlocs).forEach(([name, bloc]) => {
            formatedBlocs[name].row = (rows[bloc.col]++)
        })

        // TODO : Dessiner le graph avec les col et rows du formatedBlocs
        drawGraph(canvas, style, formatedBlocs, firstCol)
    });
}

const textAreaSplit = (string) => {
    let text = string.replace(' ', ';').replace(',', ';').replace(/\\[rn]|[\r\n]/g, ";")
    const groups = [...new Set(text.split(';'))]
    text = text.replace(new RegExp("[>|<–]", "g"), ";")
    const blocs = [...new Set(text.split(';'))]
    return {
        blocs,
        fleches: groups.filter(a => (a.includes('>') || a.includes('<')))
    }
}

const orderBlocks = (blocs, fleches) => {
    let result = {}
    blocs.forEach(bloc => {
        result[bloc] = {
            name: bloc,
            col: null,
            row: null,
            enfants: [],
            parents: []
        }
    })
    fleches.forEach(fleche => {
        let parent, enfant
        if (fleche.includes('<')) {
            [parent, enfant] = fleche.split('<')
        } else if (fleche.includes('>')) {
            [enfant, parent] = fleche.split('>')
        }
        result[parent].enfants.push(enfant)
        result[enfant].parents.push(parent)
    })
    return result
}

const calculDistance = (formatedBlocs, currentCol, distance) => {
    currentCol.forEach((bloc) => {
        if (formatedBlocs[bloc].col !== null) {
            formatedBlocs[bloc].col = formatedBlocs[bloc].col < distance ? formatedBlocs[bloc].col : distance
        } else {
            formatedBlocs[bloc].col = distance
        }
        formatedBlocs = calculDistance(formatedBlocs, formatedBlocs[bloc].enfants, distance + 1)
    })
    return formatedBlocs
}

const maxColReducer = (maxCol, currentValue) => {
    const currentCol = currentValue[1].col
    return maxCol < currentCol ? currentCol : maxCol
}

let optimise = (formatedBlocs) => {
    for (const key of Object.keys(formatedBlocs)) {
        optimiseBloc(key, formatedBlocs)
    }
}

let optimiseBloc = (blc, desti) => {
    if (desti[[blc]].enfants.length !== 0) {
        desti[[blc]].enfants.map((dest) => {
            desti[[dest]].enfants.map((elt) => {
                if (desti[[blc]].enfants.indexOf(elt)) {
                    desti[[blc]].enfants = arrayRemove(desti[[blc]].enfants, elt)
                    desti[[elt]].parents = arrayRemove(desti[[elt]].parents, blc)
                }
            })
        })
    }
}

const drawGraph = (canvas, style, formatedBlocs, firstCol) => {

    Clear_Canvas(canvas)

    let canvasA = document.getElementById(canvas);
    let ctxA = canvasA.getContext("2d");

    let line = 0

    listeTaches.map((tache) => {
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
            if (tacheDontHaveDestination(listeDestination, tache)) {
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
        if (!tacheDontHaveDestination(listeDestination, tache)) {
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

const tacheDontHaveDestination = (tache, destination) => destination[[tache]].enfants.length === 0

/*
T1
T2
T3
T4
T5
T1<T2
T2<T3
T4<T5
 */

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

function prout (canvas,area, style) {
    let textArea = document.getElementById(area)
    textArea.addEventListener("keyup", () => {
        Clear_Canvas(canvas)
        let arguments = textArea.value.split(/\n/).filter((e) => e)
        let canvasA = document.getElementById(canvas);
        let ctxA = canvasA.getContext("2d");
        let bloc = []
        let arrows = []
        arguments.map((x) => {
            if (x.includes("<")) {
                arrows.push(x)
            } else {
                bloc.push(x)
            }
        })

        bloc.map((x) => {
            TX.push(TX.length * 100)
            TY.push(20)
            Tache(ctxA, TX.length - 1, x, style);
        })

        for (let i = 0; i < arrows.length; i++) {
            let arrow = arrows[i].split("<")
            arrow = arrow.map(str => str.replace(/\s/g, ''))
            if (arrow[0] !== arrow[1])//check si T1<T3 alors que T1<T2 & T2<T3
                Fleche_DG(ctxA, bloc.indexOf(arrow[0]), bloc.indexOf(arrow[1]), style);
        }

        // TODO : Afficher le nombre de mots
        //document.getElementById("nbrMot").innerText = textArea.value

        bloc = []
        arrows = []
        TX = []
        TY = []
    });
}

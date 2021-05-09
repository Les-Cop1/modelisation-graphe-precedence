function Clear_Canvas( NomCanvas ) {
    let canvas = document.getElementById(NomCanvas);
    let ctx = canvas.getContext("2d");

    ctx.save();

    ctx.setTransform( 1, 0, 0, 1, 0, 0 );
    ctx.resetTransform();

    ctx.clearRect( 0, 0, canvas.width, canvas.height );

    ctx.restore();
} // >>>> Clear_Canvas

function Ecrire_TEXT( p_X, p_Y, p_Text, p_Color ) {
    ctx.beginPath();
    ctx.font = '24px serif';
    ctx.fillStyle = p_Color;
    ctx.fillText( p_Text, p_X-6, p_Y+10 );
    ctx.closePath();
} // >>>> Ecrire_TEXT

function Norm( xA,yA ,xB,yB ) {
    return Math.sqrt( Math.pow( xB-xA, 2 ) + Math.pow(yB-yA, 2 ) );
} // >>>> Norm

function Vecteur( ctx, xA,yA,xB,yB, p_Color) {
    let ArrowLength = 10;
    let ArrowWidth = 8;
    ctx.lineCap="round";
    //-- http://xymaths.free.fr/Informatique-Programmation/javascript/canvas-dessin-fleche.php
    //-- Calculs des coordonnées des points C, D et E
    let AB = Norm(xA, yA, xB, yB);
    let xC = xB + ArrowLength * (xA - xB) / AB;
    let yC=yB+ArrowLength*(yA-yB)/AB;
    let xD = xC + ArrowWidth * (-(yB - yA)) / AB;
    let yD=yC+ArrowWidth*(xB-xA)/AB;
    let xE = xC - ArrowWidth * (-(yB - yA)) / AB;
    let yE=yC-ArrowWidth*(xB-xA)/AB;
    // et on trace le segment [AB], et sa flèche:
    ctx.beginPath();
    ctx.moveTo(xA,yA);ctx.lineTo(xB,yB);
    ctx.moveTo(xD,yD);ctx.lineTo(xB,yB);ctx.lineTo(xE,yE);
    ctx.strokeStyle = p_Color;
    ctx.stroke();
} // >>>> Vecteur

function Dessiner_Segment( ctx, XD, YD, XF, YF, p_Color ) {
    ctx.beginPath();
    ctx.moveTo( XD, YD );
    ctx.lineTo( XF, YF );
    ctx.strokeStyle = p_Color;
    ctx.stroke();
    ctx.closePath();
} // >>>> Dessiner_Segment

function Dessiner_Fleche_DG( ctx, p_XA, p_YA, p_XB, p_YB, p_Color ) {
    let XA = p_XA+40;
    let YA = p_YA+20;
    let XB = p_XB;
    let YB = p_YB+20;
    let XM = ( XA + XB ) /2;
    let YM = ( YA + YB ) /2;
    Vecteur( ctx, XA, YA, XM, YM, p_Color );
    Dessiner_Segment( ctx, XM, YM, XB, YB, p_Color  );
} // >>>> Dessiner_Fleche_DG

function Dessiner_Fleche_DG_T( ctx, p_XA, p_YA, p_XB, p_YB, p_Color ) {
    let XA = p_XA+40;
    let YA = p_YA+20;
    let XB = p_XB;
    let YB = p_YB+20;
    let XM = ( XA + 3*XB ) /4;
    let YM = ( YA + 3*YB ) /4;
    Vecteur( ctx, XA, YA, XM, YM, p_Color );
    Dessiner_Segment( ctx, XM, YM, XB, YB, p_Color  );
} // >>>> Dessiner_Fleche_DG

function Dessiner_Fleche_GD( ctx, p_XA, p_YA, p_XB, p_YB, p_Color ) {
    let XA = p_XA;
    let YA = p_YA+20;
    let XB = p_XB+40;
    let YB = p_YB+20;
    let XM = ( XA + XB ) /2;
    let YM = ( YA + YB ) /2;
    Vecteur( ctx, XA, YA, XM, YM, p_Color );
    Dessiner_Segment( ctx, XM, YM, XB, YB, p_Color  );
} // >>>> Dessiner_Fleche_GD

function Dessiner_Fleche_HB( ctx, p_XA, p_YA, p_XB, p_YB, p_Color  ) {
    let XA = p_XA+20;
    let YA = p_YA;
    let XB = p_XB+20;
    let YB = p_YB+40;
    let XM = ( XA + XB ) /2;
    let YM = ( YA + YB ) /2;
    Vecteur( ctx, XA, YA, XM, YM, p_Color  );
    Dessiner_Segment( ctx, XM, YM, XB, YB, p_Color  );
} // >>>> Dessiner_Fleche_HB

function Dessiner_Fleche_BH( ctx, p_XA, p_YA, p_XB, p_YB, p_Color  ) {
    let XA = p_XA+20;
    let YA = p_YA+40;
    let XB = p_XB+20;
    let YB = p_YB;
    let XM = ( XA + XB ) /2;
    let YM = ( YA + YB ) /2;
    Vecteur( ctx, XA, YA, XM, YM, p_Color  );
    Dessiner_Segment( ctx, XM, YM, XB, YB, p_Color  );
} // >>>> Dessiner_Fleche_BH

function Dessiner_RECT( ctx, XD, YD, WW, HH, p_Color ) {
    ctx.beginPath();
    ctx.moveTo( XD, YD );
    ctx.lineTo( XD, YD+HH );
    ctx.lineTo( XD+WW, YD+HH );
    ctx.lineTo( XD+WW, YD );
    ctx.lineTo( XD, YD );
    ctx.strokeStyle = p_Color;
    ctx.stroke();
    ctx.closePath();
} // >>>> Dessiner_RECT

function Dessiner_TACHE( ctx, p_X, p_Y, p_Nom, p_Color  ) {
    Dessiner_RECT( ctx, p_X, p_Y , 40, 40, p_Color );

    ctx.beginPath();
    ctx.font = '18px serif';
    ctx.fillStyle = p_Color;
    if ( p_Nom.length < 3 ) {
        ctx.fillText( p_Nom, p_X+10, p_Y+25 );
    } else {
        ctx.fillText( p_Nom, p_X+6, p_Y+25 );
    }

    ctx.closePath();
} // >>>> Dessiner_TACHE

function PoseTache( ctx, p_NX, p_NY, p_Nom, p_Color ) {
    const BD = 40;
    const DX = 80;
    const DY = 80;
    const PosX = BD + p_NX * DX;
    const PosY = BD + p_NY  * DY;
    console.log("p_Color",p_Color)
    Dessiner_TACHE( ctx, PosX, PosY, p_Nom, p_Color );
}

function Tache( ctx, p_Num, p_Nom, p_Color  ) {
    Dessiner_TACHE( ctx, TX[ p_Num ], TY[ p_Num ], p_Nom, p_Color  );
} // >>>> Tache

function Fleche_DG( ctx, p_From, p_To, p_Color  ) {
    Dessiner_Fleche_DG( ctx, TX[ p_From ], TY[ p_From ], TX[ p_To ], TY[ p_To ], p_Color  );
} // >>>> Fleche_DG

function Fleche_DG_T( ctx, p_From, p_To, p_Color  ) {
    Dessiner_Fleche_DG_T( ctx, TX[ p_From ], TY[ p_From ], TX[ p_To ], TY[ p_To ], p_Color  );
} // >>>> Fleche_DG_T

function Fleche_GD( ctx, p_From, p_To, p_Color  ) {
    Dessiner_Fleche_GD( ctx, TX[ p_From ], TY[ p_From ], TX[ p_To ], TY[ p_To ], p_Color  );
} // >>>> Fleche_GD

function Fleche_HB( ctx, p_From, p_To, p_Color  ) {
    Dessiner_Fleche_HB( ctx, TX[ p_From ], TY[ p_From ], TX[ p_To ], TY[ p_To ], p_Color  );
} // >>>> Fleche_HB

function Fleche_BH( ctx, p_From, p_To, p_Color  ) {
    Dessiner_Fleche_BH( ctx, TX[ p_From ], TY[ p_From ], TX[ p_To ], TY[ p_To ], p_Color  );
} // >>>> Fleche_BH

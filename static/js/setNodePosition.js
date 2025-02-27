function setPosition(pX, pY, switchVar) {
    let chX = pX;
    let chY = pY;

    switch (switchVar) {

        case 0:
            chX = pX - 200;
            chY = pY;
            break;
        case 1:
            chX = pX - 200;
            chY -= 100;
            break;
        case 2:
            chX = pX - 50;
            chY = pY - 150;
            break;
        case 3:
            chX = pX + 100;
            chY = pY - 150;
            break;
        case 4:
            chX = pX + 200;
            chY = pY - 80;
            break;
        case 5:
            chX = pX + 250;
            chY = pY;
            break;
        case 6:
            chX = pX + 250;
            chY = pY + 100;
            break;
        case 7:
            chX = pX + 100;
            chY = pY + 150;
            break;
        case 8:
            chX = pX - 50;
            chY = pY + 150;
            break;
        case 9:
            chX = pX - 200;
            chY = pY + 150;
            break;
        default:
            chX = pX + 100;
            chY = pY + 100;
            break;
    }

    return [chX, chY];

}


function setPositionBig(pX, pY, switchVar) {
    let chX = pX;
    let chY = pY;

    switch (switchVar) {

        case 0:
            chX = pX + 300;
            chY = pY - 50;
            break;
        case 1:
            chX = pX - 200;
            chY = pY - 200;
            break;
        case 2:
            chX = pX - 150;
            chY = pY - 250;
            break;
        case 3:
            chX = pX + 100;
            chY = pY - 250;
            break;
        case 4:
            chX = pX + 350;
            chY = pY - 250;
            break;
        case 5:
            chX = pX + 350;
            chY = pY - 100;
            break;
        case 6:
            chX = pX + 250;
            chY = pY + 100;
            break;
        case 7:
            chX = pX + 50;
            chY = pY + 250;
            break;
        case 8:
            chX = pX - 200;
            chY = pY + 150;
            break;
        case 9:
            chX = pX - 200;
            chY = pY + 150;
            break;
        default:
            chX = pX + 100;
            chY = pY + 100;
            break;
    }

    return [chX, chY];
}

function setLDPosition(pX, pY, switchVar){
    let chX = pX;
    let chY = pY;
    console.log("switchVar ---" + switchVar);
    console.log("pX  " + pX + "  pY  " + pY);
    switch (switchVar) {

        case 0:
            chX = pX + 300;
            chY = pY + 300;
            break;
        case 1:
            chX = pX + 400;
            chY = pY + 50;
            break;
        case 2:
            chX = pX + 350;
            chY = pY - 200;
            break;
        case 3:
            chX = pX + 450;
            chY = pY + 300;
            break;
        case 4:
            chX = pX + 350;
            chY = pY - 250;
            break;
        case 5:
            chX = pX + 350;
            chY = pY - 100;
            break;
        case 6:
            chX = pX + 250;
            chY = pY + 100;
            break;
        case 7:
            chX = pX + 100;
            chY = pY + 150;
            break;
        case 8:
            chX = pX - 200;
            chY = pY + 150;
            break;
        case 9:
            chX = pX - 200;
            chY = pY + 150;
            break;
        default:
            chX = pX + 100;
            chY = pY + 100;
            break;
    }

    return [chX, chY];

}
function setLDPositionBig(pX, pY, switchVar) {
    let chX = pX;
    let chY = pY;
    console.log("switchVar ---" + switchVar);
    console.log("pX  " + pX + "  pY  " + pY);
    switch (switchVar) {
        case 0:
            chX = pX - 200;
            chY = pY;
            break;
        case 1:
            chX = pX - 200;
            chY = pY - 200;
            break;
        case 2:
            chX = pX - 50;
            chY = pY + 300;
            break;
        case 3:
            chX = pX + 100;
            chY = pY - 250;
            break;
        case 4:
            chX = pX + 350;
            chY = pY - 250;
            break;
        case 5:
            chX = pX + 350;
            chY = pY - 100;
            break;
        case 6:
            chX = pX + 250;
            chY = pY + 100;
            break;
        case 7:
            chX = pX + 200;
            chY = pY + 400;
            break;
        case 8:
            chX = pX - 200;
            chY = pY + 150;
            break;
        case 9:
            chX = pX - 200;
            chY = pY + 150;
            break;
        default:
            chX = pX + 100;
            chY = pY + 100;
            break;
    }

    return [chX, chY];
}


function setPositionVars(pX, pY, j) {
    console.log("j="   + j + "   "+ "X= " + pX + "  Y= " + pY);
    let chX = pX;
    let chY = pY;
    if (j === 0){
        chX = 0;
        chY = pY;
    }else if (j === 1){
        chX += 250;
        chY = pY;
    }else if (j%5 === 0){
        chX = 0;
        chY = chY + 100;
    }else {
        chX = chX + 250;
        chY = pY;
    }
    return [chX, chY];
}


function setPositionBigVars(pX, pY, j) {
    let chX = pX;
    let chY = pY;
    if (j === 0){
        chX = 0;
        chY = pY;
    }
    else if (j%5 === 0){
        chX = 0;
        chY = chY + 450;
    }else {
        chX += 350;
        chY += 50;
    }
    return [chX, chY];
}


function setPositionPBig(pX, pY, j) {
    let chX = pX;
    let chY = pY;
    switch (j) {
        case 0:
        case 1:
        case 2:
        case 3:
            chX = pX - 250;
            chY = pY + (j * 100);
            break;
        case 4:
            chX = pX - 250;
            chY = pY - (j * 50);
            break;
        case 5:
            chX = pX;
            chY = pY - (j * 50);
            break;
        case 6:
            chX = pX + 200;
            chY = pY - 200;
            break;
        case 7:
            chX = pX + 400;
            chY = pY;
            break;
        case 8:
            chX = pX + 400;
            chY = pY + 200;
            break;
        case 9:
            chX = pX + 300;
            chY = pY + 300;
            break;
        case 10:
            chX = pX + 400;
            chY = pY + 400;
            break;

    }
    return [chX, chY];
}

function setPositionLDL2Big(pX, pY , indx) {
    let chX = pX;
    let chY = pY;
    switch (indx) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
            chX = pX - 300;
            chY = pY + 50;
            break;
        case 8:
        case 9:
            chX = pX + 150;
            chY = pY - 150;
            break;
        case 10:
            chX = pX + 150;
            chY = pY;
            break;
        case 11:
        case 12:
            chX = pX + 100;
            chY = pY - 150;
            break;
        case 13:
        case 14:
            chX = pX + 250;
            chY = pY - 200;
            break;
    }
    return [chX, chY];
}

function setPositionLDL2(pX, pY , indx) {
    let chX = pX;
    let chY = pY;
    switch (indx) {
        case 0:
            chX = pX;
            chY = pY - 200;
            break;
        case 1:
            chX = pX - 200;
            chY = pY - 200;
            break;
        case 2:
            chX = pX - 200;
            chY = pY - 50;
            break;
        case 3:
            chX = pX - 200;
            chY = pY + 100;
            break;
        case 4:
            chX = pX + 200;
            chY = pY - 200;
            break;
        case 5:
            chX = pX + 250;
            chY = pY - 100;
            break;
        case 6:
            chX = pX + 250;
            chY = pY;
            break;
        case 7:
            chX = pX + 200;
            chY = pY + 100;
            break;
        case 8:
            chX = pX;
            chY = pY + 200;
            break;
        case 9:
            chX = pX + 150;
            chY = pY;
            break;
        case 10:
            chX = pX + 200;
            chY = pY;
            break;
        case 11:
            chX = pX + 100;
            chY = pY - 200;
            break;
        case 12:
            chX = pX + 100;
            chY = pY - 100;
            break;
        case 13:
        case 14:
            chX = pX + 50;
            chY = pY - 200;
            break;
        case 15:
        case 16:
            chX = pX - 100;
            chY = pY - 100;
            break;
        case 17:
        case 18:
        case 19:
        case 20:
            chX = pX + indx * 10 + 100;
            chY = pY - 100;
            break;

    }

    return [chX, chY];

}

function tecnical_data_catastrophe(x, y, j, varList, thrH) {
    let varH = y;
    let varW = x;
    let i = j;
    if (i === 0){
        varH = 50;
        varW = 10;
    }else if([8,24,32, 40].includes(i)) {
        varH += 100;
        varW = 10;
    }else if(i === 16) {
        varH = thrH + 400;
        varW = 10;
    }else if( i < 8 || i > 8) {
        varW += 200;
    }
    return [varW, varH];

}
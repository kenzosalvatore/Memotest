var numeros = new Array(1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8);
var tarjeta1 = "";
var tarjeta2 = "";
var resultado1 = "";
var resultado2 = "";
var aciertos = 0;
var errores = 0;
var movimientos = 15;



//Desordena las tarjetas al comenzar

function comenzar() {
    $("#memotest").css("display", "block");
    numeros.sort(function () {
        return Math.random() - 0.5
    });
    $("#comenzar").css("display", "none");
    $("#slogan").css("display", "none");
    $("#instrucciones").css("display", "none");
    $("#estadisticas").css("display", "block");
    $("#reiniciar").css("display", "flex");
}


//Girar las tarjetas
var tarjetasGiradas = 0;



function darVuelta(id) {
    tarjetasGiradas++;



    if (tarjetasGiradas == 1) { //Muestra el primer número
        tarjeta1 = document.getElementById(id);
        resultado1 = numeros[id];
        tarjeta1.innerHTML = `<img src="imagenes/nivel_1/${resultado1}.png" alt="imagen del memotest">`;
        $(tarjeta1).css({
            backgroundColor: "#030BA6"
        })

        tarjeta1.disabled = true
    } else if (tarjetasGiradas == 2) { //Muestra el segundo número
        tarjeta2 = document.getElementById(id);
        resultado2 = numeros[id];
        tarjeta2.innerHTML = `<img src="imagenes/nivel_1/${resultado2}.png" alt="imagen del memotest">`;
        tarjeta2.disabled = true;
        $(tarjeta2).css({
            backgroundColor: "#030BA6"
        })


        //Mecánica principal del juego
        if (resultado1 == resultado2) {
            aciertos = (aciertos + 1)
            tarjetasGiradas = 0;

            $(tarjeta1).css({
                backgroundColor: "#4AF030"
            });
            $(tarjeta2).css({
                backgroundColor: "#4AF030"
            });
            $('#aciertos').text("Aciertos: " + aciertos)
            if (aciertos == 8) {
                $("#ganaste").css("display", "block");
                $("#nivelsig").css("display", "flex");
                $("#reiniciar").css("display", "none");
            }
        } else {
            movimientos = (movimientos - 1);
            errores = (errores + 1)
            $('#errores').text("Errores: " + errores)
            $('#movimientos').text("Movimientos restantes: " + movimientos)
            if (movimientos == 0) {
                $("#memotest").css("display", "none");
                $("#perdiste").css("display", "block");
            }
            else if (movimientos <= 3) {
                $("#movimientos").css("color", "#FF0000");
            }
            setTimeout(() => {
                tarjeta1.innerHTML = "?";
                tarjeta2.innerHTML = "?";
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasGiradas = 0;
                $(tarjeta1).css({
                    backgroundColor: "#5E76BF"
                })
                $(tarjeta2).css({
                    backgroundColor: "#5E76BF"
                })
            }, 1000);
        }
    }
}


//hover
$('button').on('mouseenter', function () {
    $(this).css("background-color", "#0A21A6");
});

$('button').on('mouseleave', function () {
    $(this).css("background-color", "#5E76BF");
});


//reiniciar el juego
function reiniciar() {
    numeros.sort(function () {
        aciertos = 0;
        $('#aciertos').text("Aciertos: " + aciertos);
        movimientos = 15;
        $('#movimientos').text("Movimientos restantes: " + movimientos);
        errores = 0;
        $('#errores').text("Errores: " + errores);
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasGiradas = 0;
        $("#movimientos").css("color", "#F2F2F2");
        $("#memotest").css("display", "block");
        $("#perdiste").css("display", "none");
        $("#ganaste").css("display", "none");
        $("#nivel2").css("display", "none");
        $("button").css({
            backgroundColor: "#5E76BF"
        });
        $("button").html("?");
        $("button").removeAttr("disabled");
        return Math.random() - 0.5;
    })
}
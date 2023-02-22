let variableNumerica = 0
let variableString = "0"
let valorAnterior

const screen = document.querySelector(".calculator-screen")

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value)
    }
    else{
        handleNumber(value)
    }

    if(((valorAnterior == "+")||(valorAnterior == "−")||(valorAnterior == '×')||(valorAnterior == '÷')||(valorAnterior == '%')) && (variableString == "0") && (variableNumerica != 0)){
        screen.innerText = valorAnterior
    }else if(variableNumerica == 0){
        screen.innerText = variableString
    }else{
        screen.innerText = variableString
    }
}

function handleSymbol(symbol){
    switch(symbol){
        case "C":
            variableString = "0"
            variableNumerica = 0
            break

        case  "=":
            if(valorAnterior == null){
                return
            }
            flushOperation(parseInt(variableString))
            valorAnterior = null
            variableString = variableNumerica
            variableNumerica = 0
            break

        case '←':
            if(variableString.length == 1){
                variableString = "0"
            }
            else{
                variableString = variableString.substring(0, variableString.length - 1)
            }
            break

        case "+":
        case "−":
        case "×":
        case "÷":
        case "%":
            handleMath(symbol)
            break
        default:
            break
    }
}

function handleMath(symbol){
    if(variableString == "0"){
        return
    }
    
    const intvariableString = parseInt(variableString)

    if(variableNumerica == 0){
        variableNumerica = intvariableString
    }
    else{
        flushOperation(intvariableString)
    }
    valorAnterior = symbol
    variableString = "0"
}

function flushOperation(intvariableString){
    if(valorAnterior == "+"){
        variableNumerica += intvariableString
    }
    else if(valorAnterior == "−"){
        variableNumerica -= intvariableString
    }
    else if(valorAnterior == "×"){
        variableNumerica *= intvariableString
    }
    else if(valorAnterior == "÷"){
        variableNumerica /= intvariableString
    }
    else if(valorAnterior == "%"){
        variableNumerica = (variableNumerica*intvariableString)/100
    }
}

function handleNumber(numberString){
    if(variableString == "0"){
        variableString = numberString
    }
    else{
        variableString += numberString
    }
}

function init(){
    document.querySelector(".calculator").addEventListener('click', function(event){
        buttonClick(event.target.innerText)
    })
}

init()
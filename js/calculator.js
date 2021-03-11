/**
 *  Parametros globais
 */
const calculatorButtonsElements = document.querySelectorAll(
  "#keyboard div.row button"
);
const resultDisplayElement = document.querySelector("#calc #display #result p");
var resultDisplayValue = "",
  calcCompletHistoric = "",
  calculated = true;

display();

//--> Botões da calculadora
for (let i = 0; i < calculatorButtonsElements.length; i++) {
  calculatorButtonsElements[i].addEventListener("click", function () {
    switch (calculatorButtonsElements[i].value) {
      case "ac":
        calcCompletHistoric = resultDisplayValue = "";
        break;
      case "ce":
        resultDisplayValue = "";
        break;
      case "/":
        calcCompletHistoric += resultDisplayValue + "/";
        resultDisplayValue = "";
        break;
      case "*":
        calcCompletHistoric += resultDisplayValue + "*";
        resultDisplayValue = "";
        break;
      case "+":
        calcCompletHistoric += resultDisplayValue + "+";
        resultDisplayValue = "";
        break;
      case "-":
        calcCompletHistoric += resultDisplayValue + "-";
        resultDisplayValue = "";
        break;
      case "=":
        calculated = true;
        calcCompletHistoric += resultDisplayValue;
        resultDisplayValue = eval(calcCompletHistoric);
        break;
      case ".":
        break;
      default:
        if (calculated) {
          calcCompletHistoric = resultDisplayValue = "";
          calculated = false;
        }
        resultDisplayValue += calculatorButtonsElements[i].value;
    }
    display();
    /*console.log("Display: " + resultDisplayValue);
    console.log("Histórico: " + calcCompletHistoric);
    console.log("________________________________________________________");*/
  });
}

//--> Display da calculadora
function display() {
  if (resultDisplayValue == "") {
    resultDisplayElement.innerHTML = "0";
    //console.log("zerado");
  } else {
    resultDisplayElement.innerHTML = resultDisplayValue;
  }
  // console.log("não zerado");
}

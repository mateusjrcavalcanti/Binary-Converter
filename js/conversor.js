/**
 *  Autor: Mateus Junior de Macedo Cavalcanti
 */

const converterButtonElement = document.querySelector(
  "#conversor .col-12 button"
);
const entryBaseElement = document.getElementById("entryBase");
const inputValueElement = document.getElementById("inputValue");
const outletBaseElement = document.getElementById("outletBase");
const outputValueElement = document.getElementById("outputValue");
const accordionHistoric = document.querySelector("#accordionHistoric");

//--> Eventos
converterButtonElement.addEventListener("click", function () {
  if(!!inputValueElement.checkValidity()) convertBases();
});
entryBaseElement.addEventListener("change", function () {
  validateConvertBaseToBase()
});
inputValueElement.addEventListener("invalid", function () {});

//--> Conversão entre números e letras da Base 16
function convertLetraNumero(valor) {
  if (valor == "A") return "10";
  if (valor == "B") return "11";
  if (valor == "C") return "12";
  if (valor == "D") return "13";
  if (valor == "E") return "14";
  if (valor == "F") return "15";
  if (valor == "10") return "A";
  if (valor == "11") return "B";
  if (valor == "12") return "C";
  if (valor == "13") return "D";
  if (valor == "14") return "E";
  if (valor == "15") return "F";
  return valor;
}

//--> Faz a correspondencia entre o número da Base e seu respectivo Nome
function convertNomeBase(valor) {
  if (valor == "16") return "Hexadecimal";
  if (valor == "10") return "Decimal";
  if (valor == "8") return "Octal";
  if (valor == "2") return "Binário";
  return valor;
}

//--> Conversão de Base Decimal para uma Base Qualquer por meio da Divisão
function convertFromDecimalToBase(valor, base) {
  //Variáveis
  let dividendo = Math.floor(valor);
  let resultado = [];
  let fatorA = valor % 1;
  let produto;
  //Realiza as operações para os números antes da virgula
  while (dividendo >= base) {
    resultado.push(convertLetraNumero(dividendo % base));
    dividendo = Math.floor(dividendo / base);
  }
  resultado.push(convertLetraNumero(dividendo));
  resultado = resultado.reverse();
  //Realiza as operações para os números após da virgula
  if (fatorA) resultado.push(".");
  while (fatorA != 0) {
    produto = fatorA * base;
    resultado.push(convertLetraNumero(Math.floor(produto)));
    fatorA = produto % 1;
  }
  //Retorna no formato de texto
  return resultado.join("");
}

//--> Conversão a partir de uma Base Qualquer para Base Decimal por meio de Polinômios
function convertFromBaseToDecimal(v, b) {
  //Variáveis
  let string = v.toString();
  let base = b;
  let left = string.split(".")[0];
  let right = string.split(".")[1];
  let expoente,
    resultado,
    valor,
    total = 0;
  //Procedimentos com os números anteriores o "."
  expoente = left.length;
  for (let i = 0; i < left.length; i++) {
    expoente--;
    valor = left[i];
    if (valor == "A") valor = 10;
    if (valor == "B") valor = 11;
    if (valor == "C") valor = 12;
    if (valor == "D") valor = 13;
    if (valor == "E") valor = 14;
    if (valor == "F") valor = 15;
    resultado = valor * Math.pow(base, expoente);
    total += resultado;
    //valor = parseInt(left[i]);
    //console.log("Número " + left[i] + " corresponde a: " + valor + " * " + base + " elevado a " + expoente + " = " + resultado);
  }
  //Procedimentos com os números após o "."
  expoente = 0;
  if (typeof right != "undefined")
    for (let i = 0; i < right.length; i++) {
      expoente++;
      valor = right[i];
      if (valor == "A") valor = 10;
      if (valor == "B") valor = 11;
      if (valor == "C") valor = 12;
      if (valor == "D") valor = 13;
      if (valor == "E") valor = 14;
      if (valor == "F") valor = 15;
      //valor = parseInt(left[i]);
      resultado = valor * Math.pow(base, expoente * -1);
      total += resultado;
      //console.log("Número " + right[i] + " corresponde a: " + valor + " * " + base + " elevado a " + expoente + " = " + resultado);
    }
  return total;
}

//--> Conversão entre bases
function convertBases() {
  let result, caminho;
  if (entryBaseElement.value == 10) {
    result = convertFromDecimalToBase(inputValueElement.value, outletBaseElement.value);
    caminho =
      '<a class="text-success text-decoration-none font-weight-bold">Decimal</a> <a class="text-dark text-decoration-none font-weight-bold">-></a> ' +
      '<a class="text-danger text-decoration-none font-weight-bold">' +
      convertNomeBase(outletBaseElement.value) +
      "</a>";
  } else {
    if (outletBaseElement.value != 10) {
      result = convertFromDecimalToBase(
        convertFromBaseToDecimal(inputValueElement.value, entryBaseElement.value),
        outletBaseElement.value
      );
      caminho =
        '<a class="text-success text-decoration-none font-weight-bold">' +
        convertNomeBase(entryBaseElement.value) +
        '</a> <a class="text-dark text-decoration-none font-weight-bold">-></a> ' +
        '<a class="text-primary text-decoration-none font-weight-bold">Decimal</a> ' +
        '</a> <a class="text-dark text-decoration-none font-weight-bold">-></a> ' +
        '<a class="text-danger text-decoration-none font-weight-bold">' +
        convertNomeBase(outletBaseElement.value) +
        "</a>";
    } else {
      result = convertFromBaseToDecimal(inputValueElement.value, entryBaseElement.value);
      caminho =
        '<a class="text-success text-decoration-none font-weight-bold">' +
        convertNomeBase(entryBaseElement.value) +
        '</a> <a class="text-dark text-decoration-none font-weight-bold">-></a> ' +
        '<a class="text-danger text-decoration-none font-weight-bold">Decimal</a> ' +
        "</a>";
    }
  }
  outputValueElement.value = result;
  historicAddItem(entryBaseElement.value, outletBaseElement.value, inputValueElement.value, result, caminho);
}

//--> Validações
function validateConvertBaseToBase(){
  //Ativa todas as opções
  outletBaseElement.querySelectorAll("option").forEach(function(el) {
    el.disabled = false;
  });
  //Desativa Opção igual
  var option = outletBaseElement.querySelector('option[value="'+entryBaseElement.value+'"]');
  option.disabled = true;
  //Troca de opção
  let bases = ['2', '16', '10', '8'];
  bases.splice(bases.indexOf(entryBaseElement.value), 1);
  outletBaseElement.value = bases[0];
}

//--> Registra a conversão no histórico
function historicAddItem(
  entryBase,
  outletBase,
  inputValue,
  outputValue,
  caminho
) {
  let now = Date.now();
  contentHTML =
    '<div class="accordion-item text-white bg-secondary">' +
    '<h2 class="accordion-header" id="heading' +
    now +
    '">' +
    '<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse' +
    now +
    '" aria-expanded="false" aria-controls="collapse' +
    now +
    '"><a class="text-success text-decoration-none">' +
    inputValue +
    "<sub>" +
    entryBase +
    '</sub></a>&nbsp;equivale a&nbsp;<a class="text-danger text-decoration-none">' +
    outputValue +
    "<sub>" +
    outletBase +
    "</sub></a>" +
    "</button>" +
    "</h2>" +
    '<div id="collapse' +
    now +
    '"class="accordion-collapse collapse" aria-labelledby="heading' +
    now +
    '"data-bs-parent="#accordionHistoric">' +
    '<div class="accordion-body">' +
    "<strong>Caminho da conversão:</strong> " +
    caminho +
    "</div>" +
    "</div>" +
    "</div>";
  accordionHistoric.innerHTML = contentHTML + accordionHistoric.innerHTML;
}

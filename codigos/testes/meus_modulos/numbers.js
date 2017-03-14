/**
 * Created by decker on 14/03/17.
 */

//Este módulo é um dos casos mais simples, em que sua exportação é de somente um objeto contendo um método como parâmetro.
var soma;
soma = function (a, b) {
    return a + b;
};


module.exports.soma = soma;
console.log("[MODULES] Importou numbers!");
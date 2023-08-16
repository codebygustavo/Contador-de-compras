class CaixaDaLanchonete {
  constructor() {
    this.itens = {
      cafe: 3.0,
      chantily: 1.5,
      suco: 6.2,
      sanduiche: 6.5,
      queijo: 2.0,
      salgado: 7.25,
      combo1: 9.5,
      combo2: 7.5,
    };
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    if (!this.verificarFormaDePagamento(metodoDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    } else if (itens.some((item) => parseInt(item.split(",")[1]) <= 0)) {
      // 'sanduiche, 2'
      return "Quantidade inválida!";
    } else {

      let totalAPagar = this.calcularTotalAPagar(itens);
      let valorFinalASePagar = this.definirOMetodoDePagamento(
        totalAPagar,
        metodoDePagamento
      );

      if (isNaN(valorFinalASePagar)) {
        return "Item inválido!";
      }

      let resultadoEsperado = `R$ ${valorFinalASePagar.toFixed(2)}`.replace(
        ".",
        ","
      );

      let retornoDaListaFinal = itens.map((item) => {
        const [NomeDoItem, numeroDaQuantidade] = item.split(",");
        return `${numeroDaQuantidade} - ${NomeDoItem}`;
      });

      for (const itemArray of itens) {
        const [item, _] = itemArray.split(",");
        if (
          (item.toLowerCase() === "chantily" &&
            !this.verificarItemPrincipal("chantily", itens, "cafe")) ||
          (item.toLowerCase() === "queijo" &&
            !this.verificarItemPrincipal("queijo", itens, "sanduiche"))
        ) {
          return "Item extra não pode ser pedido sem o principal";
        }else{
          console.log(`Lista de compras: ${retornoDaListaFinal}`);
          return resultadoEsperado;
        }
      }
    }
  }

  calcularTotalAPagar(itens) {
    let totalAPagar = 0;

    for (const itemArray of itens) {
      const [codigoDoItem, quantidadeDeItens] = itemArray.split(",");
      // 'cafe,2'
      if (this.itens.hasOwnProperty(codigoDoItem)) {
        const valorIndividuaDoItem = this.calcularValorDoItem(
          codigoDoItem,
          quantidadeDeItens
        );
        totalAPagar += valorIndividuaDoItem;
      } else {
        return `Item inválido!`;
      }
    }

    if (totalAPagar != 0) {
      return totalAPagar;
    } else {
      return "Item inválido!";
    }
  }

  definirOMetodoDePagamento(totalAPagar, metodoDePagamento) {
    switch (metodoDePagamento) {
      case "dinheiro":
        return totalAPagar * 0.95;
      case "debito":
        return totalAPagar;
      case "credito":
        return totalAPagar * 1.03;
      default:
        return "Forma de pagamento inválida!";
    }
  }

  calcularValorDoItem(codigoDoItem, quantidadeDeItens) {
    const valorUnico = this.itens[codigoDoItem];
    return valorUnico * parseInt(quantidadeDeItens);
  }

  verificarFormaDePagamento(metodoDePagamento) {
    return ["dinheiro", "debito", "credito"].includes(metodoDePagamento);
  }

  verificarItemPrincipal(item, itens, itemPrincipal) {
    const itemExtras = {
      chantily: "cafe",
      queijo: "sanduiche",
    };

    if (itemExtras[item] && !itens.includes(itemExtras[itemPrincipal])) {
      return false;
    }
    return true;
  }

}

export { CaixaDaLanchonete };

// const caixa = new CaixaDaLanchonete();
// console.log(caixa.calcularValorDaCompra("debito", ["queijo,1", "cafe,1"]));
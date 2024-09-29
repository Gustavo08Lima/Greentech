//RECUPERAR O ID DETALHE NO LOCALSTORAGE

var id = parseInt(localStorage.getItem('detalhe'));

// Pegar os produtos do localStorage
var produtos = JSON.parse(localStorage.getItem('produtos'))

var item = produtos.find(produtos => produtos.id === id);

if(item) {
    //Tem o item
    console.log('Produto encontrado', item);

    // Alimentar os valores do item
    $("#imagem-detalhe").attr('src', item.imagem);
    $("#nome-detalhe").html(item.nome);
    $("#rating-detalhe").html(item.rating);
    $("#like-detalhe").html(item.likes);
    $("#reviews-detalhe").html(item.reviews + ' Reviews');
    $("#descricao-detalhe").html(item.descricao);
    $("#preco-detalhe").html(item.preco.toLocaleString('pt-BR', { style:'currency', currency: 'BRL'}));
    $("#precopromo-detalhe").html(item.preco_promocional.toLocaleString('pt-BR', { style:'currency', currency: 'BRL'}));

    var tabelaDetalhes = $("#tabledetalhes")

    item.detalhes.forEach(detalhe=>{
            var linha = ` <tr>
                                <td> ${detalhe.caracteristica}</td>
                                <td> ${detalhe.detalhes}</td>
                                   
                          </tr>
                        `

                        tabelaDetalhes.append(linha);
    })

}
else { 
    //Não tem o item
    console.log('Produto não encontrado');
}


console.log(item.imagem);
// Verifique a URL aqui

//function de adicionar ao Carrinho 
var Carrinho = JSON.parse(localStorage.getItem('Carrinho')) || []
function adicionarAoCarrinho(item, quantidade) {
  
  var itemNoCarrinho = Carrinho.find(c => c.item.id === item.id)

  if(itemNoCarrinho) {
    //Ja tem item no Carrinho
    // Adicionar a quantidade 

    itemNoCarrinho.quantidade += quantidade;
    itemNoCarrinho.total_item = itemNoCarrinho.quantidade * item.preco_promocional

} else {
  Carrinho.push({
    item: item,
    quantidade: quantidade,
    total_item: quantidade * item.preco_promocional
  })
}

    //Atualizar o LocalStorage do aCarrinho

    localStorage.setItem('Carrinho', JSON.stringify(Carrinho))

}
$(".add-cart").on('click', function() {
    //Adicionar ao Carrinho
    adicionarAoCarrinho(item, 1);

   
   var toastCenter = app.toast.create({
          text: `${item.nome} Adicionado ao Carrinho!`,
          position: 'center',
          closeTimeout: 2000,
        });

        toastCenter.open();
      }
)


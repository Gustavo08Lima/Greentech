var localCarrinho = localStorage.getItem('Carrinho')

if(localCarrinho) {

    var carrinho = JSON.parse(localCarrinho)

    if(carrinho.length > 0) {

     
        //Items no carrinho
        //Renderizar o carrinho  
         renderizarCarrinho()
        //somar totais dos produtos
        calcularTotal()
}
 else {
    //Mostrar o carrinho vazio
    
carrinhoVazio() 

}

} else {
    //Mostrar o carrinho vazio
    
carrinhoVazio() 

}

function renderizarCarrinho(){
   
    //Esvazia a área do itens 

    $('#listaCarrinho').empty()

    //Percorrer o nosso carrinho e alimentar a área 
    
    {
        $.each(carrinho, function (index, itemCarrinho){
            var itemDiv = `
                 <!--Item do carrinho-->

                    <div class="item-carrinho"  >
                        <div class="area-img" >
                            <img src="${itemCarrinho.item.imagem}" alt="">
                        </div>
                        
                    
                    <div class="area-details">
                        <div class="sup">
                            <span class="name-prod">
                            ${itemCarrinho.item.nome}
                            </span>
                            <a href="#" data-index="${index} "class="delete">
                                <i class="mdi mdi-close"></i>
                            </a>
                        </div>
                        <div class="middle">
                            <span>${itemCarrinho.item.principal_caracteristica}</span>
                        </div>
                        <div class="preco-quantidade">
                            <span>${itemCarrinho.item.preco_promocional.toLocaleString('pt-BR', { style:'currency', currency: 'BRL'})}</span>
                            <div class="count">
                                <a class="minus"  data-index="${index}">-</a>
                                <input readonly class="qtd-item" type="text" value="${itemCarrinho.quantidade}">
                                <a class="plus" data-index="${index}">+</a>
                            </div>
                        </div>
                    </div>
                 </div>
            `
            $("#listaCarrinho").append(itemDiv)
        })
    }
$('.delete').on('click', function(){
    var index = $(this).attr('data-index');
    //CONFIRMA 
    console.log('Indice é:', index)

    app.dialog.confirm('Certeza da remoção?', 'Remover', function() {
      
      
      // var index = $(this).data('index')   
        //REMOVER O ITEM DO CARRINHO
        carrinho.splice(index, 1);
        //ATUALIZAR O CARRINHO COM ITEM REMOVIDO
        localStorage.setItem('Carrinho', JSON.stringify(carrinho))
        //ATUALIZAR A PAGINA
        app.views.main.router.refreshPage()
     

        
    })
})

}


$('.minus').on('click', function(){
    var index = $(this).data('index')
    //CONFIRMA 
    console.log('Indice é:', index)
        // SE TEM MAIS UM ITEM NA  QUANTIDADE
    if(carrinho[index].quantidade > 1) {
        carrinho[index].quantidade--;
        carrinho[index].total_item = carrinho[index].quantidade * carrinho[index].item.preco_promocional
        localStorage.setItem('Carrinho',JSON.stringify(carrinho))
        app.views.main.router.refreshPage()
} else {
    var itemname = carrinho[index].item.nome
    app.dialog.confirm(`Gostaria de remover ${itemname}? `, function() {
         carrinho.splice(index, 1)
         localStorage.setItem('Carrinho',JSON.stringify(carrinho))
         app.views.main.router.refreshPage()
    } )
  
}
   

})

$('.plus').on('click', function(){
    var index = $(this).data('index')
    //CONFIRMA 
    console.log('Indice é:', index)

    carrinho [index].quantidade++
    carrinho[index].total_item = carrinho[index].quantidade * carrinho[index].item.preco_promocional
    localStorage.setItem('Carrinho',JSON.stringify(carrinho))
    app.views.main.router.refreshPage()
})




function   calcularTotal() {
    var totalCarrinho = 0
    $.each(carrinho, function (index, itemCarrinho){
        totalCarrinho += itemCarrinho.total_item
    })
    $("#subtotal").html(totalCarrinho.toLocaleString('pt-BR', { style:'currency', currency: 'BRL'}))
}


function carrinhoVazio() {
    console.log('Carrinho está vazio')
    //Esvaziar lista do carrinho
    $("#listaCarrinho").empty()    

    //SUMIR OS ITENS DE BAIXO BOTAO E TOTAIS 

    $('#toolbarTotais').addClass('display-none')
    $('#toolbarCheckout').addClass('display-none')

    //MOSTRAR SACOLINHA VAZIA 

    $("#listaCarrinho").html(`
        <div class="text-align-center">
        <img width="300" src="img/imagens/empty.gif">
        <br> <span class="color-gray"> Nada por enquanto... </span>
        </div>`)

}

$('#esvaziar').on('click', function(){
    app.dialog.confirm('<h3>Certeza que quer esvaziar?</h3>', '<strong>Esvaziar carrinho</strong>', function(){
        //APAGAR O LOCALSTORAGE 
        localStorage.removeItem('Carrinho')
        app.views.main.router.refreshPage()
        //REMOVER O CARRINHO DA TELA
        
    })
})



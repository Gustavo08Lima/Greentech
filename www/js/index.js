fetch('js/backend.json')
.then(response => response.json())
.then(data=>{
    //Salvar os dados vindos do back-end localmente
    //Vamos utilizar um LOCALSTORAGE
    localStorage.setItem('produtos', JSON.stringify(data))
    console.log("Dados salvos com sucesso no localStorage");
    
   
 // Simulação de carregamento dos dados
   setTimeout(() => {
     //Esvaziar a area de produtos
    $("#produtos").empty();


    data.forEach(produto => {
        var produtoHTML = `
                <!--Card-->
                             <div class="item-card">
                                 <a data-id="${produto.id}"href="/detalhes/" class="item">
                                     <div class="img-container">
                                         <img src="${produto.imagem}" alt="">
                                     </div>
                             
                                     
                                     <div class="nome-rating">
                                         <span class="color-gray">${produto.nome} </span>
                                         <span class="bold margin-right"> <i class="mdi mdi-star"></i>
                                         ${produto.rating}
                                     </div>
                                     <div class="price">${produto.preco_promocional.toLocaleString('pt-BR', { style:'currency', currency: 'BRL'})}</div>
                                     
                             </div>
      `;
        $("#produtos").append(produtoHTML);
     })
   
  $(".item").on('click', function () {
  var id = $(this).attr('data-id')
  localStorage.setItem('detalhe', id)
  app.views.main.router.navigate('/detalhes/')  
  })
  }, 1000)
  })


.catch(error => console.error('Error ao fazer fetch dos dados  ' +error))


//Ver quantos itens tem dentro do Carrinho 

setTimeout(() => {
  var Carrinho = JSON.parse(localStorage.getItem('Carrinho')) || [];

  //Alimentar o contador da sacola 

  $('.btn-cart').attr('data-count', Carrinho.length)
}, 300)
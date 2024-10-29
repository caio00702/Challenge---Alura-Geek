const assert = require('assert');
const { getProdutos, criarProduto, deletarProduto } = require('./api');

test('Teste de exemplo para a API', () => {
  test('Teste de exemplo para a API', async () => {
    // Teste para getProdutos
    const produtos = await getProdutos();
    assert(Array.isArray(produtos), 'getProdutos deve retornar um array');
    
    // Teste para criarProduto
    const novoProduto = { nome: 'Produto Teste', preco: 100 };
    const produtoCriado = await criarProduto(novoProduto);
    assert(produtoCriado && produtoCriado.id, 'criarProduto deve retornar o produto criado com um id');
    
    // Teste para deletarProduto
    if (produtoCriado && produtoCriado.id) {
      await deletarProduto(produtoCriado.id);
      const produtosAposDelecao = await getProdutos();
      const produtoDeletado = produtosAposDelecao.find(prod => prod.id === produtoCriado.id);
      assert(!produtoDeletado, 'deletarProduto deve remover o produto criado');
    }
  });
});
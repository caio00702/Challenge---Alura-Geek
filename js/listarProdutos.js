// js/listarProdutos.js

import {
    getProdutos,
    deletarProduto
} from './api.js';

export async function listarProdutos() {
    const produtosContainer = document.querySelector('[data-produtos-container]');
    const mensagemVazia = document.querySelector('.mensagem-vazia');

    if (!produtosContainer || !mensagemVazia) {
        console.error('Elementos necessários não encontrados no DOM.');
        return;
    }

    const produtos = await getProdutos();

    if (produtos.length === 0) {
        mensagemVazia.style.display = 'block';
    } else {
        mensagemVazia.style.display = 'none';
        produtos.forEach(produto => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.id = produto.id;
            card.innerHTML = `
                <img src="${produto.imagem || '../img/image 1.svg'}" alt="Imagem do produto" />
                <div class="card-container--info">
                    <p>${produto.nome}</p>
                    <div class="card-container--value">
                        <p>Preço: $${produto.preco ? produto.preco.toFixed(2) : 'N/A'}</p>
                        <img src="../img/Vector.svg" alt="Ícone de eliminação" class="delete-icon" />
                    </div>
                </div>
            `;
            produtosContainer.appendChild(card);

            const deleteIcon = card.querySelector('.delete-icon');
            deleteIcon.addEventListener('click', async function () {
                await deletarProduto(produto.id);
                card.remove();
                if (produtosContainer.children.length === 0) {
                    mensagemVazia.style.display = 'block';
                }
            });
        });
    }
}
// js/criarProduto.js

import {
    criarProduto,
    deletarProduto
} from './api.js';

export function configurarFormulario() {
    const formProduto = document.querySelector('[data-form-produto]');
    formProduto.addEventListener('submit', async function (event) {
        event.preventDefault();
        const nome = document.querySelector('[data-nome-produto]').value;
        const preco = document.querySelector('[data-preco-produto]').value;
        const imagem = document.querySelector('[data-imagem-produto]').files[0];

        const reader = new FileReader();
        reader.onloadend = async function () {
            const novoProduto = {
                nome: nome,
                preco: parseFloat(preco),
                imagem: reader.result
            };

            const produtoCriado = await criarProduto(novoProduto);
            if (produtoCriado) {
                const card = document.createElement('div');
                card.className = 'card';
                card.dataset.id = produtoCriado.id;
                card.innerHTML = `
                    <img src="${produtoCriado.imagem}" alt="Imagem do produto">
                    <div class="card-container--info">
                        <p>${produtoCriado.nome}</p>
                        <div class="card-container--value">
                            <p>Preço: $${produtoCriado.preco.toFixed(2)}</p>
                            <img src="../img/Vector.svg" alt="Ícone de eliminação" class="delete-icon">
                        </div>
                    </div>
                `;
                const produtosContainer = document.querySelector('[data-produtos-container]');
                produtosContainer.appendChild(card);
                const mensagemVazia = document.querySelector('.mensagem-vazia');
                mensagemVazia.style.display = 'none';
                formProduto.reset();

                const deleteIcon = card.querySelector('.delete-icon');
                deleteIcon.addEventListener('click', async function () {
                    await deletarProduto(produtoCriado.id);
                    card.remove();
                    if (produtosContainer.children.length === 0) {
                        mensagemVazia.style.display = 'block';
                    }
                });
            }
        };
        reader.readAsDataURL(imagem);
    });
}
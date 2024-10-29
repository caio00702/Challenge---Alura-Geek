// js/criarProduto.js

import { listarProdutos } from './listarProdutos.js';
import { criarProduto } from './api.js';

export function configurarFormulario() {
    const form = document.querySelector('[data-form-produto]');

    form.addEventListener('submit', async event => {
        event.preventDefault();

        const nome = document.querySelector('[data-nome-produto]').value;
        const preco = document.querySelector('[data-preco-produto]').value;
        const imagem = document.querySelector('[data-imagem-produto]').files[0];

        const reader = new FileReader();
        reader.onloadend = async () => {
            const produto = {
                nome,
                preco,
                imagem: reader.result // Supondo que a imagem será convertida para base64
            };

            const novoProduto = await criarProduto(produto);
            if (novoProduto) {
                listarProdutos(); // Atualiza a lista de produtos após adicionar um novo
                form.reset(); // Limpa o formulário
            }
        };

        if (imagem) {
            reader.readAsDataURL(imagem);
        }
    });
}
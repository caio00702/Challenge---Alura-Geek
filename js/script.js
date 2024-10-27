// js/script.js

import { listarProdutos } from './listarProdutos.js';
import { configurarFormulario } from './criarProduto.js';

document.addEventListener('DOMContentLoaded', async function () {
    await listarProdutos();
    configurarFormulario();
});
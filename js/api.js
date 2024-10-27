// js/api.js

export async function getProdutos() {
    try {
        const response = await fetch('http://localhost:3000/produtos');
        if (!response.ok) {
            throw new Error('Erro ao buscar produtos');
        }
        const produtos = await response.json();
        return produtos;
    } catch (error) {
        console.error('Erro ao buscar produtos:', error.message);
        return [];
    }
}

export async function criarProduto(produto) {
    try {
        const response = await fetch('http://localhost:3000/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        });
        if (!response.ok) {
            throw new Error('Erro ao criar produto');
        }
        const novoProduto = await response.json();
        return novoProduto;
    } catch (error) {
        console.error('Erro:', error);
        return null;
    }
}

export async function deletarProduto(id) {
    try {
        const response = await fetch(`http://localhost:3000/produtos/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Erro ao deletar produto');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}
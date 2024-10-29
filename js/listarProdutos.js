// js/listarProdutos.js

export function listarProdutos() {
    fetch('http://localhost:3000/produtos')
        .then(response => response.json())
        .then(data => {
            const produtosContainer = document.querySelector('[data-produtos-container]');
            produtosContainer.innerHTML = ''; // Limpa o container antes de adicionar os produtos

            data.forEach(produto => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');

                const productImage = document.createElement('img');
                productImage.src = produto.imagem; // Supondo que a API retorna a URL da imagem no campo 'imagem'
                productImage.alt = produto.nome;
                productImage.classList.add('image-frame'); // Adiciona a classe 'image-frame' à imagem

                const productName = document.createElement('p');
                productName.textContent = produto.nome;

                const productPrice = document.createElement('p');
                productPrice.textContent = `$${produto.preco}`;

                productCard.appendChild(productImage);
                productCard.appendChild(productName);
                productCard.appendChild(productPrice);

                produtosContainer.appendChild(productCard);
            });
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));
}            });

            productCard.appendChild(productImage);
            productCard.appendChild(productName);
            productCard.appendChild(productPrice);
            productCard.appendChild(deleteButton);

            produtosContainer.appendChild(productCard);
        });
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

async function deletarProduto(id) {
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
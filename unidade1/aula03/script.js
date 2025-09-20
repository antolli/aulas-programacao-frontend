        // Função 1: Mostrar Relações DOM
        function mostrarRelacoes() {
            const filho1 = document.getElementById('filho1');
            const output = document.getElementById('output');
            
            output.innerHTML = `
                <strong>Análise do elemento "Filho 1":</strong><br>
                Parent: ${filho1.parentNode.id}<br>
                Next Sibling: ${filho1.nextElementSibling ? filho1.nextElementSibling.textContent : 'nenhum'}<br>
                Previous Sibling: ${filho1.previousElementSibling ? filho1.previousElementSibling.textContent : 'nenhum'}<br>
                Parent's First Child: ${filho1.parentNode.firstElementChild.textContent}<br>
                Parent's Last Child: ${filho1.parentNode.lastElementChild.textContent}
            `;
        }

        // Função 2: Encontrar Pai
        function encontrarPai() {
            const botao = document.getElementById('meuBotao');
            const pai = botao.parentNode;
            const avo = pai.parentNode;
            
            document.getElementById('output-parent').innerHTML = `
                <strong>Hierarquia do botão:</strong><br>
                Elemento: ${botao.id}<br>
                Pai: ${pai.tagName.toLowerCase()}<br>
                Avô: ${avo.id}
            `;
        }

        // Função 3: Comparar Children vs ChildNodes
        function compararChildrenChildNodes() {
            const lista = document.getElementById('lista-demo');
            const output = document.getElementById('output-children');
            
            output.innerHTML = `
                <strong>Comparação:</strong><br>
                childNodes.length: ${lista.childNodes.length} (inclui ${lista.childNodes.length - lista.children.length} nós de texto)<br>
                children.length: ${lista.children.length} (apenas elementos HTML)<br><br>
                <strong>childNodes contém:</strong><br>
                ${Array.from(lista.childNodes).map((node, i) => 
                    `[${i}] ${node.nodeType === 3 ? 'Texto: "' + node.textContent.replace(/\n/g, '\\n') + '"' : 'Elemento: ' + node.tagName}`
                ).join('<br>')}
            `;
        }

        // Função 4: Navegação Siblings
        function navegarProximo(elementoAtual) {
            const proximo = elementoAtual.nextElementSibling;
            
            if (proximo) {
                elementoAtual.classList.remove('ativo');
                proximo.classList.add('ativo');
            } else {
                elementoAtual.classList.remove('ativo');
                elementoAtual.parentNode.firstElementChild.classList.add('ativo');
            }
        }

        function navegarProximoDemo() {
            const ativo = document.querySelector('#nav-lista .ativo');
            if (ativo) navegarProximo(ativo);
        }

        function navegarAnteriorDemo() {
            const ativo = document.querySelector('#nav-lista .ativo');
            if (ativo) {
                const anterior = ativo.previousElementSibling;
                if (anterior) {
                    ativo.classList.remove('ativo');
                    anterior.classList.add('ativo');
                } else {
                    ativo.classList.remove('ativo');
                    ativo.parentNode.lastElementChild.classList.add('ativo');
                }
            }
        }

        // Função 5: Testes de Performance
        function testeIneficiente() {
            const lista = document.getElementById('lista-performance');
            const stats = document.getElementById('stats');
            const inicio = performance.now();
            
            for(let i = 0; i < 100; i++) {
                lista.innerHTML += '<li>Item ' + i + '</li>';
            }
            
            const fim = performance.now();
            stats.innerHTML = `Tempo ineficiente: ${(fim - inicio).toFixed(2)}ms`;
        }

        function testeOtimizado() {
            const lista = document.getElementById('lista-performance');
            const stats = document.getElementById('stats');
            const inicio = performance.now();
            
            let conteudo = '';
            for(let i = 0; i < 100; i++) {
                conteudo += '<li>Item ' + i + '</li>';
            }
            lista.innerHTML = conteudo;
            
            const fim = performance.now();
            stats.innerHTML = `Tempo otimizado: ${(fim - inicio).toFixed(2)}ms`;
        }

        function limparLista() {
            document.getElementById('lista-performance').innerHTML = '';
            document.getElementById('stats').innerHTML = '';
        }

        // Função 6: DocumentFragment
        function adicionarComFragment() {
            const lista = document.getElementById('lista-fragment');
            const stats = document.getElementById('stats-fragment');
            const inicio = performance.now();
            
            const fragment = document.createDocumentFragment();
            for(let i = 0; i < 500; i++) {
                const li = document.createElement('li');
                li.textContent = 'Item ' + i;
                fragment.appendChild(li);
            }
            lista.appendChild(fragment);
            
            const fim = performance.now();
            stats.innerHTML = `Tempo com Fragment: ${(fim - inicio).toFixed(2)}ms - 500 items adicionados`;
        }

        function limparListaFragment() {
            document.getElementById('lista-fragment').innerHTML = '';
            document.getElementById('stats-fragment').innerHTML = '';
        }

        // Função 7: Criar Cards
        function criarCard() {
            const nome = document.getElementById('nome-produto').value || 'Produto';
            const preco = document.getElementById('preco-produto').value || 'R$ 0,00';
            const container = document.getElementById('cards-container');
            
            const card = document.createElement('div');
            card.className = 'card';
            
            const titulo = document.createElement('h4');
            titulo.textContent = nome;
            
            const precoEl = document.createElement('p');
            precoEl.textContent = preco;
            precoEl.style.fontWeight = 'bold';
            
            const botao = document.createElement('button');
            botao.textContent = 'Remover';
            botao.onclick = () => card.remove();
            
            card.appendChild(titulo);
            card.appendChild(precoEl);
            card.appendChild(botao);
            container.appendChild(card);
            
            // Limpar inputs
            document.getElementById('nome-produto').value = '';
            document.getElementById('preco-produto').value = '';
        }

        // Função 8: Sistema de Comentários
        class SistemaComentarios {
            constructor() {
                this.container = document.getElementById('comentarios');
                this.comentarioId = 0;
            }

            adicionarComentario(texto, autor, comentarioPai = null) {
                const comentario = document.createElement('div');
                comentario.className = 'comentario';
                comentario.id = 'com-' + this.comentarioId++;
                
                const autorEl = document.createElement('div');
                autorEl.className = 'autor';
                autorEl.textContent = autor;
                
                const textoEl = document.createElement('div');
                textoEl.className = 'texto';
                textoEl.textContent = texto;
                
                const acoes = document.createElement('div');
                acoes.className = 'acoes';
                
                const btnResponder = document.createElement('button');
                btnResponder.textContent = 'Responder';
                btnResponder.onclick = () => responderComentario(comentario.id);
                
                const btnRemover = document.createElement('button');
                btnRemover.textContent = 'Remover';
                btnRemover.onclick = () => removerComentario(comentario.id);
                
                acoes.appendChild(btnResponder);
                acoes.appendChild(btnRemover);
                
                comentario.appendChild(autorEl);
                comentario.appendChild(textoEl);
                comentario.appendChild(acoes);
                
                if (comentarioPai) {
                    let respostas = comentarioPai.querySelector('.respostas');
                    if (!respostas) {
                        respostas = document.createElement('div');
                        respostas.className = 'respostas';
                        comentarioPai.appendChild(respostas);
                    }
                    respostas.appendChild(comentario);
                } else {
                    this.container.appendChild(comentario);
                }
                
                return comentario;
            }
        }

        const sistema = new SistemaComentarios();

        function adicionarNovoComentario() {
            const autor = document.getElementById('autor-input').value || 'Anônimo';
            const texto = document.getElementById('comentario-input').value;
            
            if (texto) {
                sistema.adicionarComentario(texto, autor);
                document.getElementById('comentario-input').value = '';
            }
        }

        function responderComentario(id) {
            const comentarioPai = document.getElementById(id);
            const autor = prompt('Seu nome:') || 'Anônimo';
            const texto = prompt('Sua resposta:');
            
            if (texto) {
                sistema.adicionarComentario(texto, autor, comentarioPai);
            }
        }

        function removerComentario(id) {
            const comentario = document.getElementById(id);
            const temRespostas = comentario.querySelector('.respostas')?.children.length > 0;
            
            if (temRespostas) {
                if (confirm('Este comentário tem respostas. Deseja remover tudo?')) {
                    comentario.remove();
                }
            } else {
                comentario.remove();
            }
        }

        // Função 9: Clonar Template
        function clonarTemplate() {
            const template = document.getElementById('template-original');
            const container = document.getElementById('clones-container');
            
            const clone = template.cloneNode(true);
            clone.id = 'clone-' + Date.now();
            clone.querySelector('h4').textContent = 'Clone #' + (container.children.length + 1);
            
            container.appendChild(clone);
        }

        // Adicionar alguns comentários de exemplo ao carregar
        window.addEventListener('DOMContentLoaded', () => {
            const com1 = sistema.adicionarComentario('Este é o primeiro comentário do sistema!', 'João');
            const com2 = sistema.adicionarComentario('Ótima implementação de navegação DOM', 'Maria');
            sistema.adicionarComentario('Concordo! Muito útil para aprender', 'Pedro', com2);
            sistema.adicionarComentario('Os exemplos são bem práticos', 'Ana');
        });

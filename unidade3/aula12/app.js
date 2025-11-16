// Configurações que resolvem o problema
const API_URL = 'https://jsonplaceholder.typicode.com/posts';
let paginaAtual = 1;
const POSTS_POR_PAGINA = 10; // Requisito 1: carregar apenas 10 posts inicialmente
let carregando = false;
let todosPostsCarregados = false;

// Performance tracking
const performanceMetrics = {
  tempoInicial: Date.now(),
  primeiroCarregamento: null
};

// Elementos DOM
const timeline = document.getElementById('timeline');
const loadingIndicator = document.getElementById('loading');

// Função para criar elemento de post
function criarElementoPost(post) {
  const postDiv = document.createElement('article');
  postDiv.className = 'post';
  
  const dataFormatada = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  
  const iniciais = `U${post.userId}`;
  
  postDiv.innerHTML = `
    <div class="post-header">
      <div class="post-avatar">${iniciais}</div>
      <div>
        <div class="post-author">Usuário ${post.userId}</div>
        <div class="post-date">${dataFormatada}</div>
      </div>
    </div>
    <h2 class="post-title">${post.title}</h2>
    <p class="post-content">${post.body}</p>
    <img 
      class="post-image" 
      data-src="https://picsum.photos/600/400?random=${post.id}"
      alt="Imagem do post ${post.id}"
      loading="lazy"
    >
  `;
  
  return postDiv;
}

// Função principal que resolve o problema de performance
async function carregarPosts() {
  // Requisito 4: Interface responsiva - não bloquear se já estiver carregando
  if (carregando || todosPostsCarregados) return;
  
  carregando = true;
  loadingIndicator.style.display = 'block';
  
  try {
    // Requisito 1 e 2: Carregamento parcial com paginação
    const inicio = (paginaAtual - 1) * POSTS_POR_PAGINA;
    
    // Usando Fetch API com async/await para requisições assíncronas
    const response = await fetch(
      `${API_URL}?_start=${inicio}&_limit=${POSTS_POR_PAGINA}`
    );
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    
    const posts = await response.json();
    
    // Verificar se não há mais posts
    if (posts.length === 0) {
      todosPostsCarregados = true;
      loadingIndicator.textContent = 'Você visualizou todos os posts!';
      return;
    }
    
    // Adicionar posts ao DOM
    posts.forEach(post => {
      const postElement = criarElementoPost(post);
      timeline.appendChild(postElement);
    });
    
    // Requisito 3: Aplicar lazy loading para imagens
    aplicarLazyLoading();
    
    // Requisito 5: Medir tempo de carregamento
    if (paginaAtual === 1 && performanceMetrics.primeiroCarregamento === null) {
      performanceMetrics.primeiroCarregamento = Date.now() - performanceMetrics.tempoInicial;
      console.log(`✅ Tempo de carregamento inicial: ${performanceMetrics.primeiroCarregamento}ms`);
      console.log(`✅ Meta atingida: ${performanceMetrics.primeiroCarregamento < 2000 ? 'SIM' : 'NÃO'} (< 2000ms)`);
    }
    
    paginaAtual++;
    
  } catch (erro) {
    console.error('Erro ao carregar posts:', erro);
    loadingIndicator.innerHTML = '❌ Erro ao carregar posts. <button onclick="carregarPosts()">Tentar novamente</button>';
  } finally {
    carregando = false;
    setTimeout(() => {
      if (!todosPostsCarregados) {
        loadingIndicator.style.display = 'none';
      }
    }, 500);
  }
}

// Requisito 3: Implementar lazy loading para economia de dados (80%)
function aplicarLazyLoading() {
  const imagens = document.querySelectorAll('img[data-src]:not(.carregado)');
  
  // Intersection Observer API para lazy loading eficiente
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');
        
        // Carregar imagem apenas quando visível
        img.src = src;
        img.onload = () => {
          img.classList.add('carregado');
          console.log(`🖼️ Imagem carregada: ${src}`);
        };
        
        img.onerror = () => {
          img.style.display = 'none';
          console.log(`❌ Erro ao carregar imagem: ${src}`);
        };
        
        // Parar de observar após carregar
        observer.unobserve(img);
      }
    });
  }, {
    // Carregar imagens 100px antes de entrarem na viewport
    rootMargin: '100px'
  });
  
  imagens.forEach(img => observer.observe(img));
}

// Requisito 2: Detectar scroll e carregar mais posts (infinite scroll)
function verificarScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  
  // Carregar quando estiver a 300px do final
  const proximoDoFim = scrollTop + clientHeight >= scrollHeight - 300;
  
  if (proximoDoFim && !carregando && !todosPostsCarregados) {
    console.log('📜 Usuário chegou ao final, carregando mais posts...');
    carregarPosts();
  }
}

// Event listener com debounce para melhor performance
let scrollTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(verificarScroll, 100);
});

// Iniciar aplicação - Requisito 5: Carregamento rápido
console.log('🚀 Iniciando ConectaSocial otimizada...');
carregarPosts();

// Métricas de economia de dados
window.addEventListener('load', () => {
  console.log('📊 RESULTADOS DA OTIMIZAÇÃO:');
  console.log(`   Carregamento inicial: apenas ${POSTS_POR_PAGINA} posts`);
  console.log(`   Imagens: carregadas sob demanda (lazy loading)`);
  console.log(`   Economia estimada de dados: ~80-90%`);
  console.log(`   Interface: responsiva durante todo o processo`);
});

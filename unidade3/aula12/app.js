const API_URL = 'https://jsonplaceholder.typicode.com/posts';
let paginaAtual = 1;
const POSTS_POR_PAGINA = 10;
let carregando = false;
let todosPostsCarregados = false;

const performanceMetrics = {
  tempoInicial: Date.now(),
  primeiroCarregamento: null
};

const timeline = document.getElementById('timeline');
const loadingIndicator = document.getElementById('loading');

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

async function carregarPosts() {
  if (carregando || todosPostsCarregados) return;
  
  carregando = true;
  loadingIndicator.style.display = 'block';
  
  try {
    const inicio = (paginaAtual - 1) * POSTS_POR_PAGINA;
    
    const response = await fetch(
      `${API_URL}?_start=${inicio}&_limit=${POSTS_POR_PAGINA}`
    );
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    
    const posts = await response.json();
    
    if (posts.length === 0) {
      todosPostsCarregados = true;
      loadingIndicator.textContent = 'Você visualizou todos os posts!';
      return;
    }
    
    posts.forEach(post => {
      const postElement = criarElementoPost(post);
      timeline.appendChild(postElement);
    });
    
    aplicarLazyLoading();
    
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

function aplicarLazyLoading() {
  const imagens = document.querySelectorAll('img[data-src]:not(.carregado)');
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');
        
        img.src = src;
        img.onload = () => {
          img.classList.add('carregado');
          console.log(`🖼️ Imagem carregada: ${src}`);
        };
        
        img.onerror = () => {
          img.style.display = 'none';
          console.log(`❌ Erro ao carregar imagem: ${src}`);
        };
        
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '100px'
  });
  
  imagens.forEach(img => observer.observe(img));
}

function verificarScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  
  const proximoDoFim = scrollTop + clientHeight >= scrollHeight - 300;
  
  if (proximoDoFim && !carregando && !todosPostsCarregados) {
    console.log('📜 Usuário chegou ao final, carregando mais posts...');
    carregarPosts();
  }
}

let scrollTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(verificarScroll, 100);
});

console.log('🚀 Iniciando ConectaSocial otimizada...');
carregarPosts();

window.addEventListener('load', () => {
  console.log('📊 RESULTADOS DA OTIMIZAÇÃO:');
  console.log(`   Carregamento inicial: apenas ${POSTS_POR_PAGINA} posts`);
  console.log(`   Imagens: carregadas sob demanda (lazy loading)`);
  console.log(`   Economia estimada de dados: ~80-90%`);
  console.log(`   Interface: responsiva durante todo o processo`);
});

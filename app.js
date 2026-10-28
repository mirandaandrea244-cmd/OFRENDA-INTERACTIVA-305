// ============ Galería de fotos ============
const fotos = [
    'abu.jpeg', 'tio.jpg', 'hermanita.jpg', 'abuelita.jpg'
];
let indice = 0;

const imagen = document.getElementById('imagenOfrenda');
const btnAnterior = document.getElementById('anterior');
const btnSiguiente = document.getElementById('siguiente');
const contenedorPuntos = document.getElementById('puntos');
const audio = document.getElementById('musica');
const btnMusica = document.getElementById('btnMusica');

function crearPuntos() {
    fotos.forEach((_, i) => {
        const punto = document.createElement('button');
        punto.className = 'punto';
        punto.setAttribute('aria-label', 'Ir a la foto ' + (i + 1));
        punto.addEventListener('click', () => irA(i));
        contenedorPuntos.appendChild(punto);
    });
}

function actualizarPuntos() {
    [...contenedorPuntos.children].forEach((punto, i) => {
        punto.classList.toggle('activo', i === indice);
    });
}

function irA(nuevo) {
    if (nuevo === indice) return;
    indice = nuevo;
    actualizarPuntos();

    // desvanecer, cambiar la foto y volver a mostrar
    imagen.classList.add('cambiando');
    setTimeout(() => {
        if (imagen.getAttribute('src') === fotos[indice]) {
            imagen.classList.remove('cambiando');
        } else {
            imagen.src = fotos[indice];
        }
    }, 300);
}

imagen.addEventListener('load', () => imagen.classList.remove('cambiando'));
imagen.addEventListener('error', () => imagen.classList.remove('cambiando'));

function anterior() { irA((indice - 1 + fotos.length) % fotos.length); }
function siguiente() { irA((indice + 1) % fotos.length); }

btnAnterior.addEventListener('click', anterior);
btnSiguiente.addEventListener('click', siguiente);

// Flechas del teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') anterior();
    if (e.key === 'ArrowRight') siguiente();
});

// Deslizar el dedo en el celular
let inicioX = null;
imagen.addEventListener('touchstart', (e) => { inicioX = e.touches[0].clientX; }, { passive: true });
imagen.addEventListener('touchend', (e) => {
    if (inicioX === null) return;
    const dif = e.changedTouches[0].clientX - inicioX;
    if (Math.abs(dif) > 40) (dif < 0 ? siguiente : anterior)();
    inicioX = null;
});


// ============ Música ============
btnMusica.addEventListener('click', () => {
    if (audio.paused) {
        audio.play().then(() => {
            btnMusica.textContent = '⏸ Pausar música';
            btnMusica.classList.add('sonando');
        }).catch(() => {
            btnMusica.textContent = '⚠️ No se pudo reproducir';
        });
    } else {
        audio.pause();
        btnMusica.textContent = '🎵 Reproducir música';
        btnMusica.classList.remove('sonando');
    }
});


// ============ Papel picado ============
const colores = ['#ff4081', '#ff9800', '#ab47bc', '#26c6da', '#ffeb3b', '#66bb6a', '#ef5350'];
const papelPicado = document.getElementById('papelPicado');

function dibujarPapelPicado() {
    papelPicado.innerHTML = '';
    const cantidad = Math.ceil(window.innerWidth / 78) + 1;
    for (let i = 0; i < cantidad; i++) {
        const banderin = document.createElement('div');
        banderin.className = 'banderin';
        banderin.style.setProperty('--color', colores[i % colores.length]);
        banderin.style.animationDelay = (-Math.random() * 3).toFixed(2) + 's';
        papelPicado.appendChild(banderin);
    }
}


// ============ Pétalos de cempasúchil ============
const contenedorPetalos = document.getElementById('petalos');
const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function lluviaDePetalos(cantidad = 22) {
    for (let i = 0; i < cantidad; i++) {
        const petalo = document.createElement('span');
        petalo.className = 'petalo';
        const tam = 8 + Math.random() * 10;
        petalo.style.width = tam + 'px';
        petalo.style.height = tam * 1.3 + 'px';
        petalo.style.left = Math.random() * 100 + '%';
        petalo.style.animationDuration = 9 + Math.random() * 9 + 's';
        petalo.style.animationDelay = -Math.random() * 15 + 's';
        petalo.style.setProperty('--vaiven', (Math.random() * 120 - 60) + 'px');
        contenedorPetalos.appendChild(petalo);
    }
}



crearPuntos();
actualizarPuntos();
dibujarPapelPicado();
if (!sinMovimiento) lluviaDePetalos();

let temporizador;
window.addEventListener('resize', () => {
    clearTimeout(temporizador);
    temporizador = setTimeout(dibujarPapelPicado, 200);
});
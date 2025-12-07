document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('mainAudio');
    const btnPlay = document.getElementById('btnPlay');
    const btnReset = document.getElementById('btnReset');
    const vizBars = document.querySelectorAll('.viz-bar');
    let vizInterval;
    let isPlaying = false;

    function toggleAudio() {
        if(isPlaying) {
            audio.pause();
            btnPlay.innerHTML = '<i class="fas fa-play"></i>';
            clearInterval(vizInterval);
            vizBars.forEach(b => b.style.height = '5px');
        } else {
            audio.play().catch(e => console.log("Interaction needed"));
            btnPlay.innerHTML = '<i class="fas fa-pause"></i>';
            vizInterval = setInterval(() => {
                vizBars.forEach(b => b.style.height = Math.floor(Math.random() * 20 + 5) + 'px');
            }, 100);
        }
        isPlaying = !isPlaying;
    }

    function resetAudio() { 
        audio.currentTime = 0; 
        if(!isPlaying) toggleAudio(); 
    }

    btnPlay.addEventListener('click', toggleAudio);
    btnReset.addEventListener('click', resetAudio);

    const pdfModal = document.getElementById('pdfModal');
    const btnOpenPdf = document.getElementById('btnOpenPdf');
    const closePdfModal = document.getElementById('closePdfModal');

    function openPdfModal() {
        pdfModal.style.display = 'block';
        if(window.innerWidth < 768) {
            document.querySelector('.pdf-viewer').style.display = 'none';
            document.querySelector('.mobile-fallback').style.display = 'flex';
        }
    }

    btnOpenPdf.addEventListener('click', openPdfModal);
    closePdfModal.addEventListener('click', () => pdfModal.style.display = 'none');

    const infoModal = document.getElementById('infoModal');
    const closeInfoModal = document.getElementById('closeInfoModal');
    const galleryItems = document.querySelectorAll('.gallery-item');

    function openCharacterModal(title, desc, imagesStr, isLightMode) {
        document.getElementById('modalTitle').innerText = title;
        document.getElementById('modalDesc').innerText = desc;
        
        const images = imagesStr.split(',');
        const mainImg = document.getElementById('mainModalImg');
        mainImg.src = images[0];

        const imgCol = document.getElementById('modalImgContainer');
        if(isLightMode === "true") imgCol.classList.add('light-mode');
        else imgCol.classList.remove('light-mode');

        const container = document.getElementById('thumbContainer');
        const strip = document.getElementById('modalThumbnails');
        strip.innerHTML = '';

        if(images.length > 1) {
            container.style.display = 'block';
            images.forEach((imgSrc, index) => {
                const thumb = document.createElement('img');
                thumb.src = imgSrc;
                thumb.className = index === 0 ? 'thumb active' : 'thumb';
                thumb.onclick = function() {
                    mainImg.src = imgSrc;
                    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                };
                strip.appendChild(thumb);
            });
        } else {
            container.style.display = 'none';
        }
        infoModal.style.display = 'block';
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-title');
            const desc = item.getAttribute('data-desc');
            const images = item.getAttribute('data-images');
            const light = item.getAttribute('data-light');
            openCharacterModal(title, desc, images, light);
        });
    });

    closeInfoModal.addEventListener('click', () => infoModal.style.display = 'none');

    document.getElementById('btnScrollCredits').addEventListener('click', () => {
        document.getElementById('credits').scrollIntoView({ behavior: 'smooth' });
    });

    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) event.target.style.display = "none";
    }

    const backToTopBtn = document.getElementById('backToTop');
    window.onscroll = function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    };

    backToTopBtn.onclick = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
});
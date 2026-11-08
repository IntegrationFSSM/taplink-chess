/**
 * Chess Club FSSM - Taplink Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // Update footer year dynamically
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Toast Helper
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // Quick Copy Email
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const email = copyEmailBtn.getAttribute('data-email') || 'chessclubfssm@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        showToast('✓ Email copié : ' + email);
      } catch (err) {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('✓ Email copié : ' + email);
      }
    });
  }

  // Share Page Button
  const shareBtn = document.getElementById('share-profile-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const shareData = {
        title: 'Chess Club FSSM | Liens Officiels',
        text: 'Rejoignez le Chess Club de la Faculté des Sciences Semlalia Marrakech !',
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
        } catch (err) {
          if (err.name !== 'AbortError') {
            copyUrlFallback();
          }
        }
      } else {
        copyUrlFallback();
      }
    });
  }

  function copyUrlFallback() {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl)
      .then(() => showToast('✓ Lien du Taplink copié !'))
      .catch(() => showToast('Lien : ' + currentUrl));
  }

  // QR Code Modal
  const qrModalBtn = document.getElementById('qr-modal-btn');
  const qrModal = document.getElementById('qr-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const qrImage = document.getElementById('qr-image');

  if (qrModalBtn && qrModal) {
    qrModalBtn.addEventListener('click', () => {
      const targetUrl = window.location.href.startsWith('http') 
        ? window.location.href 
        : 'https://integrationfssm.github.io/taplink-chess/';
      
      if (qrImage) {
        qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(targetUrl)}&color=0f172a`;
      }
      qrModal.classList.add('active');
      qrModal.setAttribute('aria-hidden', 'false');
    });

    const closeModal = () => {
      qrModal.classList.remove('active');
      qrModal.setAttribute('aria-hidden', 'true');
    };

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', closeModal);
    }

    qrModal.addEventListener('click', (e) => {
      if (e.target === qrModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && qrModal.classList.contains('active')) {
        closeModal();
      }
    });
  }
});


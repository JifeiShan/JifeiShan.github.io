function ready(fn) {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
  else fn();
}

ready(() => {
  const url = window.location.href.split('#')[0];
  const title = document.title || 'Jifei Shan';
  const shareBox = document.querySelector('[data-share-box]');
  if (!shareBox) return;

  const copyBtn = shareBox.querySelector('[data-copy-link]');
  const nativeBtn = shareBox.querySelector('[data-native-share]');
  const status = shareBox.querySelector('[data-share-status]');
  const qr = shareBox.querySelector('[data-qr]');

  if (qr) {
    qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(url)}`;
    qr.alt = `QR code for ${url}`;
  }

  function setStatus(text) {
    if (!status) return;
    status.textContent = text;
    window.setTimeout(() => { if (status.textContent === text) status.textContent = ''; }, 2200);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(url);
        setStatus('链接已复制');
      } catch (err) {
        window.prompt('复制这个链接：', url);
      }
    });
  }

  if (nativeBtn) {
    if (!navigator.share) nativeBtn.hidden = true;
    nativeBtn.addEventListener('click', async () => {
      try {
        await navigator.share({ title, url });
      } catch (_) {
        // user cancelled or browser refused; no-op
      }
    });
  }
});

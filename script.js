(() => {
  'use strict';
  // Configure com o número real da empresa, incluindo DDD. Deixe vazio durante os testes.
  const SITEFORGE_BRAND = "Studio Beleza e Forma";
  const WHATSAPP_NUMBER = "";
  const nav = document.getElementById('navigation');
  const toggle = document.querySelector('.menu-button');
  toggle?.addEventListener('click', () => {
    const opened = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(opened));
    toggle.setAttribute('aria-label', opened ? 'Fechar menu' : 'Abrir menu');
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  }));
  document.querySelectorAll('.service-book').forEach(button => {
    button.addEventListener('click', () => {
      document.getElementById('bookingService').value = button.dataset.service;
      document.getElementById('agendamento').scrollIntoView({behavior: 'smooth'});
    });
  });
  const form = document.getElementById('bookingForm');
  const status = document.getElementById('bookingStatus');
  const dateInput = form?.elements.namedItem('date');
  if (dateInput) {
    const today = new Date();
    dateInput.min = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
  }
  form?.addEventListener('submit', event => {
    event.preventDefault();
    const phone = WHATSAPP_NUMBER.replace(/\D/g, '');
    if (phone.length < 10 || phone.length > 13) {
      status.textContent = 'Demonstração: o envio será habilitado após a confirmação do WhatsApp comercial.';
      return;
    }
    const data = new FormData(form);
    const message = `Olá! Gostaria de solicitar um horário no ${SITEFORGE_BRAND}.\nNome: ${data.get('name')}\nServiço: ${data.get('service')}\nData: ${data.get('date')}\nHorário: ${data.get('time')}\nObservações: ${data.get('notes') || 'Nenhuma'}`;
    const fullPhone = (phone.length === 10 || phone.length === 11) ? `55${phone}` : phone;
    status.textContent = 'Abrindo o WhatsApp. O agendamento depende da confirmação da equipe.';
    window.open(`https://wa.me/${fullPhone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  });
  document.getElementById('year').textContent = String(new Date().getFullYear());
})();

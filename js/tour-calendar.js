document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('tour-calendar');
  const selectedContactEl = document.getElementById('selected-contact');
  const selectedDateEl = document.getElementById('selected-date');
  const contactLink = document.getElementById('contact-wpp');
  const contactAfter = document.getElementById('contact-after');
  const phone = '5491123456789'; // número del guía

  if (!calendarEl) return;

  // Configuración: cantidad de días a mostrar y reglas de no-disponibilidad
  const DAYS_TO_SHOW = 21; // 3 semanas
  const today = new Date();

  // Ejemplo de fechas bloqueadas adicionales (YYYY-MM-DD). Puedes editar o cargar desde servidor.
  const blockedDates = new Set();
  // Marcar algunos días bloqueados aleatoriamente (para demo)
  const demoBlocked = [3, 7, 12];
  demoBlocked.forEach((offset) => {
    const d = new Date(today);
    d.setDate(today.getDate() + offset);
    blockedDates.add(d.toISOString().slice(0, 10));
  });

  // Renderizar días: deshabilitar fines de semana y los blockedDates
  let selectedButton = null;
  let selectedIso = null;

  // Cargar reservas previas desde localStorage (demo persistence)
  const reservedDates = new Set(JSON.parse(localStorage.getItem('reservedDates') || '[]'));

  function render() {
    calendarEl.innerHTML = '';

    for (let i = 0; i < DAYS_TO_SHOW; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().slice(0, 10);

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'calendar-day btn';
      btn.dataset.date = iso;

      const dayLabel = d.toLocaleDateString(undefined, { weekday: 'short' });
      const dayNum = d.getDate();
      btn.innerHTML = `<div class="small text-muted">${dayLabel}</div><div>${dayNum}</div>`;

      // Deshabilitar si es fin de semana (0 domingo, 6 sábado) o está en blockedDates
      const isWeekend = d.getDay() === 0 || d.getDay() === 6;
      const isBlocked = blockedDates.has(iso);
      const isReserved = reservedDates.has(iso);

      if (isReserved) {
        btn.classList.add('reserved');
        btn.classList.add('disabled');
        btn.setAttribute('aria-disabled', 'true');
        btn.disabled = true;
      } else if (isWeekend || isBlocked) {
        btn.classList.add('disabled');
        btn.setAttribute('aria-disabled', 'true');
        btn.disabled = true;
      } else {
        btn.addEventListener('click', onSelectDay);
      }

      calendarEl.appendChild(btn);
    }
  }

  function onSelectDay(e) {
    const btn = e.currentTarget;
    const date = btn.dataset.date;

    // quitar selección previa
    if (selectedButton) {
      selectedButton.classList.remove('selected');
    }

    // marcar nuevo seleccionado
    btn.classList.add('selected');
    selectedButton = btn;
    selectedIso = date;

    // preparar UI para reservar: mostrar fecha y botón Reservar
    selectedDateEl.textContent = new Date(date).toLocaleDateString();
    contactAfter.style.display = 'none';
    selectedContactEl.style.display = 'block';
    selectedContactEl.scrollIntoView({behavior: 'smooth', block: 'center'});
  }

  // Manejo del formulario de reserva
  const reservationForm = document.getElementById('reservation-form');
  const reservationModalEl = document.getElementById('reservationModal');
  const reservationModal = reservationModalEl ? new bootstrap.Modal(reservationModalEl) : null;

  if (reservationForm) {
    reservationForm.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!selectedIso) return;

      const name = document.getElementById('res-name').value.trim();
      const doc = document.getElementById('res-doc').value.trim();
      const phoneUser = document.getElementById('res-phone').value.trim();

      if (!name || !doc || !phoneUser) {
        alert('Por favor completá todos los campos.');
        return;
      }

      // Guardar reserva (demo): añadir a reservedDates y persistir
      reservedDates.add(selectedIso);
      localStorage.setItem('reservedDates', JSON.stringify(Array.from(reservedDates)));

      // Marcar visualmente el botón seleccionado como reservado
      if (selectedButton) {
        selectedButton.classList.remove('selected');
        selectedButton.classList.add('reserved');
        selectedButton.disabled = true;
        selectedButton.setAttribute('aria-disabled', 'true');
      }

      // Cerrar modal
      if (reservationModal) reservationModal.hide();

      // Mostrar contacto con mensaje predefinido (incluimos nombre del usuario)
      //const message = `Hola Martín,%20soy%20${encodeURIComponent(name)}.%20He%20reservado%20el%20Tour%20Histórico%20de%20La%20Plata%20para%20el%20día%20${selectedIso}.%20¿Podés%20confirmar%20detalles%20y%20resolver%20mis%20dudas?`;
      //contactLink.href = `https://wa.me/${phone}?text=${message}`;
      //contactLink.textContent = `Martín: WhatsApp (${selectedIso})`;
      //contactLink.textContent = "Gracias por reservar"
      contactAfter.style.display = 'block';
      contactAfter.scrollIntoView({behavior: 'smooth', block: 'center'});
    });
  }

  render();
});

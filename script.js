// script.js

// Mostrar u ocultar campos avanzados
function toggleModoSimple() {
  const modo = document.getElementById("modoSimple").checked;
  document.querySelectorAll('.avanzado').forEach(el => {
    el.classList.toggle("oculto", modo);
  });
}

document.getElementById("modoSimple").addEventListener("change", toggleModoSimple);
toggleModoSimple(); // Ejecutar al cargar

// Benchmarks
const benchmarks = {
  "SEO": { ctr: 5.0, conv: 3.0 },
  "SEM (Google Ads Search)": { ctr: 3.5, conv: 5.0 },
  "Meta Ads (Facebook/Instagram)": { ctr: 1.1, conv: 2.5 },
  "TikTok Ads": { ctr: 0.9, conv: 1.8 },
  "LinkedIn Ads": { ctr: 0.6, conv: 4.0 },
  "Email": { ctr: 3.0, conv: 6.0 },
  "WhatsApp/SMS": { ctr: 20.0, conv: 15.0 },
  "Display/Programmatic": { ctr: 0.3, conv: 0.8 },
  "YouTube Ads": { ctr: 0.5, conv: 1.0 },
  "RRSS Orgánicas": { ctr: 3.5, conv: 2.0 },
  "Otro": { ctr: 1.0, conv: 1.0 }
};

const canalSelect = document.getElementById("canal");
const usarBench = document.getElementById("usarBench");
const ctrInput = document.getElementById("ctr");
const convInput = document.getElementById("conv");

Object.keys(benchmarks).forEach(canal => {
  const opt = document.createElement("option");
  opt.value = canal;
  opt.textContent = canal;
  canalSelect.appendChild(opt);
});
canalSelect.value = "SEO";

function aplicarBenchmark() {
  const canal = canalSelect.value;
  if (usarBench.checked && benchmarks[canal]) {
    ctrInput.value = benchmarks[canal].ctr;
    convInput.value = benchmarks[canal].conv;
  }
}

usarBench.addEventListener("change", aplicarBenchmark);
canalSelect.addEventListener("change", aplicarBenchmark);
aplicarBenchmark();

// Cálculo principal (simplificado)
document.getElementById("btnCalcular").addEventListener("click", () => {
  const objetivo = document.getElementById("objetivo").value;
  const ctr = parseFloat(document.getElementById("ctr").value) / 100;
  const conv = parseFloat(document.getElementById("conv").value) / 100;
  const semanas = parseInt(document.getElementById("semanas").value);
  const registros = parseInt(document.getElementById("regsMeta").value);
  const resultadoDiv = document.getElementById("resultados");
  resultadoDiv.innerHTML = "";

  if (ctr <= 0 || conv <= 0 || semanas <= 0 || registros <= 0) {
    resultadoDiv.innerHTML = `<p class="error">⚠️ Verifica que los valores ingresados sean mayores que cero.</p>`;
    return;
  }

  // Funnel inverso
  const alcance = registros / (ctr * conv);
  const visitas = alcance * ctr;

  // Distribución semanal simple
  const base = Math.floor(registros / semanas);
  const resto = registros % semanas;
  const dist = Array.from({ length: semanas }, (_, i) => base + (i < resto ? 1 : 0));

  let html = `<h2>📈 Resultados estimados</h2>`;
  html += `<p><strong>Alcance necesario:</strong> ${Math.round(alcance).toLocaleString()}</p>`;
  html += `<p><strong>Visitas estimadas:</strong> ${Math.round(visitas).toLocaleString()}</p>`;
  html += `<p><strong>Registros esperados:</strong> ${registros.toLocaleString()}</p>`;
  html += `<h3>Distribución semanal:</h3><ul>`;
  dist.forEach((val, i) => {
    html += `<li><strong>Semana ${i + 1}:</strong> ${val} registros</li>`;
  });
  html += `</ul>`;

  resultadoDiv.innerHTML = html;
});



/*
 * 운영 이슈 월간 리포트 — 공통 월 선택 내비게이션
 * 새 리포트 추가 시 아래 MONTHLY_REPORTS 배열에 한 줄만 추가하면
 * index.html과 모든 report 페이지의 월 선택 메뉴에 자동으로 반영된다.
 */
(function () {
  const MONTHLY_REPORTS = [
    { label: '2026년 7월', file: 'july-2026.html' },
    { label: '2026년 8월', file: 'august-2026.html' },
    { label: '2026년 9월', file: 'september-2026.html' },
    { label: '2026년 10월', file: 'october-2026.html' },
  ];

  function currentFile() {
    const last = location.pathname.split('/').filter(Boolean).pop();
    return last && last.endsWith('.html') ? last : 'index.html';
  }

  // report 페이지 우상단의 컴팩트 드롭다운 (.month-nav#mnDrop)
  function initReportNav() {
    const root = document.getElementById('mnDrop');
    if (!root) return;

    const trigger = root.querySelector('.mn-trigger');
    const valueEl = root.querySelector('.mn-value');
    const menu = root.querySelector('.mn-menu');
    const cur = currentFile();

    menu.innerHTML = '';
    MONTHLY_REPORTS.forEach((m) => {
      const opt = document.createElement('div');
      opt.className = 'mn-option' + (m.file === cur ? ' selected' : '');
      opt.textContent = m.label;
      opt.addEventListener('click', () => { location.href = m.file; });
      menu.appendChild(opt);
    });

    const active = MONTHLY_REPORTS.find((m) => m.file === cur);
    if (active && valueEl) valueEl.textContent = active.label;

    trigger.addEventListener('click', () => root.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!root.contains(e.target)) root.classList.remove('open');
    });
  }

  // index.html의 월 선택 셀렉터 + 열기 버튼 (.cs-wrap#mainDrop)
  function initIndexNav() {
    const wrap = document.getElementById('mainDrop');
    if (!wrap) return;

    const trigger = wrap.querySelector('.cs-trigger');
    const valueEl = document.getElementById('mainDropValue');
    const menu = wrap.querySelector('.cs-menu');
    const goBtn = document.getElementById('goBtn');
    const latest = MONTHLY_REPORTS[MONTHLY_REPORTS.length - 1];
    let selectedUrl = latest.file;

    menu.innerHTML = '';
    MONTHLY_REPORTS.forEach((m) => {
      const opt = document.createElement('div');
      opt.className = 'cs-option' + (m.file === latest.file ? ' selected' : '');
      opt.textContent = m.label;
      opt.dataset.url = m.file;
      opt.addEventListener('click', () => {
        menu.querySelectorAll('.cs-option').forEach((o) => o.classList.remove('selected'));
        opt.classList.add('selected');
        if (valueEl) valueEl.textContent = m.label;
        selectedUrl = opt.dataset.url;
        wrap.classList.remove('open');
      });
      menu.appendChild(opt);
    });

    if (valueEl) valueEl.textContent = latest.label;

    trigger.addEventListener('click', () => wrap.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!wrap.contains(e.target)) wrap.classList.remove('open');
    });
    if (goBtn) goBtn.addEventListener('click', () => { location.href = selectedUrl; });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initReportNav();
    initIndexNav();
  });
})();

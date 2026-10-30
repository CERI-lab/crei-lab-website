// WAI-ARIA tabs shared by Home highlights and Publications. Roots may nest, so each root
// only controls the tabs in its own direct tab list.
// The indicator is a fixed 1px x 2px bar (tabs.css). It is positioned under the active tab
// with translate() and stretched to the tab's width with scaleX(), so only transform animates.
function initTabs() {
  document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((root) => {
    if (root.dataset.tabsReady) return;
    root.dataset.tabsReady = 'true';
    const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>(':scope > .tab-list > [role="tab"]'));
    const indicator = root.querySelector<HTMLElement>(':scope > .tab-list > .tab-indicator');

    const moveIndicator = (tab: HTMLButtonElement) => {
      if (!indicator) return;
      // A hidden tab list (inside a hidden panel) measures zero; wait for the ResizeObserver.
      if (tab.offsetWidth === 0) return;
      // Sit on the strip's bottom hairline: one pixel past the tab's bottom edge.
      const y = tab.offsetTop + tab.offsetHeight - 1;
      // The first placement jumps into position instead of sliding in from the corner.
      const first = !indicator.classList.contains('is-placed');
      if (first) indicator.style.setProperty('transition', 'none');
      indicator.style.transform = `translate(${tab.offsetLeft}px, ${y}px) scaleX(${tab.offsetWidth})`;
      indicator.classList.add('is-placed');
      if (first) requestAnimationFrame(() => indicator.style.removeProperty('transition'));
    };

    const select = (tab: HTMLButtonElement, focus = false) => {
      tabs.forEach((t) => {
        const active = t === tab;
        t.setAttribute('aria-selected', String(active));
        t.tabIndex = active ? 0 : -1;
        const panel = document.getElementById(t.getAttribute('aria-controls') ?? '');
        if (panel) panel.hidden = !active;
      });
      moveIndicator(tab);
      if (focus) tab.focus();
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', (event) => {
        const keys: Record<string, number> = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 };
        if (!(event.key in keys)) return;
        event.preventDefault();
        select(tabs[(keys[event.key] + tabs.length) % tabs.length], true);
      });
    });

    const current = tabs.find((t) => t.getAttribute('aria-selected') === 'true') ?? tabs[0];
    if (!current) return;
    moveIndicator(current);
    // Re-measure when a hidden tab list becomes visible or the layout changes.
    new ResizeObserver(() => {
      const active = tabs.find((t) => t.getAttribute('aria-selected') === 'true');
      if (active) moveIndicator(active);
    }).observe(root);
  });
}

document.addEventListener('astro:page-load', initTabs);

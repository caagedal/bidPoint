export function renderPagination(container, currentPage, totalPages, onPageChange) {
    container.innerHTML = "";
  
    const nav = document.createElement("nav");
    nav.classList.add("flex", "justify-center", "items-center", "gap-2", "flex-wrap", "mt-6");
  
    function createPageButton(label, page, isActive = false, disabled = false) {
      const btn = document.createElement("button");
      btn.textContent = label;
      btn.classList.add(
        "px-4", "py-2", "rounded", "text-sm", "transition", "duration-200",
        isActive ? "bg-violet-700" : "bg-gray-200",
        isActive ? "text-white" : "text-gray-800",
        "hover:bg-violet-600", "hover:text-white"
      );
      if (disabled) btn.disabled = true;
  
      btn.addEventListener("click", () => {
        if (!disabled) onPageChange(page);
      });
  
      return btn;
    }
  
    const maxVisible = 5;
    const start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);
  
    // ‹ prev
    nav.appendChild(createPageButton("‹", currentPage - 1, false, currentPage === 1));
  
    // ... before
    if (start > 1) {
      nav.appendChild(createPageButton("1", 1));
      if (start > 2) {
        const dots = document.createElement("span");
        dots.textContent = "...";
        dots.classList.add("text-gray-400", "px-2");
        nav.appendChild(dots);
      }
    }
  
    // Page buttons
    for (let i = start; i <= end; i++) {
      nav.appendChild(createPageButton(i, i, i === currentPage));
    }
  
    // ... after
    if (end < totalPages) {
      if (end < totalPages - 1) {
        const dots = document.createElement("span");
        dots.textContent = "...";
        dots.classList.add("text-gray-400", "px-2");
        nav.appendChild(dots);
      }
      nav.appendChild(createPageButton(totalPages, totalPages));
    }
  
    // › next
    nav.appendChild(createPageButton("›", currentPage + 1, false, currentPage === totalPages));
  
    container.appendChild(nav);
  }
  
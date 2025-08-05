// expand - collapsed toggle #sidebar--left

const leftSidebar   = document.getElementById('sidebar--left');
const toggleBtn     = document.getElementById('sideBarToggleBtn');
const layoutMain    = document.getElementById('layout-main');
const hamburgerLeft = document.getElementById('hamburger--left');

let isCollapsed = false ;


// media type check
toggleBtn.addEventListener('click', () => {

    if (window.innerWidth >= 992 ) {
        isCollapsed = !isCollapsed ;    // switch reversed
        leftSidebar.classList.toggle('collapsed',     isCollapsed);
        layoutMain.classList.toggle('menu-collapsed', isCollapsed);
    } else if (window.innerWidth < 992 && window.innerWidth >= 768) {
        // 768 =< viewport < 992 : 48px std.
        if (leftSidebar.classList.contains('overlay')) {
            leftSidebar.classList.remove('overlay');
        } else {
            leftSidebar.classList.add('overlay');
        }
    } else if (window.innerWidth < 768) {
        // viewport < 768 : toggle left sidebar
        if (leftSidebar.classList.contains('collapsed')) {
            leftSidebar.classList.remove('collapsed');
            hamburgerLeft.classList.add('hidden');
        } else {
            leftSidebar.classList.add('collapsed');
            hamburgerLeft.classList.remove('hidden');
        }
    }
});

// reset resizing
window.addEventListener('resize', () =>{
    // rewrite width
    const vpw = window.innerWidth;
    document.getElementById('viewport-width').textContent = vpw;

    // タブレット⇒
});
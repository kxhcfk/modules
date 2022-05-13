const modals = (modalButtonSelector, modalSelector, modalClassActive, modalCloseButtonSelector, popupWindowSelector) => {
    const modalButtons = document.querySelectorAll(modalButtonSelector),
        modals = Array.from(document.querySelectorAll(modalSelector));

    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            initModal(button.dataset.modal);
        });
    })

    function initModal(modalName) {
        const scrollbarWidth = (window.innerWidth - document.body.clientWidth) + 'px',
            modal = modals.find(modal => modal.dataset.modal == modalName);

        function openModal(modal) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = scrollbarWidth;
            modal.classList.add(modalClassActive.replace(/\./g, ''));
            modal.addEventListener('click', handlersModal);
        }

        openModal(modal);

        function closeModal() {
            if (document.body.clientHeight < document.body.scrollHeight) {
                setTimeout(() => {
                    document.body.style.overflow = null;
                    document.body.style.paddingRight = null;
                }, 500); // animation time
            } else {
                document.body.style.overflow = null;
                document.body.style.paddingRight = null;
            }
            modal.classList.remove(modalClassActive.replace(/\./g, ''));
            modal.removeEventListener('click', handlersModal);
        }

        function handlersModal(e) {
            const target = e.target;

            if (!target.closest(popupWindowSelector) ||
                target.classList.contains(modalCloseButtonSelector.replace(/\./, ''))) {
                closeModal();
            }
        }
    }
};

// modals('.js-popup-btn', '.js-popup', 'popup--active', '.js-popup-close', '.popup__content');
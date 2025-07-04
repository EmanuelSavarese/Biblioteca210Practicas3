/**
 * Modal Informe de Baja - JavaScript
 * Funciones para mostrar y ocultar el modal
 */

// Variables globales
let modalOverlay;
let closeBtn;
let showBtn;

// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    initModal();
});

/**
 * Inicializa el modal y sus event listeners
 */
function initModal() {
    // Obtener elementos del DOM
    modalOverlay = document.getElementById('modal-overlay');
    closeBtn = document.getElementById('close-modal');
    showBtn = document.getElementById('show-modal-btn');
    
    // Verificar que los elementos existen
    if (!modalOverlay) {
        console.error('No se encontró el elemento modal-overlay');
        return;
    }
    
    // Event listeners
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (showBtn) {
        showBtn.addEventListener('click', showModal);
    }
    
    // Cerrar modal al hacer click en el overlay (fuera del modal)
    modalOverlay.addEventListener('click', function(event) {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modalOverlay.classList.contains('show')) {
            closeModal();
        }
    });
}

/**
 * Muestra el modal
 */
function showModal() {
    if (modalOverlay) {
        modalOverlay.classList.add('show');
        // Prevenir scroll del body cuando el modal está abierto
        document.body.style.overflow = 'hidden';
        
        // Focus en el botón de cerrar para accesibilidad
        if (closeBtn) {
            setTimeout(() => {
                closeBtn.focus();
            }, 100);
        }
    }
}

/**
 * Cierra el modal
 */
function closeModal() {
    if (modalOverlay) {
        modalOverlay.classList.remove('show');
        // Restaurar scroll del body
        document.body.style.overflow = '';
    }
}

/**
 * Actualiza el contenido del modal
 * @param {Object} data - Objeto con los datos del modal
 * @param {string} data.materialCode - Código del material
 * @param {string} data.motivo - Motivo de la baja
 * @param {string} data.localizacion - Localización del material
 */
function updateModalContent(data) {
    // Actualizar código del material
    if (data.materialCode) {
        const materialCodeElement = document.querySelector('.material-code');
        if (materialCodeElement) {
            materialCodeElement.textContent = data.materialCode;
        }
    }
    
    // Actualizar motivo de baja
    if (data.motivo) {
        const motivoElement = document.getElementById('motivo-baja');
        if (motivoElement) {
            motivoElement.value = data.motivo;
        }
    }
    
    // Actualizar localización
    if (data.localizacion) {
        const localizacionElement = document.getElementById('localizacion');
        if (localizacionElement) {
            localizacionElement.value = data.localizacion;
        }
    }
}

/**
 * Obtiene los datos actuales del modal
 * @returns {Object} Objeto con los datos del modal
 */
function getModalData() {
    const materialCodeElement = document.querySelector('.material-code');
    const motivoElement = document.getElementById('motivo-baja');
    const localizacionElement = document.getElementById('localizacion');
    
    return {
        materialCode: materialCodeElement ? materialCodeElement.textContent : '',
        motivo: motivoElement ? motivoElement.value : '',
        localizacion: localizacionElement ? localizacionElement.value : ''
    };
}

/**
 * Habilita o deshabilita la edición de los campos
 * @param {boolean} editable - true para habilitar edición, false para deshabilitar
 */
function setEditable(editable) {
    const motivoElement = document.getElementById('motivo-baja');
    const localizacionElement = document.getElementById('localizacion');
    
    if (motivoElement) {
        motivoElement.readOnly = !editable;
    }
    
    if (localizacionElement) {
        localizacionElement.readOnly = !editable;
    }
}

// Exportar funciones para uso externo
window.ModalInformeBaja = {
    show: showModal,
    close: closeModal,
    updateContent: updateModalContent,
    getData: getModalData,
    setEditable: setEditable
};
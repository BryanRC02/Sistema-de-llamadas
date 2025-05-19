/**
 * Formatea una fecha en formato legible en español
 * @param {string} dateString - Fecha en formato ISO
 * @returns {string} Fecha formateada
 */
export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return 'Fecha inválida';
    }
    
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  
  /**
   * Calcula la diferencia de tiempo entre dos fechas en formato legible
   * @param {string} startDate - Fecha de inicio
   * @param {string} endDate - Fecha de fin
   * @returns {string} Tiempo transcurrido
   */
  export const getTimeElapsed = (startDate, endDate) => {
    if (!startDate || !endDate) return 'N/A';
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return 'Fechas inválidas';
    }
    
    // Diferencia en milisegundos
    const diff = end - start;
    
    // Convertir a segundos
    const seconds = Math.floor(diff / 1000);
    
    if (seconds < 60) {
      return `${seconds} segundos`;
    }
    
    // Convertir a minutos y segundos
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes < 60) {
      return `${minutes} minutos y ${remainingSeconds} segundos`;
    }
    
    // Convertir a horas, minutos y segundos
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    return `${hours} horas, ${remainingMinutes} minutos y ${remainingSeconds} segundos`;
  };
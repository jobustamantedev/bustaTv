const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('https://tvtvhd.com/', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    
    // Estrategia diferente: obtener el HTML completo y parsear
    const channels = await page.evaluate(() => {
      const results = [];
      const channelSets = new Set();
      
      // Buscar todos los enlaces que contengan "stream="
      const allLinks = document.querySelectorAll('a[href*="stream="], button[onclick*="stream="]');
      
      allLinks.forEach(link => {
        let url = link.href || link.getAttribute('onclick') || '';
        
        // Extraer el parámetro stream= de la URL
        const match = url.match(/stream=([^&"')]+)/);
        if (match) {
          const streamParam = match[1];
          
          // Obtener el nombre del canal (texto más cercano)
          let name = '';
          let current = link;
          while (current && !name) {
            // Buscar en el elemento mismo
            const text = current.innerText || current.textContent;
            if (text && text.trim().length > 0 && text.trim().length < 100) {
              name = text.trim();
            }
            // Si no encontramos, subir al padre
            current = current.parentElement;
            if (current && current.tagName === 'BODY') break;
          }
          
          if (name && !name.includes('Activo') && !name.includes('Inactivo') && streamParam) {
            const fullUrl = `https://tvtvhd.com/vivo/canales.php?stream=${streamParam}`;
            const key = `${name}|${fullUrl}`;
            
            if (!channelSets.has(key)) {
              channelSets.add(key);
              results.push({ name, url: fullUrl });
            }
          }
        }
      });
      
      return results;
    });
    
    // Filtrar y limpiar
    const cleanChannels = channels
      .map(ch => ({
        name: ch.name.split('\n')[0].trim(),
        url: ch.url
      }))
      .filter((ch, idx, arr) => {
        // Eliminar líneas muy cortas o que sean etiquetas
        if (ch.name.length < 3) return false;
        if (ch.name.match(/^(Activo|Inactivo)/)) return false;
        // Eliminar duplicados por nombre (quedarse con el primero)
        return arr.findIndex(c => c.name === ch.name) === idx;
      });
    
    console.log(`✅ Canales encontrados: ${cleanChannels.length}\n`);
    
    // Mostrar en formato tabla
    console.log('CANAL | URL STREAM');
    console.log('-'.repeat(80));
    cleanChannels.forEach(ch => {
      const streamParam = ch.url.split('stream=')[1];
      console.log(`${ch.name.padEnd(30)} | ${streamParam}`);
    });
    
    // Guardar como JSON
    fs.writeFileSync('/Users/jobustamantedev/Projects/bustaTv/all_channels.json', 
                     JSON.stringify(cleanChannels, null, 2));
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();

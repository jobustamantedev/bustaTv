const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('📍 Navegando a https://tvtvhd.com/...');
    await page.goto('https://tvtvhd.com/', { waitUntil: 'networkidle', timeout: 30000 });
    
    await page.waitForTimeout(3000);
    
    // Extraer información de canales de forma más precisa
    const channels = await page.evaluate(() => {
      const results = [];
      const seen = new Set();
      
      // Buscar todos los elementos con clase que parezca ser un canal
      const items = document.querySelectorAll('[class*="item"], [class*="card"], [class*="channel"]');
      
      items.forEach((item) => {
        // Obtener nombre
        const nameEl = item.querySelector('h3, .name, [class*="title"]');
        if (!nameEl) return;
        
        const name = nameEl.textContent.trim();
        if (!name || name.length < 2 || seen.has(name)) return;
        
        // Obtener URL de link
        let url = '';
        const links = item.querySelectorAll('a, button');
        links.forEach(link => {
          const href = link.href || link.getAttribute('onclick') || link.getAttribute('data-url') || '';
          if (href.includes('stream=')) {
            url = href;
          }
        });
        
        if (url && !url.includes('undefined')) {
          seen.add(name);
          results.push({ name, url });
        }
      });
      
      return results;
    });
    
    // Limpiar y formatear
    const cleanChannels = channels
      .filter(ch => ch.url && ch.url.includes('stream='))
      .map(ch => ({
        name: ch.name.replace(/\s+/g, ' ').trim(),
        url: ch.url
      }))
      .filter((ch, idx, arr) => arr.findIndex(c => c.url === ch.url) === idx); // Eliminar duplicados por URL
    
    console.log(`\n✅ Canales limpios: ${cleanChannels.length}\n`);
    
    // Mostrar en formato SQL UPDATE
    console.log('-- SQL para actualizar canales:');
    cleanChannels.forEach((ch, idx) => {
      console.log(`\n-- ${idx + 1}. ${ch.name}`);
      console.log(`-- UPDATE channels SET stream_url = '${ch.url}' WHERE name = '${ch.name}';`);
    });
    
    // Guardar JSON
    fs.writeFileSync('/Users/jobustamantedev/Projects/bustaTv/channels_correct_urls.json', 
                     JSON.stringify(cleanChannels, null, 2));
    console.log('\n\n✅ Archivo guardado: channels_correct_urls.json');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();

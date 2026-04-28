const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('📍 Navegando a https://tvtvhd.com/...');
    await page.goto('https://tvtvhd.com/', { waitUntil: 'networkidle', timeout: 30000 });
    
    console.log('⏳ Esperando a que carguen los canales...');
    await page.waitForTimeout(3000);
    
    // Extraer información de canales
    const channels = await page.evaluate(() => {
      const results = [];
      
      // Obtener todos los elementos visibles que parecen ser canales
      const pageText = document.body.innerText;
      
      // Buscar elementos que contengan nombres de canales conocidos
      const items = document.querySelectorAll('*');
      const channelMap = new Map();
      
      items.forEach((item) => {
        const text = item.textContent || '';
        const html = item.innerHTML || '';
        
        // Buscar "Link" o URLs en los atributos
        if (text.includes('Link') || html.includes('stream=')) {
          const parent = item.closest('[class*="item"], [class*="card"], [class*="channel"], .container > div');
          if (parent) {
            const parentText = parent.textContent;
            const match = parentText.match(/^([^L]*)/);
            const name = match ? match[1].trim() : '';
            
            // Buscar URL en onclick, href, o data attributes
            let url = '';
            const linkEl = parent.querySelector('a[href*="stream"], button[onclick*="stream"], [data-url*="stream"]');
            if (linkEl) {
              url = linkEl.href || linkEl.getAttribute('onclick') || linkEl.getAttribute('data-url');
            }
            
            if (name && name.length > 2) {
              channelMap.set(name, url);
            }
          }
        }
      });
      
      // Convertir map a array
      channelMap.forEach((url, name) => {
        results.push({ name, url });
      });
      
      return results;
    });
    
    console.log(`\n📺 Canales encontrados: ${channels.length}`);
    if (channels.length === 0) {
      console.log('⚠️  No se encontraron canales. Intenta hacer clic manualmente o inspecciona el HTML.');
      
      // Extraer info bruta
      const rawInfo = await page.evaluate(() => {
        return {
          title: document.title,
          bodyText: document.body.innerText.substring(0, 500),
        };
      });
      console.log('\nInfo de página:', rawInfo);
    } else {
      channels.slice(0, 30).forEach(ch => {
        console.log(`\n  📌 ${ch.name}`);
        console.log(`     URL: ${ch.url || 'sin URL detectada'}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
})();

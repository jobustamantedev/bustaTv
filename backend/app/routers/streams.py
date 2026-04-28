import re
import httpx
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/api/streams", tags=["streams"])

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Referer": "https://tvtvhd.com/",
}

async def get_stream_url(channel_slug: str) -> str:
    """Extrae la URL real del stream desde tvtvhd.com"""
    tvtvhd_url = f"https://tvtvhd.com/vivo/canales.php?stream={channel_slug}"

    try:
        async with httpx.AsyncClient(timeout=10, headers=HEADERS, follow_redirects=True) as client:
            response = await client.get(tvtvhd_url)
            html_content = response.text

        # Buscar playbackURL en el HTML - patrón más preciso
        match = re.search(r'playbackURL\s*[=:]\s*["\']?([^"\'<>]+\.m3u8[^"\'<>]*)["\']?', html_content)
        if match:
            url = match.group(1)
            if url.startswith('http'):
                return url

        # Buscar en etiqueta source
        match = re.search(r'<source[^>]+src=["\']([^"\']+\.m3u8[^"\']*)["\']', html_content)
        if match:
            return match.group(1)

        # Buscar en data-src o atributos similares
        match = re.search(r'data-src=["\']?([https://][^"\'<>]+\.m3u8[^"\'<>]*)["\']?', html_content)
        if match:
            return match.group(1)

        # Último intento: buscar cualquier URL que contenga m3u8
        match = re.search(r'(https?://[^"\'<>\s]+\.m3u8[^"\'<>\s]*)', html_content)
        if match:
            return match.group(1)

        raise ValueError("No se encontró la URL del stream")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error extrayendo stream: {str(e)}")

@router.get("/{channel_slug}")
async def get_stream(channel_slug: str):
    """Obtiene la URL del stream para un canal específico"""
    try:
        stream_url = await get_stream_url(channel_slug)

        # Retornar URL con headers necesarios para reproducción
        return {
            "url": stream_url,
            "channel": channel_slug,
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "Referer": "https://tvtvhd.com/"
            }
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

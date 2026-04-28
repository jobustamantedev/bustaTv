-- Script para actualizar las URLs de los canales en la base de datos
-- Copia y pega estos comandos en tu cliente SQL o úsalos en un script

-- Ejemplo: Actualizar Win Sports plus (2) que estaba mal
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=winsports2' WHERE name = 'Win Sports plus (2)';

-- Actualizar todos los canales ESPN con URLs correctas
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=espnmx' WHERE name = 'ESPN';
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=espn2mx' WHERE name = 'ESPN 2';
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=espn3mx' WHERE name = 'ESPN 3';
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=espn4mx' WHERE name = 'ESPN 4';
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=espn5' WHERE name = 'ESPN 5';
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=espn6' WHERE name = 'ESPN 6';
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=espn7' WHERE name = 'ESPN 7';

-- DSports
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=dsports' WHERE name = 'DSports';
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=dsports2' WHERE name = 'DSports 2';
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=dsportsplus' WHERE name = 'DSports Plus';

-- Fox Sports
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=foxsports' WHERE name = 'Fox Sports';
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=foxsportsmx' WHERE name = 'Fox Sports 2';
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=foxsports3mx' WHERE name = 'Fox Sports 3';

-- TNT Sports
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=tntsports' WHERE name = 'TNT Sports';

-- TyC Sports
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=tycsports' WHERE name = 'TyC Sports';
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=tycinternacional' WHERE name = 'TyC Sports Internacional (USA)';

-- Argentina
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=telefe' WHERE name = 'Telefe';
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=tvpublica' WHERE name = 'TV Pública';

-- Perú
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=golperu' WHERE name = 'GO';
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=liga1max' WHERE name = 'Liga 1 MAX';
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=movistar' WHERE name = 'Movistar Deportes';
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=winsportsplus' WHERE name = 'Win Sports Plus';

-- México
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=azteca7' WHERE name = 'Azteca 7';
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=aztecadeportes' WHERE name = 'Azteca Deportes';

-- BeIN Sports
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=beinsports_spanish' WHERE name = 'BeIN Sports Español';
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=beinsports_xtra_spanish' WHERE name = 'BeIN Sports Xtra Español';

-- CBS Sports Network
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=cbssports' WHERE name = 'CBS Sports Network';

-- DAZN
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=dazn1' WHERE name = 'DAZN 1';
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=dazn1de' WHERE name = 'DAZN 1 DE';
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=dazn2' WHERE name = 'DAZN 2';
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=dazn2de' WHERE name = 'DAZN 2 DE';
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=dazn3' WHERE name = 'DAZN 3';
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=dazn4' WHERE name = 'DAZN 4';
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=dazn_laliga' WHERE name = 'DAZN LaLiga';
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=dazn_eleven1' WHERE name = 'Dazn Eleven 1';
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=dazn_eleven2' WHERE name = 'Dazn Eleven 2';
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=dazn_eleven3' WHERE name = 'Dazn Eleven 3';
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=dazn_eleven4' WHERE name = 'Dazn Eleven 4';
UPDATE channels SET stream_url = 'https://tvtvhd.com/vivo/canales.php?stream=dazn_eleven5' WHERE name = 'Dazn Eleven 5';

-- Ver los cambios realizados
SELECT name, stream_url FROM channels ORDER BY name;

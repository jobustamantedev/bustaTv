export default function LoadingSpinner() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>
        Cargando...
      </div>
    </div>
  );
}

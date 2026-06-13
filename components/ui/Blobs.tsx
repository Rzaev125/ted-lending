/**
 * Five drifting radial-gradient blobs that anchor the cosmic background of the
 * landing. Pure presentational — no props, no interactivity. Pinned with
 * ``position: fixed`` so the blobs float over the long scroll.
 */
export function Blobs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute rounded-full opacity-55 blur-[80px]"
        style={{
          width: 560,
          height: 560,
          top: -120,
          left: -100,
          background: 'radial-gradient(circle, #9D8BFF 0%, transparent 65%)',
          animation: 'drift 22s ease-in-out infinite 0s',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute rounded-full opacity-55 blur-[80px]"
        style={{
          width: 480,
          height: 480,
          top: '30%',
          right: -120,
          background: 'radial-gradient(circle, #E59BE8 0%, transparent 65%)',
          animation: 'drift 28s ease-in-out infinite -7s',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute rounded-full opacity-55 blur-[80px]"
        style={{
          width: 420,
          height: 420,
          top: '70%',
          left: '10%',
          background: 'radial-gradient(circle, #BBA3F2 0%, transparent 65%)',
          animation: 'drift 25s ease-in-out infinite -14s',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute rounded-full opacity-55 blur-[80px]"
        style={{
          width: 520,
          height: 520,
          top: '46%',
          right: '12%',
          background: 'radial-gradient(circle, #C7B5FF 0%, transparent 65%)',
          animation: 'drift 30s ease-in-out infinite -3s',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute rounded-full opacity-55 blur-[80px]"
        style={{
          width: 380,
          height: 380,
          top: '82%',
          left: -60,
          background: 'radial-gradient(circle, #DCA9EC 0%, transparent 65%)',
          animation: 'drift 26s ease-in-out infinite -10s',
          willChange: 'transform',
        }}
      />
    </div>
  );
}

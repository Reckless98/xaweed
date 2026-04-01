export function RastaDivider({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="h-0.5 rasta-stripe-bg animate-rasta-stripe opacity-40" />
    </div>
  );
}

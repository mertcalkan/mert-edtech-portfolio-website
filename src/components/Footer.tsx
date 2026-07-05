export const Footer = ({ className = "absolute bottom-4 left-0 w-full z-40 pointer-events-none flex justify-center" }: { className?: string }) => (
  <div className={className}>
    <p className="text-white/80 text-xs sm:text-sm font-medium tracking-wide">
      Mert Calkan. {new Date().getFullYear()}. Tüm hakları saklıdır.
    </p>
  </div>
);

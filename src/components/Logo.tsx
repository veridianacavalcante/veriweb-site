// Logo final da marca (public/logo-horizontal.svg). Para trocar, substitua o arquivo em public/.
export function Logo({ className = "h-10" }: { className?: string }) {
  return (
    <a href="#inicio" className="flex items-center" aria-label="VERIWEB, voltar ao início">
      <img
        src="/logo-horizontal.svg"
        alt="VERIWEB"
        width={175}
        height={40}
        className={`${className} w-auto`}
      />
    </a>
  );
}

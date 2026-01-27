import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm tracking-[0.3em] uppercase text-neutral-500 mb-6">
        Erreur 404
      </p>
      <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-light mb-6">
        Page introuvable
      </h1>
      <p className="text-lg md:text-xl text-neutral-400 max-w-md mb-12 font-light leading-relaxed">
        Comme toute quête philosophique, certains chemins mènent au vide.
        Celui-ci en fait partie.
      </p>
      <Link
        href="/"
        className="group inline-flex items-center gap-3 border border-neutral-700 hover:border-neutral-400 px-8 py-3 text-sm tracking-widest uppercase transition-colors duration-300"
      >
        <span className="transition-transform duration-300 group-hover:-translate-x-1">
          &larr;
        </span>
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}

"use client";

import { ExternalLink, User } from "lucide-react";
import { artists } from "@/data/content";
import FadeIn from "@/components/FadeIn";

export default function ArtistesPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-dark to-dark/95 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8">
              Artistes
            </h1>
            <p className="font-body text-lg md:text-xl text-light/90 leading-relaxed max-w-3xl mx-auto">
              Arteral collabore avec des artistes conceptuels qui partagent
              notre vision : transformer la philosophie en art incarné. Découvrez
              les créateurs derrière la collection Amour ↔ Ennuie.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Artists Gallery */}
      <section className="py-16 md:py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {artists.map((artist, index) => (
              <FadeIn key={artist.name} delay={index * 0.2}>
                <div className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  {/* Artist Image Placeholder */}
                  <div className="aspect-square bg-gradient-to-br from-dark/10 to-primary/10 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <User className="w-24 h-24 md:w-32 md:h-32 text-dark/30 relative z-10" />
                  </div>

                  {/* Artist Info */}
                  <div className="p-6 md:p-8">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-dark mb-2">
                      {artist.name}
                    </h3>
                    <p className="font-body text-sm md:text-base font-semibold text-accent mb-4">
                      {artist.discipline}
                    </p>
                    <p className="font-body text-sm md:text-base text-dark/70 leading-relaxed mb-6">
                      {artist.bio}
                    </p>

                    {/* Contribution */}
                    <div className="bg-light p-4 rounded-lg mb-6">
                      <p className="font-body text-xs font-semibold text-dark/60 uppercase tracking-wider mb-2">
                        Contribution à Amour ↔ Ennuie
                      </p>
                      <p className="font-body text-sm md:text-base text-dark/80 leading-relaxed">
                        {artist.contribution}
                      </p>
                    </div>

                    {/* Portfolio Link */}
                    <a
                      href={artist.portfolio}
                      className="inline-flex items-center gap-2 font-body text-sm md:text-base font-semibold text-primary hover:text-primary/80 transition-colors group/link"
                    >
                      <span>Voir le portfolio</span>
                      <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-dark mb-6 md:mb-8">
              Collaborez avec nous
            </h2>
            <p className="font-body text-base md:text-lg text-dark/70 leading-relaxed mb-8 md:mb-12 max-w-2xl mx-auto">
              Vous êtes artiste et vous explorez des thèmes philosophiques,
              émotionnels ou conceptuels? Nous recherchons constamment de
              nouvelles collaborations pour nos futures collections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-block font-body font-semibold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 bg-primary hover:bg-primary/90 text-white rounded-sm transition-all hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Nous contacter
              </a>
              <a
                href="/processus"
                className="inline-block font-body font-semibold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 border-2 border-dark hover:bg-dark hover:text-white text-dark rounded-sm transition-all hover:scale-105"
              >
                Voir notre processus
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

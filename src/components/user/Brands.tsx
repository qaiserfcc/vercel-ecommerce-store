'use client';

import Link from 'next/link';

// Mock data
const brands = [
  { id: 1, name: 'TechPro', slug: 'techpro', logo: 'TP' },
  { id: 2, name: 'SmartGadgets', slug: 'smartgadgets', logo: 'SG' },
  { id: 3, name: 'EcoLife', slug: 'ecolife', logo: 'EL' },
  { id: 4, name: 'FitnessPro', slug: 'fitnesspro', logo: 'FP' },
  { id: 5, name: 'HomeEssentials', slug: 'homeessentials', logo: 'HE' },
  { id: 6, name: 'StyleMart', slug: 'stylemart', logo: 'SM' },
];

export default function Brands() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-dark mb-2">Featured Brands</h2>
        <p className="text-gray-600">Trusted brands we proudly promote</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            href={`/brand/${brand.slug}`}
            className="card text-center hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">{brand.logo}</span>
            </div>
            <h3 className="font-semibold text-dark hover:text-primary transition">{brand.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { Bookmark, Sparkles, Filter, Check } from 'lucide-react';

export const MobileShopScreen: React.FC = () => {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const products = [
    {
      id: 'm-prod-01',
      title: 'The Lumumba Curved Lounge',
      category: 'Furniture',
      priceUgx: 'UGX 28,500,000',
      heroImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      provenance: 'Kampala Atelier'
    },
    {
      id: 'm-prod-02',
      title: 'Monolithic Arabescato Table',
      category: 'Surfaces & Stone',
      priceUgx: 'UGX 48,000,000',
      heroImage: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
      provenance: 'Carrara, Italy'
    },
    {
      id: 'm-prod-03',
      title: 'Cascade Gyroscope Chandelier',
      category: 'Lighting',
      priceUgx: 'UGX 16,800,000',
      heroImage: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
      provenance: 'Venice, Italy'
    }
  ];

  const categories = ['All', 'Furniture', 'Surfaces & Stone', 'Lighting'];
  const filtered = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const toggleSave = (id: string) => {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter(i => i !== id));
    } else {
      setSavedIds([...savedIds, id]);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#FAF8F5] pb-24 text-stone-900">
      <div className="bg-white border-b border-[#EDE8E1] px-5 pt-12 pb-3 sticky top-0 z-20">
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#801D31] font-semibold">
          Curated Atelier
        </span>
        <h1 className="font-serif-luxury text-2xl font-light text-stone-900">
          Shop Pieces
        </h1>

        <div className="flex gap-2 overflow-x-auto pt-3 pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#801D31] text-white font-semibold'
                  : 'bg-[#FAF8F5] text-stone-600 border border-[#EDE8E1]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {filtered.map((prod) => {
          const isSaved = savedIds.includes(prod.id);

          return (
            <div
              key={prod.id}
              className="p-4 rounded-3xl bg-white border border-[#EDE8E1] space-y-3 shadow-xs"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 relative">
                <img src={prod.heroImage} alt={prod.title} className="w-full h-full object-cover" />
                <button
                  onClick={() => toggleSave(prod.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border ${
                    isSaved ? 'bg-[#801D31] text-white border-[#801D31]' : 'bg-white/90 text-stone-700 border-[#EDE8E1]'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-stone-400">
                  {prod.provenance}
                </span>
                <h3 className="font-serif-luxury text-lg font-medium text-stone-900">
                  {prod.title}
                </h3>
                <div className="font-mono text-sm font-bold text-[#801D31] mt-0.5">
                  {prod.priceUgx}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

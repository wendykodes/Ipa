import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIpaData } from '../../context/IpaDataContext';
import { formatMoney } from '../../types/ipaBrand';
import { 
  Bookmark, 
  ArrowRight, 
  Check, 
  SlidersHorizontal 
} from 'lucide-react';

export const AtelierShopExperience: React.FC = () => {
  const { products, currency, savedProductIds, toggleSaveProduct } = useIpaData();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [quoteRequestedId, setQuoteRequestedId] = useState<string | null>(null);

  const categories = ['All', 'Furniture', 'Surfaces & Stone', 'Lighting', 'Joinery'];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleRequestQuote = (id: string) => {
    setQuoteRequestedId(id);
    setTimeout(() => setQuoteRequestedId(null), 3500);
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-16 text-stone-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
        {/* Editorial Header */}
        <div className="border-b border-[#EDE8E1] pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#801D31] font-mono font-semibold block">
              The Atelier Catalog
            </span>
            <h1 className="font-serif-luxury text-4xl sm:text-5xl font-light text-stone-900 tracking-tight">
              Bespoke Furniture & Architectural Objects
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xl font-light leading-relaxed">
              Curated sculptural pieces designed in-house or crafted to order with our workshops in Kampala, Carrara, and Venice. Custom sizing and material specifications available for all commissions.
            </p>
          </div>

          {/* Categories Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-white border border-[#EDE8E1] rounded-[2px] overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer rounded-[2px] whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#801D31] text-white font-semibold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-[#FAF9F6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Luxury Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {filteredProducts.map((prod) => {
            const isSaved = savedProductIds.includes(prod.id);
            const hasQuote = quoteRequestedId === prod.id;

            return (
              <div
                key={prod.id}
                className="group flex flex-col justify-between border-b border-[#EDE8E1] pb-8 space-y-5 bg-white p-6 border border-[#EDE8E1]/80 hover:border-stone-400 transition-colors rounded-[2px]"
              >
                <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden border border-[#EDE8E1]">
                  <img
                    src={prod.heroImage}
                    alt={prod.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <button
                    onClick={() => toggleSaveProduct(prod.id)}
                    className={`absolute top-3 right-3 p-2.5 backdrop-blur-md transition-colors cursor-pointer border ${
                      isSaved
                        ? 'bg-[#801D31] text-white border-[#801D31]'
                        : 'bg-white/90 text-stone-700 hover:text-[#801D31] border-[#EDE8E1]'
                    }`}
                    title={isSaved ? "Saved to your space" : "Save to my space"}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    {/* Clean unboxed metadata with separators */}
                    <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-stone-400">
                      <span>{prod.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{prod.provenance.split(',')[0]}</span>
                      <span aria-hidden="true">·</span>
                      <span>Lead {prod.leadTimeWeeks}w</span>
                    </div>

                    <Link
                      to={`/products/${prod.id}`}
                      className="block font-serif-luxury text-2xl font-light text-stone-900 group-hover:text-[#801D31] transition-colors leading-snug"
                    >
                      {prod.title}
                    </Link>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed font-light">
                      {prod.description}
                    </p>

                    <div className="pt-2 text-[11px] font-mono text-stone-500 space-y-1">
                      <div>
                        <span className="text-stone-400">Dimensions: </span>
                        <span>{prod.dimensions.widthCm}W × {prod.dimensions.depthCm}D × {prod.dimensions.heightCm}H cm</span>
                      </div>
                      <div>
                        <span className="text-stone-400">Materials: </span>
                        <span className="text-stone-700">{prod.materials.slice(0, 2).join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#EDE8E1] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase font-mono block">Price (VAT Excl.)</span>
                      <span className="font-mono text-base font-semibold text-stone-900 tabular-nums">
                        {formatMoney(prod.basePriceUgx, currency)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/products/${prod.id}`}
                        className="px-4 py-2.5 border border-stone-800 hover:bg-stone-900 hover:text-white text-stone-900 text-[11px] uppercase tracking-[0.16em] font-medium rounded-[2px] transition-colors whitespace-nowrap"
                      >
                        Details
                      </Link>

                      <button
                        onClick={() => handleRequestQuote(prod.id)}
                        disabled={hasQuote}
                        className={`px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] font-medium rounded-[2px] transition-all cursor-pointer whitespace-nowrap ${
                          hasQuote
                            ? 'bg-emerald-800 text-white'
                            : 'bg-[#801D31] hover:bg-[#6B1727] text-white'
                        }`}
                      >
                        {hasQuote ? (
                          <span className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5" />
                            Quoted
                          </span>
                        ) : (
                          'Inquire'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

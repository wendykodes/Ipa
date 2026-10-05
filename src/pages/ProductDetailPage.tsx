import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useIpaData } from '../context/IpaDataContext';
import { formatMoney } from '../types/ipaBrand';
import { ArrowLeft, Bookmark, Check, Send } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, currency, savedProductIds, toggleSaveProduct } = useIpaData();
  const [inquirySent, setInquirySent] = useState<boolean>(false);
  const [customNotes, setCustomNotes] = useState<string>('');

  const product = products.find(p => p.id === id) || products[0];
  const isSaved = savedProductIds.includes(product.id);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => setInquirySent(false), 4000);
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-12 text-stone-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-10">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-stone-600 hover:text-[#801D31] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to The Atelier</span>
        </Link>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Gallery */}
          <div className="lg:col-span-7 space-y-6">
            <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100 border border-[#EDE8E1] rounded-[2px]">
              <img
                src={product.heroImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {product.galleryImages.map((img, i) => (
                <div key={i} className="aspect-[4/3] overflow-hidden bg-stone-100 border border-[#EDE8E1] rounded-[2px]">
                  <img src={img} alt={`Detail ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Specifications & Contiguous Purchase Module */}
          <div className="lg:col-span-5 space-y-6 bg-white p-8 border border-[#EDE8E1] rounded-[2px] shadow-xs">
            <div className="space-y-3 border-b border-[#EDE8E1] pb-6">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="uppercase tracking-[0.2em] text-[#801D31] font-semibold">
                  {product.category}
                </span>
                <span className="text-stone-400">SKU: {product.sku}</span>
              </div>

              <h1 className="font-serif-luxury text-3xl sm:text-4xl text-stone-900 font-light leading-tight">
                {product.title}
              </h1>

              <p className="text-xs text-stone-500 font-light leading-relaxed">
                {product.subtitle}
              </p>

              <div className="pt-3">
                <span className="text-[10px] uppercase font-mono text-stone-400 block tracking-wider">Commission Price (VAT Excl.)</span>
                <span className="font-mono text-2xl font-semibold text-stone-900 tabular-nums">
                  {formatMoney(product.basePriceUgx, currency)}
                </span>
              </div>
            </div>

            {/* Architectural Specifications Table */}
            <div className="space-y-4 text-xs font-light">
              <p className="text-stone-600 leading-relaxed">
                {product.description}
              </p>

              <div className="p-4 bg-[#FAF9F6] border border-[#EDE8E1] space-y-2 font-mono text-xs rounded-[2px]">
                <div className="flex justify-between">
                  <span className="text-stone-400">Provenance:</span>
                  <span className="text-stone-800 text-right">{product.provenance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Dimensions:</span>
                  <span className="text-stone-800 text-right">
                    {product.dimensions.widthCm}W × {product.dimensions.depthCm}D × {product.dimensions.heightCm}H cm
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Lead Time:</span>
                  <span className="text-stone-800 text-right">Bespoke build · {product.leadTimeWeeks} weeks</span>
                </div>
                <div className="pt-1 border-t border-[#EDE8E1]">
                  <span className="text-stone-400 block mb-1">Materials:</span>
                  <span className="text-stone-700">{product.materials.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Action Form */}
            <form onSubmit={handleInquiry} className="space-y-4 pt-4 border-t border-[#EDE8E1]">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase tracking-wider text-stone-700 block">
                  Custom Specification or Residence Inquiries
                </label>
                <textarea
                  rows={3}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Specify custom marble veining, timber species, custom dimensions, or delivery destination..."
                  className="w-full p-3 text-xs bg-[#FAF9F6] border border-[#EDE8E1] text-stone-900 focus:outline-none focus:border-[#801D31] rounded-[2px]"
                />
              </div>

              {inquirySent ? (
                <div className="p-3 bg-emerald-50 border border-emerald-600/30 text-emerald-800 text-xs font-mono flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Specification request transmitted to Atelier Director.</span>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 bg-[#801D31] hover:bg-[#6B1727] text-white text-xs uppercase tracking-[0.2em] font-medium rounded-[2px] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Request Bespoke Specification</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleSaveProduct(product.id)}
                    className={`p-3.5 border transition-colors cursor-pointer rounded-[2px] ${
                      isSaved
                        ? 'bg-[#801D31] text-white border-[#801D31]'
                        : 'border-[#EDE8E1] text-stone-700 hover:border-stone-900 bg-white'
                    }`}
                    title={isSaved ? "Saved to your space" : "Save to my space"}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

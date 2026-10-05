import React, { useState } from 'react';
import { useIpaData } from '../../context/IpaDataContext';
import { formatMoney } from '../../types/ipaBrand';
import { 
  Check, 
  ArrowRight, 
  CheckCircle2
} from 'lucide-react';

interface DesignMySpaceWorkflowProps {
  onSuccessNavigateToMyHome?: () => void;
}

export const DesignMySpaceWorkflow: React.FC<DesignMySpaceWorkflowProps> = ({
  onSuccessNavigateToMyHome
}) => {
  const { currency, submitDesignMySpaceRequest } = useIpaData();
  const [roomType, setRoomType] = useState<string>('Grand Living Salon & Great Hall');
  const [dimensions, setDimensions] = useState<string>('120 m²');
  const [selectedStyle, setSelectedStyle] = useState<string>('Modern Organic Travertine');
  const [budgetUgx, setBudgetUgx] = useState<number>(650000000); // ~£134k
  const [notes, setNotes] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const styleOptions = [
    {
      id: 'style-01',
      title: 'Modern Organic Travertine',
      description: 'Honed Roman Silver Travertine, wire-brushed oak, Belgian bouclé, and soft architectural warm dim lighting.',
      image: '/images/hero_estate_interior_1791180692586.jpg',
      materials: 'Travertine · White Oak · Bouclé'
    },
    {
      id: 'style-02',
      title: 'Architectural Stone & Oak',
      description: 'Italian Paonazzo marble slabs, smoked eucalyptus joinery, and bronze detailing with floor-to-ceiling pivot openings.',
      image: '/images/townhouse_belgravia_monograph_1791180714159.jpg',
      materials: 'Paonazzo Marble · Smoked Oak · Bronze'
    },
    {
      id: 'style-03',
      title: 'Equatorial Modernism',
      description: 'Polished pale terrazzo aggregates, solid African mahogany louvers, natural linen drapery, and shaded cantilevered terraces.',
      image: '/images/villa_nakasero_residence_1791180703557.jpg',
      materials: 'Terrazzo · African Mahogany · Fine Linen'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitDesignMySpaceRequest({
      roomType,
      style: selectedStyle,
      dimensions,
      budgetUgx,
      notes
    });
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-16 text-stone-900">
      <div className="max-w-4xl mx-auto px-6 space-y-12">
        {/* Header */}
        <div className="border-b border-[#EDE8E1] pb-10 text-center space-y-3">
          <span className="text-[11px] uppercase tracking-[0.24em] text-[#801D31] font-mono font-semibold block">
            Spatial Design Brief
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-light text-stone-900 tracking-tight">
            Commission a Turnkey Space
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto font-light leading-relaxed">
            Specify your room typology, aesthetic direction, and estimated footprint. Our interior architects will prepare a bespoke spatial brief and preliminary estimate.
          </p>
        </div>

        {submitted ? (
          <div className="p-10 sm:p-14 bg-white border border-[#EDE8E1] rounded-[2px] text-center space-y-6 max-w-xl mx-auto shadow-xs">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-900 border border-[#EDE8E1]">
              <Check className="w-6 h-6 text-[#801D31]" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif-luxury text-3xl text-stone-900 font-light">
                Brief Successfully Registered
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                Your architectural brief has been securely transferred to the Lead Interior Architect. A director will contact you within 24 business hours to arrange a concept review.
              </p>
            </div>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs uppercase tracking-[0.18em] font-medium rounded-[2px] cursor-pointer"
              >
                Specify Another Space
              </button>
              {onSuccessNavigateToMyHome && (
                <button
                  onClick={onSuccessNavigateToMyHome}
                  className="px-6 py-3 bg-[#801D31] hover:bg-[#6B1727] text-white text-xs uppercase tracking-[0.18em] font-medium rounded-[2px] cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Enter My Home Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-10 bg-white p-8 sm:p-12 border border-[#EDE8E1] rounded-[2px] shadow-xs">
            {/* Step 1: Typology & Footprint */}
            <div className="space-y-6">
              <div className="border-b border-[#EDE8E1] pb-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#801D31] font-semibold block">
                  Step 01
                </span>
                <h3 className="font-serif-luxury text-2xl font-light text-stone-900">
                  Spatial Typology & Footprint
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-stone-700 block">
                    Room or Area Typology
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    className="w-full p-3.5 bg-[#FAF9F6] border border-[#EDE8E1] text-xs text-stone-900 focus:outline-none focus:border-[#801D31] rounded-[2px]"
                  >
                    <option value="Grand Living Salon & Great Hall">Grand Living Salon & Great Hall</option>
                    <option value="Master Bedroom Suite & Dressing">Master Bedroom Suite & Dressing</option>
                    <option value="Chef's Kitchen & Dining Atelier">Chef's Kitchen & Dining Atelier</option>
                    <option value="Penthouse Terrace & Solarium">Penthouse Terrace & Solarium</option>
                    <option value="Full Residence Turnkey Fit-out">Full Residence Turnkey Fit-out</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-stone-700 block">
                    Approximate Floor Area
                  </label>
                  <input
                    type="text"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    placeholder="e.g. 140 m² or 2,200 sq ft"
                    className="w-full p-3.5 bg-[#FAF9F6] border border-[#EDE8E1] text-xs text-stone-900 focus:outline-none focus:border-[#801D31] rounded-[2px]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Aesthetic Direction */}
            <div className="space-y-6">
              <div className="border-b border-[#EDE8E1] pb-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#801D31] font-semibold block">
                  Step 02
                </span>
                <h3 className="font-serif-luxury text-2xl font-light text-stone-900">
                  Curated Aesthetic Direction
                </h3>
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                {styleOptions.map((opt) => {
                  const isSelected = selectedStyle === opt.title;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedStyle(opt.title)}
                      className={`group cursor-pointer border rounded-[2px] overflow-hidden transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#801D31] ring-1 ring-[#801D31] shadow-xs'
                          : 'border-[#EDE8E1] hover:border-stone-400'
                      }`}
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                        <img
                          src={opt.image}
                          alt={opt.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {isSelected && (
                          <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-[#801D31] text-white flex items-center justify-center">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>

                      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                        <div className="space-y-1">
                          <h4 className="font-serif-luxury text-lg font-light text-stone-900">
                            {opt.title}
                          </h4>
                          <p className="text-[11px] text-stone-500 leading-relaxed font-light">
                            {opt.description}
                          </p>
                        </div>
                        <div className="pt-2 text-[10px] font-mono uppercase text-[#801D31] tracking-wider border-t border-[#EDE8E1]">
                          {opt.materials}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Financial Envelope & Specific Notes */}
            <div className="space-y-6">
              <div className="border-b border-[#EDE8E1] pb-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#801D31] font-semibold block">
                  Step 03
                </span>
                <h3 className="font-serif-luxury text-2xl font-light text-stone-900">
                  Target Budget & Specific Requirements
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-stone-700 uppercase tracking-wider">Estimated Fit-Out Allocation</span>
                  <span className="text-[#801D31] font-semibold tabular-nums text-sm">
                    {formatMoney(budgetUgx, currency)}
                  </span>
                </div>

                <input
                  type="range"
                  min="200000000"
                  max="3000000000"
                  step="50000000"
                  value={budgetUgx}
                  onChange={(e) => setBudgetUgx(Number(e.target.value))}
                  className="w-full accent-[#801D31] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-stone-400">
                  <span>Atelier Select</span>
                  <span>Haute Couture</span>
                  <span>Imperial Turnkey</span>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-stone-700 block">
                    Specialist Joinery, Art, or Architectural Notes
                  </label>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Specify architectural constraints, preferred materials (e.g. Arabescato marble, acoustic panelling), ceiling heights, or completion deadlines."
                    className="w-full p-3.5 bg-[#FAF9F6] border border-[#EDE8E1] text-xs text-stone-900 focus:outline-none focus:border-[#801D31] rounded-[2px] leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-[#EDE8E1] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-[11px] font-mono text-stone-400">
                Single-source contract · Confidential client NDA
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 bg-[#801D31] hover:bg-[#6B1727] text-white text-xs uppercase tracking-[0.22em] font-medium rounded-[2px] transition-all cursor-pointer flex items-center justify-center gap-3"
              >
                <span>Submit Brief to Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

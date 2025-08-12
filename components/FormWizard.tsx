import React, { useState, useMemo } from 'react';
import type { UserInput } from '../types';
import ProgressBar from './ProgressBar';

// Data previously in InputForm and EarSizeSelector
const useCases = ["Music", "Gaming", "Calls", "Gym/Workouts", "Travel/Commute"];
const headphoneTypes = ["Any", "Over-ear", "On-ear", "In-ear (Earbuds)"];
const keyFeatures = ["Noise Cancellation (ANC)", "Wireless", "High-Quality Mic", "Water Resistant"];
const platformOptions = ["Mobile (iOS/Android)", "PC/Mac", "PlayStation", "Xbox", "Nintendo Switch"];
const batteryOptions = ["Any", "8+ hours (Full day)", "20+ hours (Multi-day)"];
const micOptions = ["Not important", "Good for occasional calls", "Crystal clear for work/streaming"];
const comfortPriorities = ["Lightweight", "Secure Fit", "Long-duration wear", "Noise Isolation"];
const budgetRanges = ["Under ₹4,000", "₹4,000 - ₹12,000", "₹12,000 - ₹25,000", "₹25,000+"];
type EarSizeOption = { id: string; label: string; size: number; description: string; imageUrl: string; };
const earSizeOptions: EarSizeOption[] = [
  { id: 'matchbox', label: 'Matchbox', size: 3.5, description: 'Height: ~3.5 cm', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaVivMDEgMthvqZ4JmwItOXekUpaWL_lyJ4g&s' },
  { id: 'golf-ball', label: 'Golf Ball', size: 4.3, description: 'Diameter: ~4.3 cm', imageUrl: 'data:image/jpeg;base64,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' },
  { id: 'airpods-pro-case', label: 'AirPods Pro Case', size: 4.5, description: 'Height: ~4.5 cm', imageUrl: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MUYG3_AV3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=WTRYbjBsN3ZmS0w4d21lbU55WFVGbFZya2lKWlJmUEwrYndWOTJiVWJWQUYwVmtIbGRkS25RMVpBRlo0bk5DUTZPRHZvK1FMZ2NJUlMzcllXU25pQVE' },
  { id: 'aa-battery', label: 'AA Battery', size: 5.0, description: 'Height: ~5.0 cm', imageUrl: 'https://makerbazar.in/cdn/shop/products/21os8uNIDqS_1024x.jpg?v=1702482001' },
  { id: 'tic-tac', label: 'Tic Tac Box', size: 5.8, description: 'Height: ~5.8 cm', imageUrl: 'https://images-cdn.ubuy.co.in/655a3a6b82699b22e727dd4f-tic-tac-freshmints-big-pack-12count-1oz.jpg' },
  { id: 'usb-drive', label: 'USB Flash Drive', size: 6.0, description: 'Length: ~6.0 cm', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Td-yhaVWR4I2zGsjMA7Z1kSgBeeHmxxKLQ&s' },
  { id: 'sticky-note', label: 'Sticky-Note', size: 7.6, description: 'Length: ~7.6 cm', imageUrl: 'https://www.aumnicrafts.in/cdn/shop/products/jefs-offcstnry-00013_m10_img1.jpg?v=1645546266' },
  { id: 'credit-card', label: 'Credit Card', size: 8.6, description: 'Height: ~8.6 cm', imageUrl: 'https://www.mastercard.co.in/content/dam/public/mastercardcom/sg/en/consumers/find-a-card/images/world-mastercard-card_1280x720.jpg' },
  { id: 'playing-card', label: 'Playing Card', size: 8.9, description: 'Height: ~8.9 cm', imageUrl: 'https://t3.ftcdn.net/jpg/04/41/46/48/360_F_441464846_TTrwfifSimvbiXzsYTBPPNUxpJQubuY9.jpg' },
];
const stepNames = ['Ear Size', 'Usage', 'Features', 'Style & Budget'];
const TOTAL_STEPS = 4;

interface FormWizardProps {
  onSubmit: (data: UserInput) => void;
}

const FormWizard: React.FC<FormWizardProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Omit<UserInput, 'features'>>({
    useCase: ["Music", "Calls"],
    comfort: "Long-duration wear",
    budget: "₹4,000 - ₹12,000",
    style: '',
    preferredType: 'Any',
    desiredFeatures: [],
    platformCompatibility: [],
    batteryLife: 'Any',
    micQuality: 'Good for occasional calls',
  });
  const [selectedEarSizeId, setSelectedEarSizeId] = useState('credit-card');
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS));
  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  
  const handleChange = (field: keyof typeof formData, value: any) => {
      setFormData(prev => ({...prev, [field]: value}));
  };
  
  const handleMultiSelect = (field: keyof typeof formData, value: string) => {
      setFormData(prev => {
          const list = (prev[field] as string[]) || [];
          const newList = list.includes(value) ? list.filter(item => item !== value) : [...list, value];
          return {...prev, [field]: newList};
      });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const selectedSizeDetails = earSizeOptions.find(opt => opt.id === selectedEarSizeId);
    const features = `User estimates their ear height is similar to a ${selectedSizeDetails?.label} (${selectedSizeDetails?.description}).`;
    
    onSubmit({ ...formData, features });
  };
  
  // -- Step 1 Content --
  const renderStep1 = () => (
    <div className="animate-fade-in">
      <h3 className="text-xl font-semibold text-slate-100 mb-2">Estimate Your Ear Size</h3>
      <p className="text-slate-400 mb-4 text-sm">Find a common object nearby and choose the one that's closest in height to your ear. This gives the AI a good estimate to work with.</p>
       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {earSizeOptions.map(option => (
          <button type="button" key={option.id} onClick={() => setSelectedEarSizeId(option.id)}
            className={`p-3 rounded-lg border-2 text-center font-medium transition-all duration-200 flex flex-col items-center justify-between gap-2 min-h-40 ${
              selectedEarSizeId === option.id
                ? 'bg-cyan-600/30 border-cyan-500 text-cyan-200 shadow-md'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500'
            }`}
          >
            <div className="h-20 w-full flex items-center justify-center">
              <img src={option.imageUrl} alt={option.label} className="max-h-full max-w-full object-contain rounded-sm" />
            </div>
            <div className="flex flex-col text-center">
              <span className="text-sm font-semibold">{option.label}</span>
              <span className="text-xs text-slate-400">{option.description}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // -- Step 2 Content --
  const renderStep2 = () => (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h3 className="text-xl font-semibold text-slate-100 mb-2">Primary Uses</h3>
        <p className="text-slate-400 mb-3 text-sm">What will you use them for most often? Select all that apply.</p>
        <div className="flex flex-wrap gap-3">
          {useCases.map(useCase => (
            <button type="button" key={useCase} onClick={() => handleMultiSelect('useCase', useCase)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                formData.useCase.includes(useCase) ? 'bg-cyan-500 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
              {useCase}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-slate-100 mb-2">Preferred Headphone Type</h3>
        <p className="text-slate-400 mb-3 text-sm">Which style do you prefer? Choose "Any" to get the best recommendation for your use case.</p>
        <div className="flex flex-wrap gap-3">
          {headphoneTypes.map(type => (
            <button type="button" key={type} onClick={() => handleChange('preferredType', type)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                formData.preferredType === type ? 'bg-cyan-500 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
  
  // -- Step 3 Content --
  const renderStep3 = () => (
    <div className="space-y-8 animate-fade-in">
        <div>
            <h3 className="text-xl font-semibold text-slate-100 mb-2">Key Features</h3>
            <p className="text-slate-400 mb-3 text-sm">Select any features that are important to you.</p>
            <div className="flex flex-wrap gap-3">
                {keyFeatures.map(f => (
                    <button type="button" key={f} onClick={() => handleMultiSelect('desiredFeatures', f)} className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${formData.desiredFeatures.includes(f) ? 'bg-cyan-500 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>{f}</button>
                ))}
            </div>
        </div>
        <div>
            <h3 className="text-xl font-semibold text-slate-100 mb-2">Platform Compatibility</h3>
            <p className="text-slate-400 mb-3 text-sm">What will you connect to? Select all that apply.</p>
            <div className="flex flex-wrap gap-3">
                {platformOptions.map(p => (
                    <button type="button" key={p} onClick={() => handleMultiSelect('platformCompatibility', p)} className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${formData.platformCompatibility.includes(p) ? 'bg-cyan-500 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>{p}</button>
                ))}
            </div>
        </div>
        <div>
            <h3 className="text-xl font-semibold text-slate-100 mb-2">Desired Battery Life</h3>
            <div className="flex flex-wrap gap-3">
                {batteryOptions.map(b => (
                    <button type="button" key={b} onClick={() => handleChange('batteryLife', b)} className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${formData.batteryLife === b ? 'bg-cyan-500 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>{b}</button>
                ))}
            </div>
        </div>
        <div>
            <h3 className="text-xl font-semibold text-slate-100 mb-2">Call Mic Quality</h3>
            <div className="flex flex-wrap gap-3">
                {micOptions.map(m => (
                    <button type="button" key={m} onClick={() => handleChange('micQuality', m)} className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${formData.micQuality === m ? 'bg-cyan-500 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>{m}</button>
                ))}
            </div>
        </div>
    </div>
  );
  
  // -- Step 4 Content --
  const renderStep4 = () => (
    <div className="space-y-8 animate-fade-in">
        <div>
            <h3 className="text-xl font-semibold text-slate-100 mb-2">Comfort Priority</h3>
            <p className="text-slate-400 mb-3 text-sm">What's most important for comfort?</p>
            <div className="flex flex-wrap gap-3">
                {comfortPriorities.map(p => (
                    <button type="button" key={p} onClick={() => handleChange('comfort', p)} className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${formData.comfort === p ? 'bg-cyan-500 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>{p}</button>
                ))}
            </div>
        </div>
        <div>
            <h3 className="text-xl font-semibold text-slate-100 mb-2">Budget Range</h3>
            <p className="text-slate-400 mb-3 text-sm">What's your approximate budget?</p>
            <div className="flex flex-wrap gap-3">
                {budgetRanges.map(b => (
                    <button type="button" key={b} onClick={() => handleChange('budget', b)} className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${formData.budget === b ? 'bg-cyan-500 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>{b}</button>
                ))}
            </div>
        </div>
        <div>
            <label htmlFor="style" className="text-xl font-semibold text-slate-100 mb-2 block">Style or Brand Preferences (Optional)</label>
            <p className="text-slate-400 mb-3 text-sm">Any specific brands you like or styles you prefer (e.g., "minimalist," "Sony," "not bulky")?</p>
            <input id="style" type="text" value={formData.style} onChange={(e) => handleChange('style', e.target.value)}
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-md text-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors"
                placeholder="e.g., Bose, in-ear, prefer black color" />
        </div>
    </div>
  );

  return (
    <div className="bg-slate-800/50 p-6 md:p-8 rounded-xl border border-slate-700 w-full animate-fade-in">
      <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} stepNames={stepNames} />
      
      <form onSubmit={handleSubmit}>
        <div className="min-h-96 py-4">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-slate-700">
          <button type="button" onClick={handleBack} disabled={currentStep === 1}
            className="bg-slate-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            Back
          </button>

          {currentStep < TOTAL_STEPS && (
            <button type="button" onClick={handleNext}
              className="bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 transition-all">
              Next
            </button>
          )}

          {currentStep === TOTAL_STEPS && (
            <button type="submit" disabled={isLoading}
              className="w-48 bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 transition-all disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {isLoading ? (
                  <>
                      <div className="w-5 h-5 rounded-full animate-spin border-2 border-dashed border-white border-t-transparent"></div>
                      <span>Finding...</span>
                  </>
              ) : (
                  'Find My Perfect Fit'
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormWizard;

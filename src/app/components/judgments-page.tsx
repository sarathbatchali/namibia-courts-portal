import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Search, Download, Scale, Calendar, FileText } from 'lucide-react';
import { Breadcrumb } from './breadcrumb';

interface JudgmentsPageProps {
  filter?: {
    court?: 'supreme' | 'high';
    category?: string;
  };
  onNavigate?: (page: any, filter?: any) => void;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function JudgmentsPage({ filter, onNavigate = () => {} }: JudgmentsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourt, setSelectedCourt] = useState(filter?.court || 'all');
  const [selectedCategory, setSelectedCategory] = useState(filter?.category || 'all');

  useEffect(() => {
    if (filter?.court) setSelectedCourt(filter.court);
    if (filter?.category) setSelectedCategory(filter.category);
  }, [filter]);

  const { data: judgments, isLoading } = useQuery({
    queryKey: ['judgments', selectedCourt, selectedCategory, searchQuery],
    queryFn: async () => {
      let url = `${API_URL}/api/judgments?limit=100`;
      const queryFilters: string[] = [];
      
      if (selectedCourt !== 'all') queryFilters.push(`where[court][equals]=${selectedCourt}`);
      if (selectedCategory !== 'all') queryFilters.push(`where[category][equals]=${selectedCategory}`);
      if (searchQuery) queryFilters.push(`where[caseTitle][contains]=${searchQuery}`);
      
      if (queryFilters.length > 0) {
        url += '&' + queryFilters.join('&');
      }
      
      const res = await fetch(url);
      const json = await res.json();
      return json.docs;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Search Header - Maroon Styling but keeping premium structure */}
      <div className="bg-[#7A1C1C] py-14 shadow-sm relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Breadcrumb 
            onNavigate={onNavigate}
            items={[
              { label: 'Home', page: 'home' },
              { label: selectedCourt !== 'all' ? `${selectedCourt} Court` : 'Document Hub', page: 'judgments' },
              { label: 'Judgments', page: 'judgments' },
            ]}
          />
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <div>
               <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tight leading-none">Judgments <span className="text-[#FFC72C]">Library</span></h1>
               <p className="text-white/60 font-medium italic">Official Digital Archive of Namibian Legal Precedents</p>
            </div>
            <div className="mt-8 md:mt-0 flex flex-col md:flex-row gap-4">
               <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                 <input 
                   type="text" 
                   placeholder="Search case name or number..." 
                   className="pl-10 pr-4 py-3 bg-white/10 border-2 border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-[#FFC72C] transition-all outline-none"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                  />
               </div>
               <select
                 value={selectedCourt}
                 onChange={(e) => setSelectedCourt(e.target.value as any)}
                 className="px-6 py-3 bg-white/10 border-2 border-white/10 rounded-xl focus:border-[#FFC72C] outline-none font-bold text-white appearance-none pr-10"
               >
                 <option value="all" className="text-gray-900">Display All Courts</option>
                 <option value="supreme" className="text-gray-900">Supreme Court</option>
                 <option value="high" className="text-gray-900">High Court</option>
               </select>
               <select
                 value={selectedCategory}
                 onChange={(e) => setSelectedCategory(e.target.value)}
                 className="px-6 py-3 bg-white/10 border-2 border-white/10 rounded-xl focus:border-[#FFC72C] outline-none font-bold text-white appearance-none pr-10"
               >
                 <option value="all" className="text-gray-900">All Categories</option>
                 <option value="civil" className="text-gray-900">Civil</option>
                 <option value="criminal" className="text-gray-900">Criminal</option>
                 <option value="labour" className="text-gray-900">Labour</option>
                 <option value="tax" className="text-gray-900">Tax</option>
               </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#FFC72C] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {judgments?.map((doc: any) => {
              const docDate = new Date(doc.judgmentDate);
              const yearMonth = `${docDate.getFullYear()}-${docDate.toLocaleString('default', { month: 'long' })}`;
              
              return (
                <div key={doc.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-center">
                    {/* Date Accent Column (Inspired by screenshot but made premium) */}
                    <div className="bg-gray-50 md:w-32 py-6 flex flex-col items-center justify-center border-r border-gray-100 group-hover:bg-[#7A1C1C]/5 transition-colors">
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Delivered</span>
                       <span className="text-gray-900 font-black text-xs uppercase tracking-tighter text-center px-2">
                         {yearMonth}
                       </span>
                    </div>

                    <div className="flex-1 p-6 flex flex-col md:flex-row md:items-center gap-6">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                           <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${doc.court === 'supreme' ? 'bg-[#001489] text-white' : 'bg-[#7A1C1C] text-white'}`}>
                             {doc.court} Court
                           </span>
                           <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-gray-100 text-gray-500">
                             {doc.category}
                           </span>
                           <div className="flex items-center gap-1.5 text-[8px] font-black text-gray-400 uppercase ml-auto tracking-widest">
                             <Calendar className="w-3.5 h-3.5" />
                             {docDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                           </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#7A1C1C] transition-colors mb-1">
                          {doc.caseTitle}
                        </h3>
                        <div className="flex items-center gap-4 text-[10px] text-gray-300 font-mono tracking-widest uppercase font-bold">
                           <span>Case No: {doc.caseNumber}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <a 
                          href={doc.externalUrl || (doc.file?.url ? `${API_URL}${doc.file.url}` : '#')} 
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-900 font-black text-[10px] uppercase tracking-widest rounded-lg hover:bg-[#FFC72C] hover:text-[#7A1C1C] transition-all border border-gray-100"
                        >
                          <Download className="w-4 h-4" />
                          View
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {judgments?.length === 0 && (
              <div className="bg-white rounded-2xl border-2 border-dashed border-gray-100 p-20 text-center text-gray-400 italic font-black uppercase tracking-widest text-xs">
                No judgments match your search selection.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

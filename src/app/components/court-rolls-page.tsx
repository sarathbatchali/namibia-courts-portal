import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Download, Calendar, Clock } from 'lucide-react';
import { Breadcrumb } from './breadcrumb';

interface CourtRollsPageProps {
  filter?: {
    court?: 'supreme' | 'high';
  };
  onNavigate?: (page: any, filter?: any) => void;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function CourtRollsPage({ filter, onNavigate = () => {} }: CourtRollsPageProps) {
  const [selectedCourt, setSelectedCourt] = useState(filter?.court || 'all');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    if (filter?.court) {
      setSelectedCourt(filter.court);
    }
  }, [filter]);

  const { data: rolls, isLoading } = useQuery({
    queryKey: ['court-rolls', selectedCourt, selectedType],
    queryFn: async () => {
      let url = `${API_URL}/api/court-rolls?limit=100`;
      const queryFilters: string[] = [];
      if (selectedCourt !== 'all') queryFilters.push(`where[court][equals]=${selectedCourt}`);
      if (selectedType !== 'all') queryFilters.push(`where[rollType][equals]=${selectedType}`);
      
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
      {/* Search Header */}
      <div className="bg-[#7A1C1C] py-14 shadow-sm relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Breadcrumb 
            onNavigate={onNavigate}
            items={[
              { label: selectedCourt !== 'all' ? `${selectedCourt} Court` : 'Document Hub', page: 'court-rolls' },
              { label: 'Court Rolls', page: 'court-rolls' },
              { label: selectedType.toUpperCase(), page: 'court-rolls' },
            ]}
          />
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tight leading-none">Court <span className="text-[#FFC72C]">Rolls</span></h1>
              <p className="text-white/60 font-medium italic underline decoration-[#FFC72C] decoration-2">Daily Hearing Schedules & Continuous Rolls</p>
            </div>
            <div className="mt-8 md:mt-0 flex flex-col md:flex-row gap-4">
               {/* Filters */}
               <select
                 value={selectedCourt}
                 onChange={(e) => setSelectedCourt(e.target.value as any)}
                 className="px-6 py-3 bg-white/10 border-2 border-white/10 rounded-xl focus:border-[#FFC72C] outline-none font-bold text-white appearance-none pr-10"
               >
                 <option value="all" className="text-gray-900">All Courts</option>
                 <option value="supreme" className="text-gray-900">Supreme Court Only</option>
                 <option value="high" className="text-gray-900">High Court Only</option>
               </select>
               <select
                 value={selectedType}
                 onChange={(e) => setSelectedType(e.target.value)}
                 className="px-6 py-3 bg-white/10 border-2 border-white/10 rounded-xl focus:border-[#FFC72C] outline-none font-bold text-white appearance-none pr-10"
               >
                 <option value="all" className="text-gray-900">All Roll Types</option>
                 <option value="day" className="text-gray-900">Day Rolls</option>
                 <option value="motion" className="text-gray-900">Motion Court Rolls</option>
                 <option value="continuous" className="text-gray-900">Continuous Rolls</option>
                 <option value="fixed" className="text-gray-900">Fixed Dates</option>
               </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex flex-col items-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-[#FFC72C] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium">Fetching court rolls from database...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {rolls?.map((doc: any) => (
              <div key={doc.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center">
                   {/* Main Content */}
                   <div className="flex-1 p-6">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                         <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${doc.court === 'supreme' ? 'bg-[#001489] text-white' : 'bg-[#7A1C1C] text-white'}`}>
                          {doc.court} Court
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600">
                          {doc.rollType}
                        </span>
                         <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700">
                          {doc.division}
                        </span>
                         <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase ml-auto">
                           <Calendar className="w-3.5 h-3.5" />
                           Roll Date: {new Date(doc.rollDate).toLocaleDateString('en-GB')}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-[#7A1C1C] transition-colors">{doc.title}</h3>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <div className="flex items-center gap-1.5 font-bold tracking-widest uppercase text-[10px]">
                           <Clock className="w-3.5 h-3.5" />
                           Posted: {new Date(doc.updatedAt).toLocaleDateString()}
                        </div>
                        {doc.filesize && (
                          <div className="text-[10px] uppercase font-bold text-gray-300 tracking-widest">
                            {Math.round(doc.filesize / 1024)} KB
                          </div>
                        )}
                      </div>
                   </div>

                   {/* Action Area */}
                   <div className="p-6 md:pl-0">
                      <a
                        href={`http://localhost:3000${doc.url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-900 font-black text-[10px] uppercase tracking-widest rounded-lg hover:bg-[#FFC72C] hover:text-[#7A1C1C] transition-all shadow-sm border border-gray-100"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </a>
                   </div>
                </div>
              </div>
            ))}
            {rolls?.length === 0 && (
              <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-100 text-gray-400 font-black uppercase tracking-widest text-xs">
                 No court rolls match your filter selection.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

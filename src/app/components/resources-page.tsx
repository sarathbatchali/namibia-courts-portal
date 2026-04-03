import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Search, Download, FileText, Calendar } from 'lucide-react';
import { Breadcrumb } from './breadcrumb';

interface ResourcesPageProps {
  type: 'legislation' | 'form' | 'media' | 'mediation' | 'bench-handbooks';
  filter?: {
    court?: 'supreme' | 'high';
  };
  onNavigate?: (page: any, filter?: any) => void;
}

export function ResourcesPage({ type, filter, onNavigate = () => {} }: ResourcesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourt, setSelectedCourt] = useState(filter?.court || 'all');

  useEffect(() => {
    if (filter?.court) {
      setSelectedCourt(filter.court);
    }
  }, [filter, type]);

  const { data: resources, isLoading } = useQuery({
    queryKey: ['resources', type, selectedCourt, searchQuery],
    queryFn: async () => {
      let url = `http://localhost:3000/api/resources?limit=100`;
      const queryFilters: string[] = [];
      
      // Filter by Resource Type based on the new IA
      if (type === 'legislation') {
        queryFilters.push(`where[type][in]=legislation,directive,rules,fee,constitution`);
      } else if (type === 'form') {
        queryFilters.push(`where[type][equals]=form`);
      } else if (type === 'media') {
        queryFilters.push(`where[type][in]=speech,news`);
      } else if (type === 'mediation') {
        queryFilters.push(`where[type][in]=mediation-diary`);
        // For Mediation, we usually only care about High Court
        if (selectedCourt === 'all') setSelectedCourt('high');
      }
      
      // Filter by Court Context
      if (selectedCourt !== 'all') {
        queryFilters.push(`where[courtContext][in]=${selectedCourt},judiciary`);
      }
      
      // Search
      if (searchQuery) queryFilters.push(`where[title][contains]=${searchQuery}`);
      
      if (queryFilters.length > 0) {
        url += '&' + queryFilters.join('&');
      }
      
      const res = await fetch(url);
      const json = await res.json();
      return json.docs;
    }
  });

  const getPageTitle = () => {
    if (type === 'legislation') return 'Legislation & Directives';
    if (type === 'form') return 'Forms & Precedents';
    if (type === 'media') return 'Media Hub';
    if (type === 'mediation') return 'Mediation Centre';
    return 'Digital Library';
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-[#7A1C1C] py-14 shadow-sm relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Breadcrumb 
            onNavigate={onNavigate}
            items={[
              { label: 'Home', page: 'home' },
              { label: 'Document Centre', page: 'home' },
              { label: (getPageTitle() || 'RESOURCES').toUpperCase(), page: 'home' },
            ]}
          />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
               <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tight leading-none">{getPageTitle().split(' & ')[0]} <span className="text-[#FFC72C]">{getPageTitle().split(' & ')[1] || ''}</span></h1>
               <p className="text-white/60 font-medium italic underline decoration-[#FFC72C] decoration-2">Official Records of the Namibian Judiciary</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 flex-1 max-w-2xl">
               <div className="relative flex-1">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                 <input 
                   type="text" 
                   placeholder={`Search ${type}...`} 
                   className="w-full pl-10 pr-4 py-3 bg-white/10 border-2 border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-[#FFC72C] transition-all outline-none"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                  />
               </div>
                {type !== 'legislation' && (
                  <select
                    value={selectedCourt}
                    onChange={(e) => setSelectedCourt(e.target.value)}
                    className="px-6 py-3 bg-white/10 border-2 border-white/10 rounded-xl focus:border-[#FFC72C] outline-none font-bold text-white appearance-none pr-10"
                  >
                    <option value="all" className="text-gray-900">All Contexts</option>
                    <option value="supreme" className="text-gray-900">Supreme Court</option>
                    <option value="high" className="text-gray-900">High Court</option>
                  </select>
                )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#FFC72C] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {resources?.map((doc: any) => (
              <div key={doc.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center p-6 gap-6">
                  <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#FFC72C]/10 transition-colors">
                    <FileText className="w-7 h-7 text-gray-300 group-hover:text-[#FFC72C]" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                       <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${doc.courtContext === 'judiciary' ? 'bg-amber-100 text-amber-800' : (doc.courtContext === 'supreme' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800')}`}>
                         {doc.courtContext}
                       </span>
                       <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500">
                         {doc.type}
                       </span>
                       <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase ml-auto">
                         <Calendar className="w-3.5 h-3.5" />
                         Updated: {doc.effectiveDate ? new Date(doc.effectiveDate).toLocaleDateString() : new Date(doc.updatedAt).toLocaleDateString()}
                       </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#001489] transition-colors mb-1">
                      {doc.title}
                    </h3>
                    <div className="flex items-center gap-4 text-[10px] text-gray-300 font-mono tracking-widest uppercase">
                       <span>{doc.mimeType?.split('/')[1] || 'PDF'}</span>
                       {doc.filesize && <span>• {Math.round(doc.filesize / 1024)} KB</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <a 
                      href={`http://localhost:3000${doc.url}`} 
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-900 font-bold text-[10px] uppercase tracking-widest rounded-lg hover:bg-[#FFC72C] hover:text-[#001489] transition-all border border-gray-100"
                    >
                      <Download className="w-4 h-4" />
                      View
                    </a>
                  </div>
                </div>
              </div>
            ))}
            {resources?.length === 0 && (
              <div className="bg-white rounded-2xl border-2 border-dashed border-gray-100 p-20 text-center text-gray-400 italic">
                No resources match your search criteria.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

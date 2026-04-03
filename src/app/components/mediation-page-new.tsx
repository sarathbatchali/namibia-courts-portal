import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Search, Download, Calendar as CalendarIcon, Phone, Mail, MapPin } from 'lucide-react';
import { Breadcrumb } from './breadcrumb';

interface MediationPageProps {
  onNavigate?: (page: any) => void;
}

export function MediationPage({ onNavigate = () => {} }: MediationPageProps) {
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedDivision, setSelectedDivision] = useState('all');

  // LIVE PAYLOAD CMS FETCH!
  const { data: liveDocuments, isLoading } = useQuery({
    queryKey: ['payload-documents'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/api/documents');
      const json = await res.json();
      return json.docs;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Page Header */}
      <div className="bg-[#7A1C1C] py-14 shadow-sm relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Breadcrumb 
            onNavigate={onNavigate}
            items={[
              { label: 'High Court', page: 'home' },
              { label: 'Mediation', page: 'home' },
              { label: 'Services', page: 'home' },
            ]}
          />
          <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tight leading-none">Mediation <span className="text-[#FFC72C]">Services</span></h1>
          <p className="text-white/60 font-medium italic underline decoration-[#FFC72C] decoration-2">
            Alternative dispute resolution & mediation diaries
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* About Mediation */}
        <div className="bg-gradient-to-r from-[#D4A02B]/10 to-[#C68E17]/10 border-l-4 border-[#D4A02B] p-6 rounded-r-lg mb-8">
          <h2 className="text-2xl font-bold text-[#1A2F4E] mb-3">About Mediation</h2>
          <p className="text-gray-700 mb-4">
            Mediation is a form of alternative dispute resolution (ADR) where parties work with a neutral
            third party to resolve their disputes. It is often faster and more cost-effective than litigation.
          </p>
        </div>

        {/* Live Payload Diaries */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1A2F4E] mb-4">Live CMS Uploads (Automatic Sync)</h2>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-green-500">
            {isLoading ? (
               <div className="p-8 text-center text-gray-500 font-semibold">Fetching from PostgreSQL Database...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#1A2F4E] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Document Title</th>
                      <th className="px-6 py-4 text-left font-semibold">Version</th>
                      <th className="px-6 py-4 text-left font-semibold">Upload Date</th>
                      <th className="px-6 py-4 text-left font-semibold">File Type</th>
                      <th className="px-6 py-4 text-center font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {liveDocuments?.map((doc: any, index: number) => (
                      <tr key={doc.id} className="hover:bg-green-50 transition-colors bg-white">
                        <td className="px-6 py-4 font-bold text-gray-900">{doc.title}</td>
                        <td className="px-6 py-4 text-gray-900">{doc.version}</td>
                        <td className="px-6 py-4 text-gray-600">
                          {new Date(doc.displayDate).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'long', day: 'numeric'
                          })}
                        </td>
                         <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            {doc.mimeType}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <a 
                            href={`http://localhost:3000${doc.url}`} 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </a>
                        </td>
                      </tr>
                    ))}
                    {liveDocuments?.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-gray-500">No documents found. Upload one in CMS!</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1A2F4E] mb-4">Contact Mediation Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-bold text-lg text-[#1A2F4E] mb-4">Main Division</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#D4A02B] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">High Court, Windhoek</p>
                    <p className="text-gray-600">Cnr Independence Ave & John Meinert Street</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#D4A02B]" />
                  <p className="text-gray-700">+264 61 275 9111</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#D4A02B]" />
                  <p className="text-gray-700">mediation.whk@judiciary.na</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-bold text-lg text-[#1A2F4E] mb-4">Coastal Division</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#D4A02B] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">High Court, Walvis Bay</p>
                    <p className="text-gray-600">Sam Nujoma Avenue</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#D4A02B]" />
                  <p className="text-gray-700">+264 64 209 1000</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#D4A02B]" />
                  <p className="text-gray-700">mediation.wlb@judiciary.na</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="font-bold text-lg text-[#1A2F4E] mb-4">Northern Division</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#D4A02B] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">High Court, Oshakati</p>
                    <p className="text-gray-600">Main Street</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#D4A02B]" />
                  <p className="text-gray-700">+264 65 220 1000</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#D4A02B]" />
                  <p className="text-gray-700">mediation.osh@judiciary.na</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Request Mediation */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#1A2F4E] mb-4">How to Request Mediation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="w-12 h-12 bg-[#D4A02B] text-white rounded-full flex items-center justify-center font-bold text-xl mb-3">
                1
              </div>
              <h3 className="font-bold text-lg mb-2">Submit Application</h3>
              <p className="text-gray-600 text-sm">
                File a mediation request with the court registrar using the prescribed form
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-[#D4A02B] text-white rounded-full flex items-center justify-center font-bold text-xl mb-3">
                2
              </div>
              <h3 className="font-bold text-lg mb-2">Appointment Scheduled</h3>
              <p className="text-gray-600 text-sm">
                The mediation coordinator will schedule a session and notify all parties
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-[#D4A02B] text-white rounded-full flex items-center justify-center font-bold text-xl mb-3">
                3
              </div>
              <h3 className="font-bold text-lg mb-2">Attend Session</h3>
              <p className="text-gray-600 text-sm">
                Participate in the mediation session with a neutral mediator
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

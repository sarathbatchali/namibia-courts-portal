import { ExternalLink, ChevronRight } from 'lucide-react';

interface LinkCard {
  title: string;
  url: string;
}

const quickLinks: LinkCard[] = [
  {
    title: 'Law Society of Namibia',
    url: 'http://www.lawsocietynamibia.org',
  },
  {
    title: 'Namibia Society of Advocates',
    url: 'http://www.namibianbar.org',
  },
  {
    title: 'Legal Assistance Centre (LAC) Namibia',
    url: 'http://www.lac.org.na',
  },
  {
    title: 'SAFLII',
    url: 'http://www.saflii.org/content/namibia-index',
  },
  {
    title: 'Ministry of Justice',
    url: 'http://www.moj.gov.na',
  },
  {
    title: 'The Hague Apostille Section',
    url: 'https://www.hcch.net/en/instruments/conventions/specialised-sections/apostille',
  },
];

export function QuickLinks() {
  return (
    <div className="bg-white py-16 px-4 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-10 overflow-hidden">
          <div className="h-[2px] bg-[#001489]/10 flex-1"></div>
          <h2 className="text-3xl font-black text-[#001489] uppercase tracking-[0.2em]">Quick Links</h2>
          <div className="h-[2px] bg-[#001489]/10 flex-1"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
          {quickLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center group py-3 border-b border-gray-50 hover:border-[#007A33]/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mr-4 group-hover:bg-[#007A33]/10 transition-colors">
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#007A33] transition-colors" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-[#001489] group-hover:text-[#DA291C] transition-colors tracking-tight">
                  {link.title}
                </h3>
                <p className="text-[10px] text-gray-400 font-mono tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                  {link.url.replace(/^https?:\/\//, '')}
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

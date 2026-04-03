import { useState } from 'react';
import { Search, FileText, Calendar, Gavel, ChevronRight } from 'lucide-react';
import type { PageType } from '../App';
import landingHero from '../../assets/landing-hero.png';

interface HomePageProps {
  onNavigate: (page: PageType, filter?: any) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onNavigate('judgments', { query: query.trim() });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-[#001489] text-white h-[700px] flex items-center px-4 overflow-hidden">
        {/* Dynamic Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }}></div>
        </div>

        {/* Background Image with Dark Gradient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${landingHero})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80 backdrop-blur-[1px]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-[42px] font-bold drop-shadow-2xl max-w-5xl mx-auto leading-tight tracking-tight">
              Modernizing the pursuit of justice through{' '}
              <span className="inline-block bg-[#007A33] px-4 py-1.5 italic rounded-xl shadow-lg mt-2 md:mt-0">
                accessible digital transformation
              </span>
            </h1>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-1.5 shadow-2xl flex items-center gap-2 border-2 border-white/20">
              <div className="flex-1 flex items-center gap-3 px-4">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search judgments, court rolls, legislation..."
                  className="w-full py-4 text-gray-900 focus:outline-none text-lg bg-transparent"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <button 
                onClick={handleSearch}
                className="px-8 py-4 bg-[#DA291C] text-white rounded-lg hover:bg-[#b00528] transition-all font-bold shadow-lg hover:scale-105 active:scale-95"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        
        {/* Accent Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#007A33] via-[#DA291C] to-[#007A33]"></div>
      </section>

      {/* Quick Actions */}
      <section className="max-w-7xl mx-auto px-4 -mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickActionCard
            icon={<FileText className="w-8 h-8" />}
            title="Find Judgments"
            description="Search Supreme and High Court judgments by case name, number, or keywords"
            onClick={() => onNavigate('judgments')}
          />
          <QuickActionCard
            icon={<Calendar className="w-8 h-8" />}
            title="Court Rolls"
            description="View upcoming court rolls and hearing schedules"
            onClick={() => onNavigate('court-rolls')}
          />
          <QuickActionCard
            icon={<Gavel className="w-8 h-8" />}
            title="Mediation"
            description="Access mediation services, diaries, and contact information"
            onClick={() => onNavigate('mediation')}
          />
        </div>
      </section>

      {/* Latest Updates */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-[#001489]">Latest Updates</h2>
          <button 
            onClick={() => onNavigate('media')}
            className="text-[#007A33] hover:text-[#001489] font-bold flex items-center gap-2 transition-colors uppercase text-sm tracking-wider"
          >
            View All Updates <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          <NewsCard
            date="March 28, 2026"
            category="Announcement"
            title="Chief Justice's Statement on Digital Transformation"
            excerpt="The Chief Justice announces new initiatives to enhance access to justice through modernization of court systems..."
            onClick={() => onNavigate('media')}
          />
          <NewsCard
            date="March 20, 2026"
            category="Directive"
            title="Updated High Court Practice Directives"
            excerpt="New practice directives for civil and criminal procedures are now in effect..."
            onClick={() => onNavigate('media')}
          />
          <NewsCard
            date="March 15, 2026"
            category="Service"
            title="Mediation Services Expanded Nationwide"
            excerpt="The High Court announces expansion of alternative dispute resolution services..."
            onClick={() => onNavigate('media')}
          />
        </div>
      </section>
    </div>
  );
}

function QuickActionCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all hover:-translate-y-2 group text-left"
    >
      <div className="w-16 h-16 bg-[#007A33]/10 rounded-lg flex items-center justify-center mb-4 text-[#007A33] group-hover:bg-[#007A33] group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[#001489] mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </button>
  );
}

function NewsCard({
  date,
  category,
  title,
  excerpt,
  onClick,
}: {
  date: string;
  category: string;
  title: string;
  excerpt: string;
  onClick: () => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] transition-all flex flex-col h-full border border-gray-100 group">
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#007A33] bg-[#007A33]/10 px-3 py-1 rounded-full border border-[#007A33]/20">
            {category}
          </span>
          <span className="text-xs font-semibold text-gray-400">{date}</span>
        </div>
        <h3 className="text-xl font-semibold text-[#001489] mb-3 group-hover:text-[#DA291C] transition-colors leading-tight">{title}</h3>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-1">{excerpt}</p>
        <button 
          onClick={onClick}
          className="text-[#007A33] hover:text-[#001489] font-bold text-sm flex items-center gap-1 mt-auto w-fit transition-all hover:gap-2"
        >
          Read More <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

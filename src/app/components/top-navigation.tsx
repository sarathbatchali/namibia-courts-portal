import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import type { PageType } from '../App';

interface TopNavigationProps {
  currentPage: PageType;
  onNavigate: (page: PageType, filter?: any) => void;
}

export function TopNavigation({ currentPage, onNavigate }: TopNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="bg-white border-b-4 border-[#001489] shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Coat_of_arms_of_Namibia.svg/1280px-Coat_of_arms_of_Namibia.svg.png"
              alt="Coat of Arms of Namibia"
              className="w-14 h-14 object-contain"
            />
            <div className="text-left">
              <div className="text-xl md:text-2xl font-bold text-[#001489]">Namibia Superior Courts</div>
              <div className="text-xs md:text-sm text-[#007A33]">Supreme Court & High Court</div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavDropdown
              label="DOCUMENT CENTRE"
              items={[
                { label: 'Judgments Library', onClick: () => onNavigate('judgments') },
                { label: 'Court Rolls & Schedules', onClick: () => onNavigate('court-rolls') },
                { label: 'Mediation (High Court)', onClick: () => onNavigate('mediation') },
                { label: 'Forms & Precedents', onClick: () => onNavigate('forms') },
                { label: 'Legislation & Directives', onClick: () => onNavigate('legislation') },
              ]}
              open={openDropdown === 'doc-centre'}
              onToggle={() => setOpenDropdown(openDropdown === 'doc-centre' ? null : 'doc-centre')}
            />

            <NavDropdown
              label="SUPREME COURT"
              items={[
                { label: 'About the Court', onClick: () => onNavigate('about') },
                { label: 'The Chief Justice', onClick: () => onNavigate('about') },
                { label: 'Supreme Court Judges', onClick: () => onNavigate('about') },
                { label: 'History & Mandate', onClick: () => onNavigate('about') },
                { label: 'Case Search (Supreme)', onClick: () => onNavigate('judgments', { court: 'supreme' }) },
              ]}
              open={openDropdown === 'supreme-court'}
              onToggle={() => setOpenDropdown(openDropdown === 'supreme-court' ? null : 'supreme-court')}
            />

            <NavDropdown
              label="HIGH COURT"
              items={[
                { label: 'About the Court', onClick: () => onNavigate('about') },
                { label: 'The Judge President', onClick: () => onNavigate('about') },
                { label: 'High Court Judges', onClick: () => onNavigate('about') },
                { label: 'Divisions & Stations', onClick: () => onNavigate('about') },
                { label: 'Case Search (High)', onClick: () => onNavigate('judgments', { court: 'high' }) },
              ]}
              open={openDropdown === 'high-court'}
              onToggle={() => setOpenDropdown(openDropdown === 'high-court' ? null : 'high-court')}
            />

            <NavDropdown
              label="RESOURCES"
              items={[
                { label: 'Legislation', onClick: () => onNavigate('legislation') },
                { label: 'Court Rules', onClick: () => onNavigate('legislation') },
                { label: 'Standard Forms', onClick: () => onNavigate('forms') },
                { label: 'Library Services', onClick: () => onNavigate('about') },
              ]}
              open={openDropdown === 'resources'}
              onToggle={() => setOpenDropdown(openDropdown === 'resources' ? null : 'resources')}
            />

            <NavDropdown
              label="eJUSTICE"
              items={[
                { label: 'Sign In / Portal', onClick: () => {} },
                { label: 'Attorney Registration', onClick: () => {} },
                { label: 'E-Filing Status', onClick: () => {} },
                { label: 'Admin Dashboard', onClick: () => onNavigate('admin-upload') },
              ]}
              open={openDropdown === 'ejustice'}
              onToggle={() => setOpenDropdown(openDropdown === 'ejustice' ? null : 'ejustice')}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#001489]" /> : <Menu className="w-6 h-6 text-[#001489]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-2">
            <MobileNavItem label="HOME" onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} />
            <div className="border-t border-gray-100 my-2 pt-2 px-4 uppercase text-[10px] font-black text-gray-400">Judicial Hubs</div>
            <MobileNavItem label="Document Centre" onClick={() => { onNavigate('judgments'); setMobileMenuOpen(false); }} />
            <MobileNavItem label="Court Rolls" onClick={() => { onNavigate('court-rolls'); setMobileMenuOpen(false); }} />
            <MobileNavItem label="Legislation & Rules" onClick={() => { onNavigate('legislation'); setMobileMenuOpen(false); }} />
            
            <div className="border-t border-gray-100 my-2 pt-2 px-4 uppercase text-[10px] font-black text-gray-400">Organization</div>
            <MobileNavItem label="Supreme Court" onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }} />
            <MobileNavItem label="High Court" onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }} />
            <MobileNavItem label="Contact Us" onClick={() => { onNavigate('contacts'); setMobileMenuOpen(false); }} />

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm font-semibold text-[#001489] mb-2 px-4">eJustice Portal</p>
              <MobileNavItem label="Sign In" onClick={() => setMobileMenuOpen(false)} />
              <MobileNavItem label="Registration" onClick={() => setMobileMenuOpen(false)} />
              <MobileNavItem label="Dashboard (Admin)" onClick={() => { onNavigate('admin-upload'); setMobileMenuOpen(false); }} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavDropdown({
  label,
  items,
  open,
  onToggle,
}: {
  label: string;
  items: { label: string; onClick: () => void }[];
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="relative"
      onMouseEnter={onToggle}
      onMouseLeave={onToggle}
    >
      <button className="px-4 py-2 text-sm font-semibold text-[#001489] hover:text-[#007A33] hover:bg-gray-50 rounded-t-lg transition-colors flex items-center gap-1">
        {label}
        <ChevronDown className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-0 w-64 bg-white rounded-b-lg shadow-xl py-2 border border-gray-200">
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => { item.onClick(); onToggle(); }}
              className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-[#007A33] hover:text-white transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileNavItem({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-3 text-sm text-[#001489] hover:bg-gray-100 hover:text-[#007A33] rounded-lg transition-colors font-medium"
    >
      {label}
    </button>
  );
}

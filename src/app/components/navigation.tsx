import { useState } from 'react';
import { ChevronDown, Menu, X, Search, User } from 'lucide-react';

interface MenuItemProps {
  label: string;
  children?: {
    title?: string;
    items: { label: string; href: string }[];
  }[];
}

const menuItems: MenuItemProps[] = [
  {
    label: 'Find & Research',
    children: [
      {
        items: [
          { label: 'Court Rolls', href: '/court-rolls' },
          { label: 'Judgments Search', href: '/judgments' },
          { label: 'Case Tracking', href: '/case-tracking' },
        ],
      },
    ],
  },
  {
    label: 'High Court',
    children: [
      {
        title: 'Services',
        items: [
          { label: 'Mediation Diary', href: '/high-court/mediation/diary' },
          { label: 'Mediation Contact Details', href: '/high-court/mediation/contacts' },
          { label: 'Mediation Registers & Reports', href: '/high-court/mediation/registers' },
          { label: 'Mediation Directives', href: '/high-court/mediation/directives' },
          { label: 'Mediation Forms & Precedents', href: '/high-court/mediation/forms' },
        ],
      },
      {
        title: 'Court Rolls',
        items: [
          { label: 'Continuous Rolls', href: '/high-court/rolls/continuous' },
          { label: 'Day Rolls', href: '/high-court/rolls/day' },
          { label: 'Motion Court Rolls', href: '/high-court/rolls/motion' },
          { label: 'Fixed Dates', href: '/high-court/rolls/fixed-dates' },
        ],
      },
      {
        title: 'Judgments',
        items: [
          { label: 'Civil Judgments', href: '/high-court/judgments/civil' },
          { label: 'Criminal Judgments', href: '/high-court/judgments/criminal' },
          { label: 'Labour Judgments', href: '/high-court/judgments/labour' },
          { label: 'Tax Judgments', href: '/high-court/judgments/tax' },
        ],
      },
      {
        title: 'Legal Resources',
        items: [
          { label: 'Acts of Parliament', href: '/high-court/legislation/acts' },
          { label: 'Regulations', href: '/high-court/legislation/regulations' },
          { label: 'Directives', href: '/high-court/legislation/directives' },
          { label: 'Fees & Tariffs', href: '/high-court/legislation/fees' },
        ],
      },
      {
        title: 'Forms & Documents',
        items: [
          { label: 'High Court Rules', href: '/high-court/forms/rules' },
          { label: 'Practice Directives', href: '/high-court/forms/practice-directives' },
          { label: 'Labour Court Rules', href: '/high-court/forms/labour-rules' },
          { label: 'Pro Forma Orders', href: '/high-court/forms/pro-forma' },
          { label: 'General Forms', href: '/high-court/forms/general' },
        ],
      },
      {
        title: 'Information',
        items: [
          { label: 'Important Contacts', href: '/high-court/contacts' },
          { label: 'Registers & Reports', href: '/high-court/registers' },
          { label: 'Media & Speeches', href: '/high-court/media' },
        ],
      },
    ],
  },
  {
    label: 'Supreme Court',
    children: [
      {
        items: [
          { label: 'Judgments', href: '/supreme-court/judgments' },
          { label: 'Court Rolls', href: '/supreme-court/rolls' },
          { label: 'Legislation & Directives', href: '/supreme-court/legislation' },
          { label: 'Media & Speeches', href: '/supreme-court/media' },
        ],
      },
    ],
  },
  {
    label: 'Judiciary',
    children: [
      {
        title: 'Judges',
        items: [
          { label: 'Supreme Court Judges', href: '/judiciary/judges/supreme-court' },
          { label: 'High Court Judges', href: '/judiciary/judges/high-court' },
        ],
      },
      {
        title: 'Legal Framework',
        items: [
          { label: 'Namibian Constitution', href: '/judiciary/constitution' },
          { label: 'Acts of Parliament', href: '/judiciary/acts' },
          { label: 'Regulations', href: '/judiciary/regulations' },
          { label: 'Directives', href: '/judiciary/directives' },
        ],
      },
    ],
  },
  {
    label: 'File & eServices',
    children: [
      {
        items: [
          { label: 'Sign In to eJustice', href: '/ejustice/signin' },
          { label: 'New User Registration', href: '/ejustice/register' },
          { label: 'Forgot Password', href: '/ejustice/forgot-password' },
          { label: 'File a Case', href: '/ejustice/file-case' },
        ],
      },
    ],
  },
  {
    label: 'About the Judiciary',
    children: [
      {
        title: 'Constitutional Background',
        items: [
          { label: 'Independent State & Constitution', href: '/about/independent-state' },
          { label: 'Constitution & Human Rights', href: '/about/human-rights' },
          { label: 'Judicial Power', href: '/about/judicial-power' },
          { label: 'The Judiciary', href: '/about/judiciary' },
          { label: 'Judicial Independence', href: '/about/independence' },
        ],
      },
      {
        title: 'Courts & Justice',
        items: [
          { label: 'Appointment & Removal of Judges', href: '/about/appointment' },
          { label: 'Supreme Court of Namibia', href: '/about/supreme-court' },
          { label: 'High Court of Namibia', href: '/about/high-court' },
          { label: 'Access to Justice', href: '/about/access' },
          { label: 'Fair Trial', href: '/about/fair-trial' },
        ],
      },
    ],
  },
  {
    label: 'Contact & Support',
    children: [
      {
        items: [
          { label: 'Important Contacts', href: '/contact/important' },
          { label: 'Court Registries', href: '/contact/registries' },
          { label: 'IT Support', href: '/contact/support' },
        ],
      },
    ],
  },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="bg-[#1A2F4E] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-white">
              Namibia Superior Courts
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDesktopMenu(item.label)}
                onMouseLeave={() => setOpenDesktopMenu(null)}
              >
                <button className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#2A4F7E] transition-colors flex items-center gap-1">
                  {item.label}
                  {item.children && <ChevronDown className="w-4 h-4" />}
                </button>

                {/* Dropdown */}
                {item.children && openDesktopMenu === item.label && (
                  <div className="absolute left-0 mt-0 w-64 bg-white rounded-md shadow-lg py-2 text-gray-900">
                    {item.children.map((section, idx) => (
                      <div key={idx} className="px-2">
                        {section.title && (
                          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            {section.title}
                          </div>
                        )}
                        {section.items.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            className="block px-3 py-2 rounded-md text-sm hover:bg-gray-100 hover:text-[#D4A02B] transition-colors"
                          >
                            {link.label}
                          </a>
                        ))}
                        {idx < item.children.length - 1 && section.title && (
                          <div className="border-t border-gray-200 my-2" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Utility buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-md hover:bg-[#2A4F7E] transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <a
              href="/ejustice/signin"
              className="flex items-center gap-2 px-4 py-2 bg-[#D4A02B] text-[#1A2F4E] rounded-md hover:bg-[#C68E17] transition-colors font-medium"
            >
              <User className="w-4 h-4" />
              Sign In
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-[#2A4F7E] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Search bar (desktop) */}
        {searchOpen && (
          <div className="hidden lg:block pb-4">
            <input
              type="text"
              placeholder="Search judgments, court rolls, legislation..."
              className="w-full px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D4A02B]"
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1A2F4E] border-t border-[#2A4F7E]">
          <div className="px-4 py-3">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D4A02B]"
            />
          </div>
          <div className="px-2 pt-2 pb-3 space-y-1 max-h-[70vh] overflow-y-auto">
            {menuItems.map((item) => (
              <MobileMenuItem key={item.label} item={item} />
            ))}
            <a
              href="/ejustice/signin"
              className="block px-3 py-3 rounded-md text-base font-medium bg-[#D4A02B] text-[#1A2F4E] hover:bg-[#C68E17] transition-colors text-center mt-4"
            >
              Sign In to eJustice
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function MobileMenuItem({ item }: { item: MenuItemProps }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!item.children) {
    return (
      <a
        href="#"
        className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#2A4F7E] transition-colors"
      >
        {item.label}
      </a>
    );
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium hover:bg-[#2A4F7E] transition-colors"
      >
        {item.label}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="ml-4 mt-1 space-y-1">
          {item.children.map((section, idx) => (
            <div key={idx}>
              {section.title && (
                <div className="px-3 py-1 text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  {section.title}
                </div>
              )}
              {section.items.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-sm hover:bg-[#2A4F7E] hover:text-[#D4A02B] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

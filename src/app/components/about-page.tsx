import { Users, Scale, Briefcase, BookOpen } from 'lucide-react';
import { Breadcrumb } from './breadcrumb';

interface AboutPageProps {
  onNavigate?: (page: any) => void;
}

export function AboutPage({ onNavigate = () => {} }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Page Header */}
      <div className="bg-[#7A1C1C] py-14 shadow-sm relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Breadcrumb 
            onNavigate={onNavigate}
            items={[
              { label: 'Judiciary', page: 'home' },
              { label: 'About', page: 'about' },
            ]}
          />
          <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tight leading-none">About the <span className="text-[#FFC72C]">Judiciary</span></h1>
          <p className="text-white/60 font-medium italic underline decoration-[#FFC72C] decoration-2">
            Constitutional foundation & Judicial structure
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#1A2F4E] mb-4">
            Independent State with a Constitutional Dispensation
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Namibia is an independent, sovereign, secular, democratic, and unitary State founded upon
            the principles of democracy, the rule of law, and justice for all. The Namibian Constitution
            is the supreme law of the land, and any law or conduct inconsistent with it is invalid.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The Constitution enshrines fundamental human rights and freedoms, providing a framework
            for the protection and promotion of the dignity of all people in Namibia.
          </p>
        </div>

        {/* Key Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gradient-to-br from-[#1A2F4E] to-[#2A4F7E] text-white rounded-lg p-8">
            <Scale className="w-12 h-12 mb-4 text-[#D4A02B]" />
            <h3 className="text-2xl font-bold mb-3">Judicial Power</h3>
            <p className="text-gray-200">
              The judicial power is vested in the courts of Namibia, which consist of the Supreme Court,
              the High Court, and Lower Courts. The judiciary is independent and subject only to the
              Constitution and the law.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#D4A02B] to-[#C68E17] text-white rounded-lg p-8">
            <Briefcase className="w-12 h-12 mb-4" />
            <h3 className="text-2xl font-bold mb-3">Judicial Independence</h3>
            <p>
              Judges are independent and subject only to the Constitution and the law. They shall not
              be subject to the control or direction of any person or authority, ensuring impartial
              justice for all.
            </p>
          </div>
        </div>

        {/* Courts Structure */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#1A2F4E] mb-6">Court Structure</h2>

          <div className="space-y-6">
            {/* Supreme Court */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-[#1A2F4E] mb-4">The Supreme Court of Namibia</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">Jurisdiction</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Final court of appeal</li>
                    <li>Constitutional matters</li>
                    <li>Appeals from the High Court</li>
                    <li>Matters of public importance</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Composition</h4>
                  <p className="text-gray-700">
                    The Supreme Court consists of the Chief Justice, Deputy Chief Justice, and such
                    other judges as may be appointed. It sits as an appellate court and may sit in
                    divisions.
                  </p>
                </div>
              </div>
            </div>

            {/* High Court */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-[#1A2F4E] mb-4">The High Court of Namibia</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">Jurisdiction</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Original and appellate jurisdiction</li>
                    <li>Civil and criminal matters</li>
                    <li>Supervisory jurisdiction over lower courts</li>
                    <li>Review of administrative action</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Divisions</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Main Division (Windhoek)</li>
                    <li>Northern Division (Oshakati)</li>
                    <li>Coastal Division (Walvis Bay)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Judges */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#1A2F4E] mb-6">Our Judges</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-[#1A2F4E] rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-[#D4A02B]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A2F4E]">Supreme Court Judges</h3>
                  <p className="text-gray-600">Chief Justice and Judges of Appeal</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                The Supreme Court is presided over by the Chief Justice and consists of experienced
                judges who handle the most significant legal matters in Namibia.
              </p>
              <button className="text-[#D4A02B] hover:text-[#C68E17] font-medium">
                View All Supreme Court Judges →
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-[#D4A02B] rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A2F4E]">High Court Judges</h3>
                  <p className="text-gray-600">Judges across all divisions</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                The High Court judges preside over civil and criminal matters, with expertise across
                various legal disciplines and jurisdictions.
              </p>
              <button className="text-[#D4A02B] hover:text-[#C68E17] font-medium">
                View All High Court Judges →
              </button>
            </div>
          </div>
        </div>

        {/* Access to Justice */}
        <div className="bg-gradient-to-r from-[#1A2F4E] to-[#2A4F7E] text-white rounded-lg p-8">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <BookOpen className="w-16 h-16 text-[#D4A02B]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Access to Justice and Legal Representation</h2>
              <p className="text-gray-200 mb-4 leading-relaxed">
                All persons have the right to a fair trial, which includes the right to legal representation.
                The State has a duty to provide legal aid to those who cannot afford it in serious criminal
                matters and in civil proceedings where substantial injustice would otherwise result.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Right to Fair Trial</h4>
                  <p className="text-sm text-gray-200">
                    Every person is entitled to a fair and public hearing by an independent court
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Legal Representation</h4>
                  <p className="text-sm text-gray-200">
                    Right to be represented by a legal practitioner of choice
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Legal Aid</h4>
                  <p className="text-sm text-gray-200">
                    State-provided legal aid for those who cannot afford representation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

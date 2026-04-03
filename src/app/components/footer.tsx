export function Footer() {
  return (
    <footer className="bg-[#1a2356] text-white mt-16 border-t-[5px] border-[#007A33]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h4 className="font-bold text-lg mb-4">About Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-[#007A33] transition-colors">The Judiciary</a></li>
              <li><a href="#" className="hover:text-[#007A33] transition-colors">Judicial Independence</a></li>
              <li><a href="#" className="hover:text-[#007A33] transition-colors">Supreme Court</a></li>
              <li><a href="#" className="hover:text-[#007A33] transition-colors">High Court</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="https://www.lawsociety.org.na" className="hover:text-[#007A33] transition-colors">Law Society of Namibia</a></li>
              <li><a href="#" className="hover:text-[#007A33] transition-colors">Namibia Society of Advocates</a></li>
              <li><a href="https://www.lac.org.na" className="hover:text-[#007A33] transition-colors">Legal Assistance Centre</a></li>
              <li><a href="http://www.saflii.org" className="hover:text-[#007A33] transition-colors">SAFLII</a></li>
              <li><a href="https://moj.gov.na" className="hover:text-[#007A33] transition-colors">Ministry of Justice</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-[#007A33] transition-colors">Court Forms</a></li>
              <li><a href="#" className="hover:text-[#007A33] transition-colors">Legislation</a></li>
              <li><a href="#" className="hover:text-[#007A33] transition-colors">Practice Directives</a></li>
              <li><a href="#" className="hover:text-[#007A33] transition-colors">Court Rules</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <div className="text-gray-300 space-y-2">
              <p>Windhoek, Namibia</p>
              <p>Phone: +264 61 xxx xxx</p>
              <p>Email: info@judiciary.na</p>
              <p className="pt-2">
                <a href="#" className="text-[#007A33] hover:text-white transition-colors">
                  IT Support
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; 2026 Namibia Superior Courts. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-[#007A33] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#007A33] transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-[#007A33] transition-colors">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from 'next/link'
import { Shield, FileText, Truck, CheckCircle, Phone, Mail, Download } from 'lucide-react'
import { Header, Footer } from '@/components/layout'

export const metadata = {
  title: 'Government Contracting Capabilities | TreeShop',
  description: 'TreeShop LLC provides professional land clearing, site preparation, and emergency debris removal services for federal, state, and local government agencies across Florida.',
}

const naicsCodes = [
  { code: '238910', category: 'Site Preparation', description: 'Land clearing, earthmoving, excavation, grading - PRIMARY CODE' },
  { code: '115310', category: 'Forestry Support', description: 'Forestry mulching, timber stand improvement' },
  { code: '561730', category: 'Landscaping Services', description: 'Tree removal, storm debris cleanup, vegetation management' },
  { code: '562119', category: 'Waste Collection', description: 'Debris hauling, vegetative waste removal' },
  { code: '237110', category: 'Utility Construction', description: 'Drainage systems, water/sewer line site prep' },
  { code: '562910', category: 'Remediation', description: 'Environmental cleanup, contaminated soil work' },
]

const capabilities = [
  {
    title: 'Forestry Mulching & Land Clearing',
    description: 'Grinding trees, brush, and stumps in place. No hauling, no burning permits required. Trees up to 15" diameter processed in single pass.',
  },
  {
    title: 'Site Preparation & Grading',
    description: 'Full site prep from raw land to construction-ready. Clearing, grubbing, rough grading, finish grading, compaction.',
  },
  {
    title: 'Drainage & Earthwork',
    description: 'Drainage solutions, swales, retention pond shaping, culvert installation. Experienced with Florida high water table.',
  },
  {
    title: 'Emergency Debris Removal',
    description: '24-48 hour mobilization for disaster response. FEMA documentation protocols.',
  },
  {
    title: 'ROW Clearing & Maintenance',
    description: 'Pipeline easements, transmission corridors, utility right-of-way vegetation management.',
  },
  {
    title: 'Tree Removal & Processing',
    description: 'Technical felling to large-scale mechanical removal. Process on-site or load and haul.',
  },
]

const certifications = [
  { name: 'Florida LLC', status: 'Active' },
  { name: 'Small Business', status: 'Qualified under all NAICS codes' },
  { name: 'Licensed & Insured', status: 'General liability, workers comp' },
]

export default function GovernmentPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-900">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 text-sm">Government Contracting</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Government Contracting Capabilities
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Professional land clearing, site preparation, and emergency debris removal for federal, state, and local agencies across Florida.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:jeremiah@treeshop.app"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-8 py-4 rounded-lg font-semibold text-lg"
                >
                  Request Capabilities Statement
                </a>
                <a
                  href="tel:3868435266"
                  className="inline-flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 px-8 py-4 rounded-lg font-semibold text-lg"
                >
                  <Phone className="w-5 h-5" /> (386) 843-5266
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Facts */}
        <section className="py-12 bg-gray-950">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">10+</div>
                <div className="text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
                <div className="text-gray-400">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">50mi</div>
                <div className="text-gray-400">Service Radius</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">24-48hr</div>
                <div className="text-gray-400">Emergency Mobilization</div>
              </div>
            </div>
          </div>
        </section>

        {/* NAICS Codes */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">NAICS Codes</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {naicsCodes.map((naics) => (
                <div key={naics.code} className="bg-gray-800 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-600/20 rounded-lg px-4 py-2">
                      <div className="font-mono font-bold text-blue-400">{naics.code}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{naics.category}</h3>
                      <p className="text-gray-400 text-sm">{naics.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-6 text-center">
              Small Business qualified under all codes (size standards: $8M-$19M annual revenue)
            </p>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="py-16 bg-gray-950">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Core Capabilities</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {capabilities.map((cap) => (
                <div key={cap.title} className="bg-gray-800 rounded-xl p-6">
                  <CheckCircle className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="font-semibold mb-2">{cap.title}</h3>
                  <p className="text-gray-400 text-sm">{cap.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Equipment */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Equipment Capabilities</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-xl p-6">
                <Truck className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="font-semibold mb-3">Tracked Equipment</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>• CTL with forestry mulcher</li>
                  <li>• Excavators (13-35 ton)</li>
                  <li>• Dozers for grading</li>
                </ul>
              </div>
              <div className="bg-gray-800 rounded-xl p-6">
                <Truck className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="font-semibold mb-3">Wheeled Equipment</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>• Skid steers with mulcher heads</li>
                  <li>• Motor graders</li>
                  <li>• Knuckleboom grapple trucks</li>
                </ul>
              </div>
              <div className="bg-gray-800 rounded-xl p-6">
                <Truck className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="font-semibold mb-3">Tree Work</h3>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>• Grapple saws & shears</li>
                  <li>• Stump grinders (all sizes)</li>
                  <li>• Chainsaws & climbing gear</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Target Opportunities */}
        <section className="py-16 bg-gray-950">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Southeast US Opportunities</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="font-semibold text-blue-400 mb-3">Hurricane & Disaster Response</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• FEMA debris removal missions</li>
                  <li>• Army Corps emergency contracts</li>
                  <li>• FDOT emergency debris clearing</li>
                  <li>• Pre-positioned municipal contracts</li>
                </ul>
              </div>
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="font-semibold text-blue-400 mb-3">Utility & Infrastructure</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• ROW clearing and maintenance</li>
                  <li>• Pipeline easement clearing</li>
                  <li>• Transmission line corridors</li>
                  <li>• Substation site prep</li>
                </ul>
              </div>
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="font-semibold text-blue-400 mb-3">Military & Federal Facilities</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Base vegetation management</li>
                  <li>• Training area land clearing</li>
                  <li>• National Guard facilities</li>
                  <li>• VA facility site work</li>
                </ul>
              </div>
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="font-semibold text-blue-400 mb-3">Conservation & Land Management</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Invasive species removal</li>
                  <li>• Prescribed fire prep (firebreaks)</li>
                  <li>• Wildlife habitat restoration</li>
                  <li>• Wetland mitigation site prep</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Company Data */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-gray-800 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Company Information</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4">Corporate Data</h3>
                  <div className="space-y-3 text-gray-300">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Business Name:</span>
                      <span>TreeShop LLC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Business Type:</span>
                      <span>Small Business (FL LLC)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Founded:</span>
                      <span>2015</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Experience:</span>
                      <span>10+ years</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Mail className="w-4 h-4 text-blue-400" />
                      <a href="mailto:jeremiah@treeshop.app" className="hover:text-blue-400">
                        jeremiah@treeshop.app
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <Phone className="w-4 h-4 text-blue-400" />
                      <a href="tel:3868435266" className="hover:text-blue-400">
                        (386) 843-5266
                      </a>
                    </div>
                    <div className="text-gray-400 text-sm mt-4">
                      <strong>Service Area:</strong><br />
                      Primary: Volusia, Seminole, Orange, Brevard, Lake, Osceola, Flagler Counties<br />
                      Extended: Statewide Florida for emergency response
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 bg-gray-950">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Certifications & Registrations</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {certifications.map((cert) => (
                <div key={cert.name} className="bg-gray-800 rounded-xl p-6 flex items-center gap-4">
                  <CheckCircle className="w-8 h-8 text-blue-400" />
                  <div>
                    <div className="font-semibold">{cert.name}</div>
                    <div className="text-gray-400 text-sm">{cert.status}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-6 text-center">
              SAM.gov registration in progress. UEI and CAGE code pending.
            </p>
          </div>
        </section>

        {/* Past Performance */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Past Performance</h2>
            <div className="bg-gray-800 rounded-xl p-8">
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  500+ completed land clearing projects
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  Residential, commercial, and agricultural clients
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  Projects ranging from 0.5 to 50+ acres
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  Multi-crew coordination on large sites
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400" />
                  Emergency response capability
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Differentiators */}
        <section className="py-16 bg-gray-950">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Differentiators</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="font-semibold mb-3">Rapid Mobilization</h3>
                <p className="text-gray-400 text-sm">
                  24-48 hour response for emergency operations. Equipment and crews available for disaster debris removal.
                </p>
              </div>
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="font-semibold mb-3">Scalable Workforce</h3>
                <p className="text-gray-400 text-sm">
                  Ability to bring additional crews and equipment for large-scale projects. Surge capacity available.
                </p>
              </div>
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="font-semibold mb-3">Systematic Documentation</h3>
                <p className="text-gray-400 text-sm">
                  Daily production tracking, photo/video documentation, GPS mapping of completed areas.
                </p>
              </div>
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="font-semibold mb-3">Owner-Operated</h3>
                <p className="text-gray-400 text-sm">
                  Direct accountability. Owner involvement on all major projects.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-blue-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Discuss Your Project?</h2>
            <p className="text-blue-100 mb-8">
              Request our full capabilities statement or schedule a site visit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:jeremiah@treeshop.app"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg"
              >
                <Mail className="w-5 h-5" />
                Request Capabilities Statement
              </a>
              <a
                href="tel:3868435266"
                className="inline-flex items-center justify-center gap-2 border-2 border-white hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold text-lg"
              >
                <Phone className="w-5 h-5" />
                Call (386) 843-5266
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

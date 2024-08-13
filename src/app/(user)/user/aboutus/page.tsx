import Image from "next/image";

export default function AboutUsPage() {
  return (
    <div className="container font-sans mb-8">
      <h1 className="font-bold text-[8mm] text-slate-800">About Us</h1>
      <div className="contents">
        <h2 className="text-[7mm] text-center font-bold">Office of the Building Official</h2>
        <h3 className="text-[6mm] text-center text-slate-800">Municipality of Nasipit</h3>
        <div className="max-w-[300mm] mx-auto space-y-2 leading-loose px-8 py-4 border border-slate-300 rounded-lg mt-8 bg-green-400/20 shadow-lg">
          <span className="text-[6mm] font-bold">Vision</span>
          <p>
            Office of the Building Official is the leading regulatory authority to enforce safe and sustainable structures
            compliant with quality standards of construction and promote a built environment for a livable Municipality of
            Nasipit.
          </p>
        </div>
        <div className="max-w-[300mm] mx-auto space-y-2 leading-loose px-8 py-4 border border-slate-300 rounded-lg mt-8 bg-green-400/20 shadow-lg">
          <span className="text-[6mm] font-bold">Mission</span>
          <p>
            The Office of the Building Official commits to fulfill the following mission:
            Ensure the safety and compliance of buildings and structures within the Municipality of Nasipit by
            providing accessible, streamlined, and quality services.
            Enforce compliance with the provisions of the National Building Code of the Philippines and other
            related laws and issuances.
          </p>
        </div>
        <div className="max-w-[300mm] mx-auto space-y-2 leading-loose px-8 py-4 border border-slate-300 rounded-lg mt-8 bg-green-400/20 shadow-lg">
          <span className="text-[6mm] font-bold">Organizational Chart</span>
          <Image src={'/organizational-structure.webp'} alt='Organizational Chart' width={3059} height={2481} className="w-full shadow rounded border border-slate-300" priority={true} />
        </div>
        <div className="max-w-[300mm] mx-auto space-y-2 leading-loose px-8 py-4 border border-slate-300 rounded-lg mt-8 bg-green-400/20 shadow-lg">
          <span className="text-[6mm] font-bold">Functional Structure</span>
          <Image src={'/functional-structure.webp'} alt='Functional Structure' width={3059} height={2481} className="w-full shadow rounded border border-slate-300" priority={true} />
        </div>
      </div>
    </div>
  )
}
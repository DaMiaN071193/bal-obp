import FooterGlobal from '@/components/footer';
import Image from 'next/image';
import NextLink from 'next/link';
import { FooterContact } from './footer-contact';

export default function Footer() {
  return (
    <footer className="flex flex-col w-full" id="footer">
      <div className="flex max-md:flex-col flex-wrap justify-between gap-5 border-t-2 sm:px-16 px-6 pt-10 pb-5">
        <div className="flex flex-col justify-start items-start gap-2">
          <Image alt="Logo" priority={true} width="60" height="60" className="object-contain text-transparent" src="/paboni.svg" />
          <p className="text-base">
            <span className="font-bold">Address</span><br />
            Roxas Street, Municipal Hall, Engineering Office, Brgy. 4 (Poblacion) <br />
            Nasipit, Agusan del Norte, Philippines 8602
          </p>
        </div>
        <div className="flex-1 w-full flex md:justify-end flex-wrap max-md:mt-10 gap-20 ">
          <div className="flex flex-col gap-2 text-base min-w-[170px] ">
            <FooterContact />
          </div>
          <div className="flex flex-col gap-2 text-base min-w-[170px]">
            <h3 className="font-bold">Log In As</h3>
            <NextLink className="hover:text-blue-400 text-lime-900 font-sans" href="/admin">Admin</NextLink>
            <NextLink className="hover:text-blue-400 text-lime-900 font-sans" href="/obo">OBO</NextLink>
            <NextLink className="hover:text-blue-400 text-lime-900 font-sans" href="/bfp">BFP</NextLink>
            <NextLink className="hover:text-blue-400 text-lime-900 font-sans" href="/mpdc">MPDC</NextLink>
          </div>
        </div>
      </div>
      <FooterGlobal />
    </footer>
  )
}
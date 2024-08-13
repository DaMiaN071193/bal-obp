import Image from "next/image";
import NextLink from 'next/link';

export default function HeaderNav() {
  return (
    <header>
      <nav className="relative bg-transparent w-full">
        <div className="flex flex-wrap items-center justify-between mx-auto px-10 py-2">
          <div className='w-[280px] py-2'>
            <NextLink href="/user" prefetch={false}>
              <div className="flex justify-start flex-nowrap min-h-[48px] space-x-0.5">
                <Image alt="Logo" width="60" height="60" priority={true} className="h-full object-contain text-transparent" src="/mon.svg" />
                <div className="whitespace-nowrap min-h-full justify-center flex flex-col leading-tight text-lime-900">
                  <div className="font-bold text-[11px]">MUNICIPALITY OF NASIPIT</div>
                  <div className="font-semibold text-[10px]">OFFICE OF THE BUILDING OFFICIAL</div>
                </div>
              </div>
            </NextLink>
          </div>
        </div>
      </nav>
    </header>
  )
}
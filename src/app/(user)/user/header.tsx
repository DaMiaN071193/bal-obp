import Image from 'next/image';
import NextLink from 'next/link';
import AvatarNav from './avatar-nav';
import HeaderNavMenuOverlay from './header-nav-menu-overlay';
import LoginButton from './login-btn';
import NotificationNav from './notification';
import SignUpBtnNav from './signup-btn-nav';

export default function Header() {
  return (
    <header className="sticky top-0 left-0 right-0 z-10">
      <nav className="relative w-full bg-green-800 bg-opacity-90 shadow-lg shadow-green-200">
        <div className="flex flex-wrap items-center justify-between mx-auto px-10 py-2">
          <div className='hidden lg:block w-[280px] py-2'>
            <NextLink href="/user" prefetch={false}>
              <div className="flex justify-start flex-nowrap min-h-[48px] space-x-0.5">
                <Image alt="Logo" width="60" height="60" priority={true} className="h-full object-contain text-transparent" src="/mon.svg" />
                <div className="whitespace-nowrap min-h-full justify-center flex flex-col leading-tight text-lime-50">
                  <div className="font-bold text-[11px]">MUNICIPALITY OF NASIPIT</div>
                  <div className="font-semibold text-[10px]">OFFICE OF THE BUILDING OFFICIAL</div>
                </div>
              </div>
            </NextLink>
          </div>
          <div className="lg:hidden">
            <NextLink href="/user" prefetch={false}>
              <div className="flex flex-col justify-start items-center text-lime-50">
                <Image alt="Logo" width="60" height="60" priority={true} className="min-h-[50px] object-contain text-transparent" src="/mon.svg" />
                <div className="font-bold text-[6px]">MUNICIPALITY OF NASIPIT</div>
                <div className="font-semibold text-[4px]">OFFICE OF THE BUILDING OFFICIAL</div>
              </div>
            </NextLink>
          </div>
          <HeaderNavMenuOverlay />
          <div className="hidden md:flex md:w-auto md:justify-end md:flex-grow md:mr-8" id="navbar">
            <ul className="flex p-4 md:p-0 md:flex-row md:space-x-2 lg:space-x-8 mt-0">
              <li className="p-3">
                <NextLink className="text-xl font-semibold md:p-0 text-white hover:text-blue-400" href="/user">Home</NextLink>
              </li>
              <li className="p-3">
                <NextLink className="text-xl font-semibold md:p-0 text-white hover:text-blue-400" href="/user/aboutus">About</NextLink>
              </li>
              <li className="p-3">
                <NextLink className="text-xl font-semibold md:p-0 text-white hover:text-blue-400" href="#footer">Contact</NextLink>
              </li>
              <LoginButton />
              <SignUpBtnNav />
            </ul>
          </div>
          <NotificationNav />
          <AvatarNav />
        </div>
      </nav>
    </header>
  )
}
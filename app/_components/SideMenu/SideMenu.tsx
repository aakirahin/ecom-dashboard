import Image from 'next/image';
import MenuItems from './MenuItems';
import GitHubCard from './GitHubCard';

type Props = {}

const SideMenu = (props: Props) => {
  return (
    <>
      <div className='flex lg:hidden w-full items-center justify-between px-4 py-3 bg-white border-b border-gray-200 fixed top-0 left-0 z-40'>
        <a 
          href={'/'} 
          className='flex gap-2 hover:opacity-85 transition-opacity duration-300 items-center'
        >
          <Image
            src={'/logo.svg'}
            alt="Logo"
            width={24}
            height={24}
          />
        </a>
      </div>

      <div className='hidden lg:flex flex-col bg-white p-6 border-r border-gray-200 transition-all duration-300 w-64 shrink-0 justify-between'>
        <div className='flex flex-col gap-6'>
          <a 
            href={'/'} 
            className='flex gap-2.5 hover:opacity-85 transition-opacity duration-300 items-center'
          >
            <Image
              src={'/logo.svg'}
              alt="Logo"
              width={28}
              height={28}
            />
            <span className='text-xl text-[#626366] font-sofia font-bold tracking-widest'>
              ENIGMA
            </span>
          </a>
          <MenuItems/>
        </div>
        <GitHubCard/>
      </div>

      <div className='lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#2081FF] border border-[#4c97ff] rounded-xl px-2 py-1.5 shadow-lg'>
        <MenuItems mobile/>
      </div>
    </>
  )
}

export default SideMenu
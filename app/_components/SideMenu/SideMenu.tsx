import Image from 'next/image';
import Link from 'next/link';
import MenuItems from './MenuItems';
import GitHubCard from './GitHubCard';

type Props = {}

const SideMenu = (props: Props) => {
  return (
    <div className='flex flex-col bg-white p-6 border-r border-gray-200 transition-all duration-300 w-64 justify-between sticky'>
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
  )
}

export default SideMenu
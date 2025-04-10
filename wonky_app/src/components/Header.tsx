const Header: React.FC = () => {
    return (
        <nav className='w-[100%] h-[10vh] border-b-2 border-gray-600 !py-4 px-5 flex place-items-center justify-between'>
            <a href="/start"><i className='bx bx-chevron-left text-4xl text-white'></i></a>
            <img src='../assets/logo.png' alt='avatar' className='w-[50px] rounded-full' />
        </nav>
    )
}

export default Header;
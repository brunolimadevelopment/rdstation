import Logo from '@/app/_components/logo'
const Header = () => {
    return ( 
        <header className="py-6 sm:px-20 bg-white">
            <div className="container">
                <div className="justify-between items-center flex flex-row">
                    <Logo width={147} height={36} text={true} />
                    <p className="font-darker font-bold text-base sm:text-2xl ">Gerador de Cartão de Visita</p>
                </div>
            </div>
        </header>
     );
}
 
export default Header;
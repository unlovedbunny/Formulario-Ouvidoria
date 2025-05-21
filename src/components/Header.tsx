const Header: React.FC = () => {
    return (
        <header style={{ backgroundColor: '#0A8599' }} className="text-white py-12 px-4 pb-20">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-3xl font-bold mb-2">OUVIDORIA ONLINE</h1>
                <p className="text-lg mb-4">Escreva sua dúvida e aguarde o contato de um de nossos atendentes</p>
                <div className="flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span>Tempo médio de resposta: 5hrs</span>
                </div>
            </div>
        </header>
    );
};

export default Header;

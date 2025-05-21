import ContactForm from '@components/ContactForm';
import Header from '@components/Header';

function App() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Header */}
            <Header/>

            {/* Main Content */}
            <main className="container mx-auto max-w-5xl px-4 -mt-10 mb-10 flex-grow">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-3/5 p-6">
                            <ContactForm />
                        </div>
                        <div className="md:w-2/5 bg-gray-100">
                            <img
                                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                alt="Atendentes da ouvidoria"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer style={{ backgroundColor: '#0A8599' }} className="py-8">
                <div className="container mx-auto">{/* Footer content can be added here if needed */}</div>
            </footer>
        </div>
    );
}

export default App;

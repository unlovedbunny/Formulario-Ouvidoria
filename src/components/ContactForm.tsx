import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Definindo o schema de validação com Zod
const formSchema = z.object({
    nome: z.string().min(1, 'Nome completo é obrigatório'),
    email: z.string().min(1, 'E-mail é obrigatório').email('Formato de e-mail inválido'),
    telefone: z.string().optional(),
    mensagem: z.string().min(20, 'A mensagem deve ter no mínimo 20 caracteres'),
});

// Tipagem baseada no schema
type FormData = z.infer<typeof formSchema>;

// Função para formatar o telefone
const formatPhoneNumber = (value: string) => {
    if (!value) return value;

    // Remove todos os caracteres não numéricos
    const phoneNumber = value.replace(/[^\d]/g, '');

    // Formato: (XX) XXXXX-XXXX
    if (phoneNumber.length <= 2) {
        return phoneNumber.replace(/(\d{1,2})/, '($1');
    } else if (phoneNumber.length <= 7) {
        return phoneNumber.replace(/(\d{2})(\d{1,5})/, '($1) $2');
    } else if (phoneNumber.length <= 11) {
        return phoneNumber.replace(/(\d{2})(\d{5})(\d{1,4})/, '($1) $2-$3');
    } else {
        // Limita ao tamanho máximo
        return phoneNumber.slice(0, 11).replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
};

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [phoneValue, setPhoneValue] = useState('');

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid, isDirty },
        reset,
        trigger,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: 'onBlur', // Valida quando o campo perde o foco
        criteriaMode: 'all', // Mostra todos os erros de uma vez
        defaultValues: {
            nome: '',
            email: '',
            telefone: '',
            mensagem: '',
        },
    });

    // Atualiza o valor do telefone no hook form sempre que phoneValue mudar
    useEffect(() => {
        setValue('telefone', phoneValue);
    }, [phoneValue, setValue]);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatPhoneNumber(e.target.value);
        setPhoneValue(formattedValue);
    };

    // Quando o campo de telefone perde o foco, disparamos a validação
    const handlePhoneBlur = () => {
        trigger('telefone');
    };

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);

        // Simulando um tempo de resposta da API
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Exibe os dados enviados
        alert(
            `Dados enviados:\n\nNome: ${data.nome}\nE-mail: ${data.email}\nTelefone: ${
                data.telefone || 'Não informado'
            }\nMensagem: ${data.mensagem}`,
        );

        setIsSubmitting(false);
        setPhoneValue('');
        reset();
    };

    // O botão deve ser habilitado apenas quando o formulário for válido E estiver "sujo" (modificado)
    const isButtonDisabled = !isValid || !isDirty || isSubmitting;

    return (
        <div className="bg-white p-6 w-full">
            <h2 className="text-xl font-semibold mb-8 text-gray-700 border-b pb-3">ENTRE EM CONTATO</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                    <div className="flex items-center border-b border-gray-300 py-2 focus-within:border-[#0A8599]">
                        <span className="text-gray-500 mr-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                        <input
                            {...register('nome')}
                            type="text"
                            placeholder="Nome completo"
                            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        />
                    </div>
                    <div className="min-h-5 mt-1">
                        {errors.nome && <p className="text-red-500 text-xs">{errors.nome.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <div className="flex items-center border-b border-gray-300 py-2 focus-within:border-[#0A8599]">
                            <span className="text-gray-500 mr-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                            </span>
                            <input
                                type="tel"
                                placeholder="Telefone"
                                value={phoneValue}
                                onChange={handlePhoneChange}
                                onBlur={handlePhoneBlur}
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            />
                        </div>
                        <div className="min-h-5 mt-1">
                            {errors.telefone && <p className="text-red-500 text-xs">{errors.telefone.message}</p>}
                        </div>
                    </div>

                    <div className="md:col-span-1">
                        <div className="flex items-center border-b border-gray-300 py-2 focus-within:border-[#0A8599]">
                            <span className="text-gray-500 mr-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </span>
                            <input
                                {...register('email')}
                                type="email"
                                placeholder="Email"
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                            />
                        </div>
                        <div className="min-h-5 mt-1">
                            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <div className="flex items-center border-b border-gray-300 py-2 focus-within:border-[#0A8599]">
                        <span className="text-gray-500 mr-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </span>
                        <textarea
                            {...register('mensagem')}
                            placeholder="Mensagem"
                            rows={3}
                            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none resize-none"
                        />
                    </div>
                    <div className="min-h-5 mt-1">
                        {errors.mensagem && <p className="text-red-500 text-xs">{errors.mensagem.message}</p>}
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={isButtonDisabled}
                        style={{ backgroundColor: isButtonDisabled ? '#97c7d0' : '#0A8599' }}
                        className={`text-white font-bold py-3 px-4 rounded w-full transition duration-300 ease-in-out flex justify-center items-center uppercase text-sm ${
                            isButtonDisabled ? 'cursor-not-allowed' : 'hover:opacity-90 cursor-pointer'
                        }`}
                    >
                        {isSubmitting ? (
                            <>
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Enviando...
                            </>
                        ) : (
                            'Enviar'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
     
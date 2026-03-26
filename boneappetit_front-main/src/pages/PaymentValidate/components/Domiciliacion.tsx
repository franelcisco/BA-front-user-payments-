import { useCallback, useEffect, useState } from 'react';
import {
    Button,
    Card,
    Checkbox,
    Label,
    Select,
    Spinner,
    TextInput,
} from 'flowbite-react';
import {
    HiArrowLeft,
    HiCheck,
    HiLockClosed,
    HiShieldCheck,
} from 'react-icons/hi';
import { domiciliacionBanks } from '@/utils/constants';
import type { OrderDto } from '@/types/shopify';

interface DomiciliacionProps {
    order: OrderDto;
    onBack: () => void;
    onComplete: () => void;
}

interface DomiciliacionData {
    banco: string;
    ci: string;
    telPrefix: string;
    telBank: string;
    telConfirmPrefix: string;
    telConfirm: string;
}

const PHONE_PREFIXES = ['0412', '0414', '0424', '0416', '0426'];

/* ─── STEPPER ─── */
function StepIndicator({
    current,
    labels,
}: {
    current: number;
    labels: string[];
}) {
    return (
        <div className="flex items-center w-full px-2 mb-6">
            {labels.map((label, i) => (
                <div
                    key={i}
                    className="flex-1 flex flex-col items-center"
                >
                    <div className="flex items-center w-full">
                        {i > 0 && (
                            <div
                                className={`flex-1 h-0.5 transition-colors duration-300 ${
                                    i <= current
                                        ? 'bg-amber-400'
                                        : 'bg-gray-200'
                                }`}
                            />
                        )}
                        <div
                            className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                                i < current
                                    ? 'bg-amber-400 text-white'
                                    : i === current
                                      ? 'bg-gray-800 text-white ring-4 ring-amber-400/30'
                                      : 'bg-gray-200 text-gray-400'
                            }`}
                        >
                            {i < current ? (
                                <HiCheck className="w-4 h-4" />
                            ) : (
                                i + 1
                            )}
                        </div>
                        {i < labels.length - 1 && (
                            <div
                                className={`flex-1 h-0.5 transition-colors duration-300 ${
                                    i < current
                                        ? 'bg-amber-400'
                                        : 'bg-gray-200'
                                }`}
                            />
                        )}
                    </div>
                    <span
                        className={`text-xs mt-1 ${
                            i <= current
                                ? 'text-gray-800 font-semibold'
                                : 'text-gray-400'
                        }`}
                    >
                        {label}
                    </span>
                </div>
            ))}
        </div>
    );
}

/* ─── STEP 0: BANK SELECTION ─── */
function StepBank({
    data,
    setData,
    onNext,
}: {
    data: DomiciliacionData;
    setData: (d: DomiciliacionData) => void;
    onNext: () => void;
}) {
    const [search, setSearch] = useState('');
    const filtered = domiciliacionBanks.filter((b) =>
        b.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="animate-fade-in">
            <h2 className="text-xl font-bold text-gray-800 mb-1">
                Domicilia tu cuenta bancaria
            </h2>
            <p className="text-sm text-gray-500 mb-4">
                Activa el pago automático de tu suscripción
            </p>

            <div className="flex items-center gap-2 bg-green-50 rounded-lg p-3 mb-4">
                <HiShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-xs text-green-700 font-medium">
                    Tu información está protegida con encriptación
                </span>
            </div>

            <div className="mb-3">
                <Label htmlFor="bankSearch">Selecciona tu banco</Label>
                <TextInput
                    id="bankSearch"
                    type="text"
                    placeholder="Busca tu banco..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="mt-1"
                />
            </div>

            <div className="grid grid-cols-3 gap-2 mb-5">
                {filtered.map((b) => (
                    <button
                        key={b.name}
                        type="button"
                        onClick={() => setData({ ...data, banco: b.name })}
                        className={`p-3 rounded-xl border-2 cursor-pointer flex flex-col items-center gap-2 transition-all ${
                            data.banco === b.name
                                ? 'border-amber-400 bg-amber-50'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                    >
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold"
                            style={{ backgroundColor: b.color }}
                        >
                            {b.code}
                        </div>
                        <span className="text-xs font-semibold text-gray-800">
                            {b.name}
                        </span>
                    </button>
                ))}
            </div>

            {data.banco && (
                <div className="space-y-3 animate-fade-in">
                    <div>
                        <Label htmlFor="ci">
                            Cédula del titular de la cuenta
                        </Label>
                        <TextInput
                            id="ci"
                            type="text"
                            placeholder="V-12345678"
                            value={data.ci}
                            onChange={(e) =>
                                setData({ ...data, ci: e.target.value })
                            }
                            className="mt-1"
                        />
                    </div>

                    <div>
                        <Label>Teléfono afiliado a la cuenta</Label>
                        <div className="grid grid-cols-[90px_1fr] gap-2 mt-1">
                            <Select
                                value={data.telPrefix}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        telPrefix: e.target.value,
                                    })
                                }
                            >
                                {PHONE_PREFIXES.map((p) => (
                                    <option key={p} value={p}>
                                        {p}
                                    </option>
                                ))}
                            </Select>
                            <TextInput
                                type="text"
                                placeholder="1234567"
                                value={data.telBank}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        telBank: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <Label>Confirmar teléfono</Label>
                        <div className="grid grid-cols-[90px_1fr] gap-2 mt-1">
                            <Select
                                value={data.telConfirmPrefix}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        telConfirmPrefix: e.target.value,
                                    })
                                }
                            >
                                {PHONE_PREFIXES.map((p) => (
                                    <option key={p} value={p}>
                                        {p}
                                    </option>
                                ))}
                            </Select>
                            <TextInput
                                type="text"
                                placeholder="1234567"
                                value={data.telConfirm}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        telConfirm: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>
            )}

            <Button
                className="w-full mt-4"
                onClick={onNext}
                disabled={!data.banco}
            >
                Continuar →
            </Button>
        </div>
    );
}

/* ─── STEP 1: AUTHORIZATION ─── */
function StepAuth({
    onNext,
    onBack,
}: {
    onNext: () => void;
    onBack: () => void;
}) {
    const [c1, setC1] = useState(false);
    const [c2, setC2] = useState(false);

    return (
        <div className="animate-fade-in">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
                Autoriza tu domiciliación
            </h2>
            <p className="text-sm text-gray-500 text-center mb-1">
                Enviaremos una solicitud a tu banco. Luego la apruebas desde tu
                banca en línea.
            </p>
            <p className="text-sm text-amber-500 font-semibold text-center mb-5">
                Es rápido y seguro.
            </p>

            <div className="bg-amber-50 rounded-xl p-4 mb-5 border border-amber-200/40">
                <div className="flex items-center gap-2 mb-3">
                    <HiLockClosed className="w-4 h-4 text-gray-800" />
                    <span className="text-sm font-bold text-gray-800">
                        Tu cuenta está protegida
                    </span>
                </div>
                {[
                    'Solo cobramos el monto exacto de tu plan',
                    'Puedes cancelar la domiciliación cuando quieras',
                    'Haremos un cargo de Bs. 1 de validación que será devuelto',
                ].map((t, i) => (
                    <div key={i} className="flex items-start gap-2 mb-2">
                        <HiCheck className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-600">{t}</span>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-4 mb-5">
                <div className="flex items-start gap-3">
                    <Checkbox
                        id="terms1"
                        checked={c1}
                        onChange={() => setC1(!c1)}
                    />
                    <Label htmlFor="terms1" className="text-sm text-gray-600">
                        He leído y acepto la{' '}
                        <span className="text-amber-500 font-semibold cursor-pointer">
                            Autorización de Domiciliación
                        </span>{' '}
                        de Bone Appetit
                    </Label>
                </div>
                <div className="flex items-start gap-3">
                    <Checkbox
                        id="terms2"
                        checked={c2}
                        onChange={() => setC2(!c2)}
                    />
                    <Label htmlFor="terms2" className="text-sm text-gray-600">
                        He leído y acepto los{' '}
                        <span className="text-amber-500 font-semibold cursor-pointer">
                            Términos y Condiciones
                        </span>
                    </Label>
                </div>
            </div>

            <div className="flex gap-3">
                <Button color="light" onClick={onBack}>
                    <HiArrowLeft className="mr-2 h-4 w-4" /> Atrás
                </Button>
                <Button
                    className="flex-1"
                    onClick={onNext}
                    disabled={!c1 || !c2}
                >
                    Domiciliar cuenta →
                </Button>
            </div>
        </div>
    );
}

/* ─── STEP 2: PROCESSING + BANK APPROVAL ─── */
function StepProcess({ onNext }: { onNext: () => void }) {
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        const t = setTimeout(() => setPhase(1), 2500);
        return () => clearTimeout(t);
    }, []);

    if (phase === 0) {
        return (
            <div className="animate-fade-in text-center py-12">
                <div className="flex justify-center mb-4">
                    <Spinner size="lg" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                    Enviando solicitud a tu banco...
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                    No cierres esta ventana
                </p>
            </div>
        );
    }

    return (
        <div className="animate-fade-in text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-1">
                ¡Solicitud enviada!
            </h3>
            <p className="text-base font-bold text-gray-800 mb-1">
                Apruébala en tu banca en línea
            </p>
            <p className="text-sm text-gray-500 mb-1">
                Entra a tu banco, aprueba la solicitud y vuelve aquí.
            </p>
            <p className="text-xs text-amber-500 mb-5">
                Debitaremos VEF 1,00 de validación (te lo devolvemos de
                inmediato).
            </p>

            <TutorialAccordion />

            <Button className="w-full mt-5" onClick={onNext}>
                ✓ Ya la aprobé
            </Button>
            <button
                type="button"
                className="w-full mt-2 text-sm text-gray-400 py-2 cursor-pointer hover:text-gray-600"
            >
                No sé cómo hacerlo
            </button>
        </div>
    );
}

function TutorialAccordion() {
    const [open, setOpen] = useState(false);
    const steps = [
        {
            n: 1,
            t: 'Abre el menú de tu banca en línea',
            d: 'Ingresa a la web o app de tu banco.',
        },
        {
            n: 2,
            t: 'Ve a Pagos → Operaciones Inmediatas',
            d: 'Dentro del menú, selecciona Pagos.',
        },
        {
            n: 3,
            t: 'Busca la solicitud de Bone Appetit',
            d: 'Verás una solicitud pendiente con nuestro RIF.',
        },
        {
            n: 4,
            t: 'Haz clic en Acciones → Habilitar',
            d: 'Aprueba la domiciliación y listo.',
        },
    ];

    return (
        <div className="bg-gray-50 rounded-xl overflow-hidden text-left">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="w-full px-4 py-3 bg-transparent border-none cursor-pointer flex items-center justify-between text-sm font-bold text-gray-800"
            >
                <span>Ver pasos para aprobar en tu banco</span>
                <span
                    className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                >
                    ▼
                </span>
            </button>
            {open && (
                <div className="px-4 pb-4 animate-fade-in">
                    {steps.map((s) => (
                        <div key={s.n} className="flex gap-3 mb-3">
                            <div className="w-7 h-7 rounded-full bg-amber-400 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                                {s.n}
                            </div>
                            <div>
                                <div className="text-sm font-bold text-gray-800">
                                    {s.t}
                                </div>
                                <div className="text-xs text-gray-500 mt-0.5">
                                    {s.d}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

/* ─── STEP 3: VALIDATING ─── */
function StepValidating({ onNext }: { onNext: () => void }) {
    const [p, setP] = useState(0);
    const msgs = [
        'Validando tu afiliación',
        'Confirmando con tu banco',
        'Casi listo...',
    ];
    const subs = [
        'Debitaremos Bs. 1 que te devolvemos',
        'Esperando respuesta del banco',
        'Gracias por tu paciencia',
    ];

    useEffect(() => {
        const t1 = setTimeout(() => setP(1), 2000);
        const t2 = setTimeout(() => setP(2), 4000);
        const t3 = setTimeout(onNext, 5500);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [onNext]);

    return (
        <div className="animate-fade-in text-center py-12">
            <div className="flex justify-center mb-4">
                <Spinner size="lg" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">{msgs[p]}</h3>
            <p className="text-sm text-gray-500 mt-2">{subs[p]}</p>
            <p className="text-xs text-amber-500 font-semibold mt-4">
                No cierres esta ventana
            </p>
            <div className="flex justify-center gap-2 mt-5">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                            i <= p ? 'bg-amber-400' : 'bg-gray-200'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}

/* ─── STEP 4: SUCCESS ─── */
function StepSuccess({
    data,
    onComplete,
}: {
    data: DomiciliacionData;
    onComplete: () => void;
}) {
    return (
        <div className="animate-fade-in text-center">
            <div className="flex justify-center mb-4">
                <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl">
                        🦴
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shadow-md">
                        <HiCheck className="w-4 h-4 text-white" />
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
                ¡Domiciliación activada!
            </h2>
            <p className="text-sm text-gray-600 mt-2">
                Tu cuenta bancaria ha sido afiliada exitosamente.
            </p>
            <p className="text-base text-amber-500 font-bold mt-1">
                A partir de ahora, cobramos automáticamente.
            </p>
            <p className="text-xs text-gray-400 mt-1">
                Recibirás un correo con los detalles de tu autorización.
            </p>

            <div className="bg-amber-50 rounded-xl p-5 mt-6 text-left border border-amber-200/40">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="text-xs text-gray-400 mb-1">Banco</div>
                        <div className="text-sm font-bold text-gray-800">
                            🏦 {data.banco}
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-400 mb-1">
                            Teléfono
                        </div>
                        <div className="text-sm font-bold text-gray-800">
                            ****{data.telBank.slice(-4)}
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-400 mb-1">
                            Frecuencia
                        </div>
                        <div className="text-sm font-bold text-amber-500">
                            Mensual
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-gray-400 mb-1">
                            Próximo cobro
                        </div>
                        <div className="text-sm font-bold text-gray-800">
                            En tu fecha de corte
                        </div>
                    </div>
                </div>
            </div>

            <Button
                color="warning"
                className="w-full mt-5"
                onClick={onComplete}
            >
                Volver a Mi Pedido
            </Button>
        </div>
    );
}

/* ─── MAIN DOMICILIACIÓN COMPONENT ─── */
export const Domiciliacion = ({
    order,
    onBack,
    onComplete,
}: DomiciliacionProps) => {
    const [step, setStep] = useState(0);
    const [data, setData] = useState<DomiciliacionData>({
        banco: '',
        ci: '',
        telPrefix: '0412',
        telBank: '',
        telConfirmPrefix: '0412',
        telConfirm: '',
    });

    const labels = ['Banco', 'Autorización', 'Verificación'];
    const stepperIdx = step <= 1 ? step : 2;
    const showStepper = step <= 3;

    const handleNext = useCallback(() => setStep((s) => s + 1), []);

    return (
        <div className="flex w-full h-full justify-center items-start">
            <Card className="w-full max-w-lg">
                {/* Back to method selector (only on first step) */}
                {step === 0 && (
                    <button
                        type="button"
                        onClick={onBack}
                        className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 cursor-pointer mb-2"
                    >
                        <HiArrowLeft className="w-4 h-4" /> Cambiar método de
                        pago
                    </button>
                )}

                {showStepper && (
                    <StepIndicator current={stepperIdx} labels={labels} />
                )}

                {step === 0 && (
                    <StepBank
                        data={data}
                        setData={setData}
                        onNext={handleNext}
                    />
                )}
                {step === 1 && (
                    <StepAuth
                        onNext={handleNext}
                        onBack={() => setStep(0)}
                    />
                )}
                {step === 2 && <StepProcess onNext={handleNext} />}
                {step === 3 && <StepValidating onNext={handleNext} />}
                {step === 4 && (
                    <StepSuccess data={data} onComplete={onComplete} />
                )}
            </Card>
        </div>
    );
};

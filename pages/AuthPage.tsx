import React, { useState } from 'react';
import { User, UserType } from '../types';
import { Mail, Lock, User as UserIcon, Briefcase, ArrowRight, Loader2, Infinity, AlertTriangle, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { saveUser, getUser } from '../db';
import toast from 'react-hot-toast'; // Import Toast

interface AuthPageProps {
  onLogin: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Password Visibility
  const [showPassword, setShowPassword] = useState(false);
  
  // 2FA / Verification State
  const [showVerification, setShowVerification] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [userEnteredCode, setUserEnteredCode] = useState('');
  const [verificationError, setVerificationError] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserType>(UserType.PARTICULIER);
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  
  // Errors
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // --- VALIDATION ---
  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    const cleanEmail = email.trim().toLowerCase();
    
    if (!cleanEmail || !validateEmail(cleanEmail)) {
        newErrors.email = "Adresse email invalide.";
    }

    if (!isRegistering) {
        if (!password) newErrors.password = "Veuillez entrer votre mot de passe (Code).";
    } 
    else {
        if (!name.trim() || name.trim().length < 2) {
            newErrors.name = "Le nom est trop court.";
        }
        if (userType === UserType.PME && (!companyName.trim() || companyName.trim().length < 2)) {
            newErrors.companyName = "Nom de l'entreprise requis.";
        }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- HANDLERS ---

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
        toast.error("Veuillez corriger les erreurs.");
        return;
    }

    setLoading(true);

    try {
        const cleanEmail = email.trim().toLowerCase();

        if (isRegistering) {
            // --- REGISTRATION FLOW ---
            const existingUser = await getUser(cleanEmail);
            
            if (existingUser) {
                setErrors({ email: "Cet email possède déjà un compte." });
                toast.error("Un compte existe déjà avec cet email.");
                setLoading(false);
                return;
            }

            // 2. Generate Code
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            setGeneratedCode(code);
            setShowVerification(true);
            
            // Simulation SMS (Alert via Toast)
            toast.success(`Code envoyé : ${code}`, { duration: 6000, icon: '📩' });
            // Fallback alerte système pour être sûr
            alert(`[CODE SÉCURITÉ] Votre code Infini 24 est : ${code}\n\nCe code deviendra votre mot de passe.`);
            setLoading(false);

        } else {
            // --- LOGIN FLOW ---
            const foundUser = await getUser(cleanEmail);

            if (!foundUser) {
                setErrors({ email: "Aucun compte trouvé avec cet email." });
                toast.error("Email inconnu.");
            } else if (foundUser.password !== password) {
                setErrors({ password: "Mot de passe (Code) incorrect." });
                toast.error("Code de sécurité incorrect.");
            } else {
                toast.success(`Bienvenue, ${foundUser.name} !`);
                onLogin(foundUser);
            }
            setLoading(false);
        }
    } catch (error) {
        console.error("Auth Error", error);
        toast.error("Erreur de connexion.");
        setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
      e.preventDefault();
      if (userEnteredCode === generatedCode) {
          
          const newUser = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            type: userType,
            companyName: userType === UserType.PME ? companyName.trim() : undefined,
            phone: phone.trim() || "Non renseigné",
            password: generatedCode
          };
          
          await saveUser(newUser);
          toast.success("Compte créé avec succès !");
          onLogin(newUser);
      } else {
          setVerificationError("Code incorrect.");
          toast.error("Le code est incorrect.");
      }
  };

  if (showVerification) {
      return (
        <div className="flex flex-col h-full bg-[#FDFCF8] overflow-y-auto no-scrollbar items-center justify-center p-6">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 max-w-md w-full text-center animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-[#B48646]/10 text-[#B48646] rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShieldCheck size={40} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Code de sécurité</h2>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                    Un code à 6 chiffres a été envoyé pour sécuriser votre compte.
                    <br/>
                    <span className="text-xs text-[#B48646] font-bold">Important : Ce code sera votre mot de passe pour vos futures connexions.</span>
                </p>
                
                <form onSubmit={handleVerifyCode} className="space-y-4">
                    <input 
                        type="text" 
                        maxLength={6}
                        value={userEnteredCode}
                        onChange={(e) => { setUserEnteredCode(e.target.value); setVerificationError(''); }}
                        className="w-full text-center text-3xl font-bold tracking-[0.5em] py-4 border-b-2 border-slate-200 focus:border-[#B48646] outline-none bg-transparent transition-colors text-slate-800"
                        placeholder="000000"
                        autoFocus
                    />
                    
                    {verificationError && (
                        <p className="text-red-500 text-xs font-bold animate-pulse">{verificationError}</p>
                    )}

                    <button 
                        type="submit"
                        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-[#B48646] hover:shadow-[#B48646]/30 transition-all active:scale-95 mt-4"
                    >
                        Valider & Accéder
                    </button>
                </form>
                
                <button onClick={() => {
                    toast.success(`Code renvoyé : ${generatedCode}`, {icon: '🔄'});
                    alert(`Rappel : Votre code est ${generatedCode}`);
                }} className="mt-6 text-xs text-slate-400 hover:text-slate-600 underline">
                    Renvoyer le code
                </button>
            </div>
        </div>
      );
  }

  return (
    <div className="flex flex-col h-full bg-[#FDFCF8] overflow-y-auto no-scrollbar">
      
      <header className="pt-14 pb-10 px-6 bg-white border-b border-slate-50 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] relative overflow-hidden rounded-b-[3.5rem] mb-2 z-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#B48646] to-[#F3C06B] rounded-full blur-[80px] opacity-15 -mr-16 -mt-16 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-slate-900 rounded-full blur-[60px] opacity-5 -ml-10 -mb-10"></div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center mt-2">
                <div className="flex items-center justify-center mb-4 relative group cursor-pointer transition-transform duration-500 hover:scale-110">
                     <div className="absolute inset-0 bg-[#B48646] blur-3xl opacity-20 rounded-full group-hover:opacity-40 transition-opacity duration-500"></div>
                     <Infinity size={48} strokeWidth={1.5} className="text-[#B48646] relative z-10 drop-shadow-sm transition-transform duration-700 group-hover:rotate-180" />
                </div>
                
                <h1 className="text-4xl tracking-tighter mb-2 font-['Poppins'] font-bold text-slate-900">
                    Mon Espace
                </h1>
                
                <div className="inline-block px-4 py-1.5 rounded-full bg-[#B48646]/5 border border-[#B48646]/10 backdrop-blur-sm">
                     <p className="text-[#B48646] text-[10px] font-bold tracking-[0.3em] uppercase">
                        Connexion / Inscription
                     </p>
                </div>
            </div>
        </header>

      <div className="flex-1 px-4 md:px-6 relative z-20 pb-8">
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 max-w-lg mx-auto w-full transition-all">
            
            <div className="flex bg-slate-50 p-1.5 rounded-[1.5rem] mb-8 border border-slate-100">
                <button 
                    onClick={() => { setIsRegistering(false); setErrors({}); }}
                    className={`flex-1 py-3 text-sm font-bold rounded-2xl transition-all ${!isRegistering ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    Connexion
                </button>
                <button 
                    onClick={() => { setIsRegistering(true); setErrors({}); }}
                    className={`flex-1 py-3 text-sm font-bold rounded-2xl transition-all ${isRegistering ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    Inscription
                </button>
            </div>

            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{isRegistering ? 'Créer un compte' : 'Heureux de vous revoir'}</h2>
                <p className="text-slate-400 text-sm font-medium">
                    {isRegistering ? 'Rejoignez Infini 24 pour gérer vos projets.' : 'Connectez-vous avec votre email et votre code.'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                
                {isRegistering && (
                    <div className="space-y-5 animate-in slide-in-from-top-2 duration-300">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 text-center">Vous êtes ?</label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className={`border-2 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${userType === UserType.PARTICULIER ? 'bg-[#fffcf5] border-[#B48646] text-[#B48646]' : 'border-slate-100 hover:bg-slate-50 text-slate-400'}`}>
                                    <UserIcon size={24} />
                                    <span className="text-xs font-bold">Particulier</span>
                                    <input type="radio" name="userType" className="hidden" checked={userType === UserType.PARTICULIER} onChange={() => setUserType(UserType.PARTICULIER)} />
                                </label>
                                <label className={`border-2 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${userType === UserType.PME ? 'bg-[#fffcf5] border-[#B48646] text-[#B48646]' : 'border-slate-100 hover:bg-slate-50 text-slate-400'}`}>
                                    <Briefcase size={24} />
                                    <span className="text-xs font-bold">PME / Pro</span>
                                    <input type="radio" name="userType" className="hidden" checked={userType === UserType.PME} onChange={() => setUserType(UserType.PME)} />
                                </label>
                            </div>
                        </div>

                        <div>
                            <div className="relative group">
                                <UserIcon className="absolute left-5 top-4 text-slate-300 group-focus-within:text-[#B48646] transition-colors" size={20} />
                                <input 
                                    type="text" 
                                    name="name"
                                    placeholder="Votre Nom complet"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={`w-full pl-12 pr-6 py-4 bg-slate-50 border-2 rounded-2xl outline-none text-sm transition-all font-medium ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-transparent focus:bg-white focus:border-[#B48646] focus:ring-[#B48646]/10'} focus:ring-4`}
                                    required={isRegistering}
                                    autoComplete="name"
                                />
                            </div>
                            {errors.name && <p className="text-red-500 text-[10px] mt-1 ml-4 font-bold flex items-center gap-1"><AlertTriangle size={10}/> {errors.name}</p>}
                        </div>

                        {userType === UserType.PME && (
                            <div className="relative animate-in fade-in zoom-in duration-300 group">
                                <Briefcase className="absolute left-5 top-4 text-slate-300 group-focus-within:text-[#B48646] transition-colors" size={20} />
                                <input 
                                    type="text" 
                                    name="company"
                                    placeholder="Nom de l'entreprise"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className={`w-full pl-12 pr-6 py-4 bg-slate-50 border-2 rounded-2xl outline-none text-sm transition-all font-medium ${errors.companyName ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-transparent focus:bg-white focus:border-[#B48646] focus:ring-[#B48646]/10'} focus:ring-4`}
                                    required={userType === UserType.PME}
                                    autoComplete="organization"
                                />
                                {errors.companyName && <p className="text-red-500 text-[10px] mt-1 ml-4 font-bold flex items-center gap-1"><AlertTriangle size={10}/> {errors.companyName}</p>}
                            </div>
                        )}
                         
                         <div>
                             <div className="relative group">
                                 <span className="absolute left-5 top-4 text-slate-300 font-bold text-xs flex items-center h-full pb-8 group-focus-within:text-[#B48646] transition-colors">Tel</span>
                                <input 
                                    type="tel" 
                                    name="phone"
                                    placeholder="Numéro de téléphone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className={`w-full pl-14 pr-6 py-4 bg-slate-50 border-2 rounded-2xl outline-none text-sm transition-all font-medium ${errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-transparent focus:bg-white focus:border-[#B48646] focus:ring-[#B48646]/10'} focus:ring-4`}
                                    autoComplete="tel"
                                />
                            </div>
                            {errors.phone && <p className="text-red-500 text-[10px] mt-1 ml-4 font-bold flex items-center gap-1"><AlertTriangle size={10}/> {errors.phone}</p>}
                        </div>
                    </div>
                )}

                <div>
                    <div className="relative group">
                        <Mail className="absolute left-5 top-4 text-slate-300 group-focus-within:text-[#B48646] transition-colors" size={20} />
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Adresse Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full pl-12 pr-6 py-4 bg-slate-50 border-2 rounded-2xl outline-none text-sm transition-all font-medium ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-transparent focus:bg-white focus:border-[#B48646] focus:ring-[#B48646]/10'} focus:ring-4`}
                            required
                            autoComplete="email"
                        />
                    </div>
                    {errors.email && <p className="text-red-500 text-[10px] mt-1 ml-4 font-bold flex items-center gap-1"><AlertTriangle size={10}/> {errors.email}</p>}
                </div>

                {!isRegistering && (
                    <div>
                        <div className="relative group">
                            <Lock className="absolute left-5 top-4 text-slate-300 group-focus-within:text-[#B48646] transition-colors" size={20} />
                            <input 
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Votre Code de Sécurité"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full pl-12 pr-12 py-4 bg-slate-50 border-2 rounded-2xl outline-none text-sm transition-all font-medium ${errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-transparent focus:bg-white focus:border-[#B48646] focus:ring-[#B48646]/10'} focus:ring-4`}
                                required
                                autoComplete="current-password"
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-5 top-4 text-slate-300 hover:text-[#B48646] transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-[10px] mt-1 ml-4 font-bold flex items-center gap-1"><AlertTriangle size={10}/> {errors.password}</p>}
                    </div>
                )}

                {!isRegistering && (
                    <div className="flex items-center justify-end px-2">
                        <button type="button" onClick={() => {
                            toast("Veuillez entrer votre email pour récupérer le code.", {icon: 'ℹ️'});
                        }} className="text-xs font-bold text-[#B48646] hover:underline">Code oublié ?</button>
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#B48646] to-[#E5B066] hover:shadow-xl hover:shadow-[#B48646]/30 text-white font-bold py-5 rounded-[2rem] transition-all active:scale-95 flex items-center justify-center gap-3 text-lg"
                >
                    {loading ? <Loader2 className="animate-spin" /> : (
                        <>
                            {isRegistering ? "Générer mon code" : "Se connecter"} 
                            <ArrowRight size={20} />
                        </>
                    )}
                </button>

            </form>
        </div>
        
        <div className="mt-8 text-center px-6">
            <div className="flex items-center justify-center gap-2 text-slate-400 text-xs mb-3 font-medium">
                <Lock size={14} /> Connexion sécurisée SSL
            </div>
            <p className="text-[10px] text-slate-300 max-w-xs mx-auto">
                En vous inscrivant, vous acceptez les conditions générales d'utilisation d'Infini 24 et notre politique de confidentialité.
            </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
import React, { useState } from 'react';
import { User, UserType } from '../types';
import { Mail, Lock, User as UserIcon, Briefcase, ArrowRight, Loader2, Infinity, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { registerUser, loginUser, resetUserPassword } from '../db';
import toast from 'react-hot-toast';

interface AuthPageProps {
  onLogin: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserType>(UserType.PARTICULIER);
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // --- VALIDATION ---
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    const cleanEmail = email.trim().toLowerCase();
    
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
        newErrors.email = "Email invalide.";
    }

    if (!password || password.length < 6) {
        newErrors.password = "6 caractères minimum.";
    }

    if (isRegistering) {
        if (!name.trim() || name.trim().length < 2) newErrors.name = "Nom trop court.";
        if (userType === UserType.PME && !companyName.trim()) newErrors.companyName = "Entreprise requise.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- HANDLERS ---

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
        toast.error("Veuillez vérifier les champs.");
        return;
    }

    setLoading(true);

    try {
        const cleanEmail = email.trim().toLowerCase();

        if (isRegistering) {
            // --- INSCRIPTION ---
            const newUser = {
                name: name.trim(),
                email: cleanEmail,
                password: password, // Firebase gère le hashage
                type: userType,
                companyName: userType === UserType.PME ? companyName.trim() : undefined,
                phone: phone.trim() || "Non renseigné",
            };
            
            await registerUser(newUser);
            toast.success("Compte créé ! Connexion...");
            // Auto login après inscription
            const loggedUser = await loginUser(cleanEmail, password);
            if(loggedUser) onLogin(loggedUser);

        } else {
            // --- CONNEXION ---
            const loggedUser = await loginUser(cleanEmail, password);
            if (loggedUser) {
                toast.success(`Bonjour ${loggedUser.name}`);
                onLogin(loggedUser);
            }
        }
    } catch (error: any) {
        console.error(error);
        if (error.code === 'auth/email-already-in-use') toast.error("Cet email est déjà utilisé.");
        else if (error.code === 'auth/invalid-credential') toast.error("Email ou mot de passe incorrect.");
        else if (error.code === 'auth/too-many-requests') toast.error("Trop d'essais. Réessayez plus tard.");
        else toast.error("Erreur de connexion.");
    } finally {
        setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          toast.error("Entrez votre email dans le champ d'abord.");
          return;
      }
      try {
          await resetUserPassword(email);
          toast.success("Email de réinitialisation envoyé !", { duration: 5000 });
      } catch (error: any) {
          if(error.code === 'auth/user-not-found') toast.error("Aucun compte avec cet email.");
          else toast.error("Erreur lors de l'envoi.");
      }
  };

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
                        {isRegistering ? 'Création de compte' : 'Connexion Sécurisée'}
                     </p>
                </div>
            </div>
        </header>

      <div className="flex-1 px-4 md:px-6 relative z-20 pb-8">
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 max-w-lg mx-auto w-full transition-all">
            
            {/* Toggle Switch */}
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

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                
                {isRegistering && (
                    <div className="space-y-5 animate-in slide-in-from-top-2 duration-300">
                        {/* User Type Selector */}
                        <div className="grid grid-cols-2 gap-4">
                            <label className={`border-2 p-3 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${userType === UserType.PARTICULIER ? 'bg-[#fffcf5] border-[#B48646] text-[#B48646]' : 'border-slate-100 text-slate-400'}`}>
                                <UserIcon size={20} />
                                <span className="text-[10px] font-bold">Particulier</span>
                                <input type="radio" name="userType" className="hidden" checked={userType === UserType.PARTICULIER} onChange={() => setUserType(UserType.PARTICULIER)} />
                            </label>
                            <label className={`border-2 p-3 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${userType === UserType.PME ? 'bg-[#fffcf5] border-[#B48646] text-[#B48646]' : 'border-slate-100 text-slate-400'}`}>
                                <Briefcase size={20} />
                                <span className="text-[10px] font-bold">Professionnel</span>
                                <input type="radio" name="userType" className="hidden" checked={userType === UserType.PME} onChange={() => setUserType(UserType.PME)} />
                            </label>
                        </div>

                        {/* Name Field */}
                        <div>
                            <input 
                                type="text" 
                                placeholder="Votre Nom complet"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none text-sm font-medium focus:border-[#B48646] focus:ring-4 focus:ring-[#B48646]/10"
                            />
                            {errors.name && <p className="text-red-500 text-[10px] mt-1 ml-2 font-bold">{errors.name}</p>}
                        </div>

                        {/* Company Field */}
                        {userType === UserType.PME && (
                            <div className="animate-in fade-in zoom-in">
                                <input 
                                    type="text" 
                                    placeholder="Nom de l'entreprise"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none text-sm font-medium focus:border-[#B48646] focus:ring-4 focus:ring-[#B48646]/10"
                                />
                                {errors.companyName && <p className="text-red-500 text-[10px] mt-1 ml-2 font-bold">{errors.companyName}</p>}
                            </div>
                        )}
                         
                         {/* Phone Field */}
                         <div>
                            <input 
                                type="tel" 
                                placeholder="Numéro de téléphone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none text-sm font-medium focus:border-[#B48646] focus:ring-4 focus:ring-[#B48646]/10"
                            />
                        </div>
                    </div>
                )}

                {/* Email Field (Common) */}
                <div>
                    <div className="relative">
                        <Mail className="absolute left-5 top-4 text-slate-300" size={20} />
                        <input 
                            type="email" 
                            placeholder="Adresse Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none text-sm font-medium focus:border-[#B48646] focus:ring-4 focus:ring-[#B48646]/10 transition-all"
                        />
                    </div>
                    {errors.email && <p className="text-red-500 text-[10px] mt-1 ml-2 font-bold">{errors.email}</p>}
                </div>

                {/* Password Field (Common) */}
                <div>
                    <div className="relative">
                        <Lock className="absolute left-5 top-4 text-slate-300" size={20} />
                        <input 
                            type={showPassword ? "text" : "password"}
                            placeholder={isRegistering ? "Choisissez un mot de passe" : "Votre mot de passe"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none text-sm font-medium focus:border-[#B48646] focus:ring-4 focus:ring-[#B48646]/10 transition-all"
                        />
                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-5 top-4 text-slate-300 hover:text-[#B48646]"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-[10px] mt-1 ml-2 font-bold">{errors.password}</p>}
                </div>

                {/* Forgot Password Link */}
                {!isRegistering && (
                    <div className="flex justify-end">
                        <button type="button" onClick={handleForgotPassword} className="text-xs font-bold text-[#B48646] hover:underline">
                            Mot de passe oublié ?
                        </button>
                    </div>
                )}

                {/* Submit Button */}
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-slate-900 hover:bg-[#B48646] text-white font-bold py-4 rounded-[2rem] shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3 text-lg mt-6"
                >
                    {loading ? <Loader2 className="animate-spin" /> : (
                        <>
                            {isRegistering ? "S'inscrire" : "Se connecter"} 
                            <ArrowRight size={20} />
                        </>
                    )}
                </button>

            </form>
        </div>
        
        <div className="mt-8 text-center px-6">
            <p className="text-[10px] text-slate-300 max-w-xs mx-auto flex items-center justify-center gap-2">
               <Lock size={10} /> Sécurité garantie par Google Firebase
            </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
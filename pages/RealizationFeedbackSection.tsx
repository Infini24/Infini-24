import React, { useState, useEffect, useRef } from 'react';
import { 
  doc, 
  collection, 
  onSnapshot, 
  runTransaction, 
  addDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { ThumbsUp, Heart, MessageSquare, Send, User, HelpingHand, Frown } from 'lucide-react';
import toast from 'react-hot-toast';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid || null,
      email: auth?.currentUser?.email || null,
      emailVerified: auth?.currentUser?.emailVerified || null,
      isAnonymous: auth?.currentUser?.isAnonymous || null,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface RealizationFeedbackSectionProps {
  projectId: string;
}

export const RealizationFeedbackSection: React.FC<RealizationFeedbackSectionProps> = ({ projectId }) => {
  const [stats, setStats] = useState({ likesCount: 0, heartsCount: 0, solidariesCount: 0, sadsCount: 0 });
  const [comments, setComments] = useState<any[]>([]);
  const [showComments, setShowComments] = useState(false);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);
  
  const pickerRef = useRef<HTMLDivElement>(null);

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowReactionPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load user's previous reaction from localStorage for this session/browser
  useEffect(() => {
    const saved = localStorage.getItem(`reaction_${projectId}`);
    if (saved) {
      setUserReaction(saved);
    }
  }, [projectId]);

  // Real-time reactions listener
  useEffect(() => {
    if (!db) return;
    const statsDocRef = doc(db, 'realizations_feedback', projectId);
    const unsubscribe = onSnapshot(statsDocRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setStats({
          likesCount: data.likesCount || 0,
          heartsCount: data.heartsCount || 0,
          solidariesCount: data.solidariesCount || 0,
          sadsCount: data.sadsCount || 0,
        });
      } else {
        setStats({ likesCount: 0, heartsCount: 0, solidariesCount: 0, sadsCount: 0 });
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `realizations_feedback/${projectId}`);
    });
    return () => unsubscribe();
  }, [projectId]);

  // Real-time comments listener
  useEffect(() => {
    if (!db) return;
    const commentsColRef = collection(db, 'realizations_feedback', projectId, 'comments');
    const commentsQuery = query(commentsColRef, orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
      const list: any[] = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setComments(list);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, `realizations_feedback/${projectId}/comments`);
    });
    return () => unsubscribe();
  }, [projectId]);

  const getReactionField = (key: string): 'likesCount' | 'heartsCount' | 'solidariesCount' | 'sadsCount' => {
    if (key === 'heart') return 'heartsCount';
    if (key === 'solidary') return 'solidariesCount';
    if (key === 'sad') return 'sadsCount';
    return 'likesCount';
  };

  const handleReact = async (reactionKey: 'like' | 'heart' | 'solidary' | 'sad') => {
    if (!db) {
      toast.error("Le service de feedback n'est pas disponible pour le moment.");
      return;
    }
    setShowReactionPicker(false);

    const targetField = reactionKey === 'like' ? 'likesCount' : 
                        reactionKey === 'heart' ? 'heartsCount' : 
                        reactionKey === 'solidary' ? 'solidariesCount' : 'sadsCount';

    const statsDocRef = doc(db, 'realizations_feedback', projectId);

    try {
      await runTransaction(db, async (transaction) => {
        const statsDoc = await transaction.get(statsDocRef);
        const currentStats = statsDoc.exists() 
          ? (statsDoc.data() as { likesCount: number; heartsCount: number; solidariesCount: number; sadsCount: number })
          : { likesCount: 0, heartsCount: 0, solidariesCount: 0, sadsCount: 0 };

        // If user already had a reaction
        if (userReaction) {
          const oldReactionField = getReactionField(userReaction);
          if (userReaction === reactionKey) {
            // Toggle OFF (same reaction clicked again)
            currentStats[oldReactionField] = Math.max(0, currentStats[oldReactionField] - 1);
            setUserReaction(null);
            localStorage.removeItem(`reaction_${projectId}`);
          } else {
            // Change reaction (different reaction clicked)
            currentStats[oldReactionField] = Math.max(0, currentStats[oldReactionField] - 1);
            currentStats[targetField] = (currentStats[targetField] || 0) + 1;
            setUserReaction(reactionKey);
            localStorage.setItem(`reaction_${projectId}`, reactionKey);
          }
        } else {
          // New reaction
          currentStats[targetField] = (currentStats[targetField] || 0) + 1;
          setUserReaction(reactionKey);
          localStorage.setItem(`reaction_${projectId}`, reactionKey);
        }

        transaction.set(statsDocRef, currentStats);
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `realizations_feedback/${projectId}`);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) {
      toast.error("Le service de commentaires n'est pas disponible pour le moment.");
      return;
    }
    if (!newCommentText.trim()) return;

    setSubmittingComment(true);
    const author = newCommentName.trim() || 'Visiteur Anonyme';
    const text = newCommentText.trim();

    const commentsColRef = collection(db, 'realizations_feedback', projectId, 'comments');

    try {
      await addDoc(commentsColRef, {
        authorName: author,
        content: text,
        createdAt: serverTimestamp()
      });
      setNewCommentText('');
      toast.success("Commentaire publié !", { icon: '💬' });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `realizations_feedback/${projectId}/comments`);
    } finally {
      setSubmittingComment(false);
    }
  };

  const totalReactions = stats.likesCount + stats.heartsCount + stats.solidariesCount + stats.sadsCount;

  // Formatting date elegantly
  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'À l\'instant';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="border-t border-white/5 mt-6 px-6 sm:px-8 py-4 bg-slate-950/20 rounded-b-[2.5rem] overflow-visible">
      {/* 1. Stats Bar (Total reactions and comment counts) */}
      <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          {totalReactions > 0 ? (
            <div className="flex items-center gap-1.5">
              <div className="flex items-center -space-x-1">
                {stats.likesCount > 0 && <span className="z-30 filter drop-shadow">👍</span>}
                {stats.heartsCount > 0 && <span className="z-20 filter drop-shadow">❤️</span>}
                {stats.solidariesCount > 0 && <span className="z-10 filter drop-shadow">🤝</span>}
                {stats.sadsCount > 0 && <span className="z-0 filter drop-shadow">😢</span>}
              </div>
              <span className="font-semibold text-slate-300">
                {userReaction ? (
                  totalReactions === 1 ? "Vous" : `Vous et ${totalReactions - 1} autre${totalReactions > 2 ? 's' : ''}`
                ) : (
                  `${totalReactions} réaction${totalReactions > 1 ? 's' : ''}`
                )}
              </span>
            </div>
          ) : (
            <span className="italic text-slate-500">Aucune réaction</span>
          )}
        </div>

        <button 
          onClick={() => setShowComments(!showComments)}
          className="hover:underline hover:text-white transition-colors"
        >
          {comments.length} commentaire{comments.length > 1 ? 's' : ''}
        </button>
      </div>

      {/* 2. Actions Bar (React and Comment buttons) */}
      <div className="flex items-center gap-2 py-2 relative">
        {/* Reaction Picker Popover */}
        {showReactionPicker && (
          <div 
            ref={pickerRef}
            className="absolute bottom-12 left-0 bg-slate-900 border border-white/10 rounded-full px-4 py-2 flex items-center gap-4 shadow-2xl animate-in slide-in-from-bottom-2 duration-200 z-50 backdrop-blur-xl"
          >
            <button 
              onClick={() => handleReact('like')}
              className="text-2xl hover:scale-130 transition-transform active:scale-95 duration-150 relative group/btn"
              title="J'aime"
            >
              👍
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[10px] py-1 px-2 rounded font-bold opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">J'aime</span>
            </button>
            <button 
              onClick={() => handleReact('heart')}
              className="text-2xl hover:scale-130 transition-transform active:scale-95 duration-150 relative group/btn"
              title="J'adore"
            >
              ❤️
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[10px] py-1 px-2 rounded font-bold opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">J'adore</span>
            </button>
            <button 
              onClick={() => handleReact('solidary')}
              className="text-2xl hover:scale-130 transition-transform active:scale-95 duration-150 relative group/btn"
              title="Solidaire"
            >
              🤝
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[10px] py-1 px-2 rounded font-bold opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Solidaire</span>
            </button>
            <button 
              onClick={() => handleReact('sad')}
              className="text-2xl hover:scale-130 transition-transform active:scale-95 duration-150 relative group/btn"
              title="Triste"
            >
              😢
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[10px] py-1 px-2 rounded font-bold opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Triste</span>
            </button>
          </div>
        )}

        <button 
          onClick={() => setShowReactionPicker(!showReactionPicker)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-white/5 active:scale-95 ${
            userReaction === 'like' ? 'text-[#1877F2]' :
            userReaction === 'heart' ? 'text-rose-500' :
            userReaction === 'solidary' ? 'text-amber-500' :
            userReaction === 'sad' ? 'text-cyan-500' : 'text-slate-400 hover:text-white'
          }`}
        >
          {userReaction === 'like' && <span className="animate-bounce">👍</span>}
          {userReaction === 'heart' && <span className="animate-bounce">❤️</span>}
          {userReaction === 'solidary' && <span className="animate-bounce">🤝</span>}
          {userReaction === 'sad' && <span className="animate-bounce">😢</span>}
          {!userReaction && <ThumbsUp size={16} />}
          <span>
            {userReaction === 'like' ? "J'aime" :
             userReaction === 'heart' ? "J'adore" :
             userReaction === 'solidary' ? "Solidaire" :
             userReaction === 'sad' ? "Triste" : "Réagir"}
          </span>
        </button>

        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all active:scale-95"
        >
          <MessageSquare size={16} />
          <span>Commenter</span>
        </button>
      </div>

      {/* 3. Comments Box (Lists and Form) */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-white/5 space-y-4 animate-in fade-in slide-in-from-top-3 duration-300">
          {/* List of comments */}
          <div className="space-y-3 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 text-sm animate-in fade-in duration-200">
                  <div className="bg-white/5 p-2 rounded-full h-8 w-8 flex items-center justify-center text-slate-400 shrink-0">
                    <User size={16} />
                  </div>
                  <div className="flex-1 bg-white/5 rounded-2xl px-4 py-2.5 max-w-[85%]">
                    <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-0.5 mb-1">
                      <span className="font-bold text-slate-200">{comment.authorName}</span>
                      <span className="text-[10px] text-slate-500">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed break-words">{comment.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 italic text-center py-4">Soyez le premier à commenter cette réalisation !</p>
            )}
          </div>

          {/* New Comment Form */}
          <form onSubmit={handleAddComment} className="flex gap-3 pt-2">
            <div className="bg-white/5 p-2 rounded-full h-10 w-10 flex items-center justify-center text-[#B48646] shrink-0">
              <User size={18} />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value.slice(0, 50))}
                  placeholder="Votre nom ou prénom (ex: Jean)" 
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#B48646] transition-colors w-1/3 min-w-[120px]"
                />
                <p className="text-[10px] text-slate-500 flex items-center italic">Nom facultatif</p>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value.slice(0, 500))}
                  placeholder="Écrire un commentaire chaleureux..." 
                  className="bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#B48646] transition-colors w-full"
                  required
                />
                <button 
                  type="submit" 
                  disabled={submittingComment || !newCommentText.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#B48646] hover:text-[#B48646]/80 disabled:text-slate-600 transition-colors p-1.5"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

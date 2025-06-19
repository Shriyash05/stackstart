import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  githubConnected?: boolean;
  gitlabConnected?: boolean;
  bitbucketConnected?: boolean;
  subscriptionPlan?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGitHub: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  connectGitHub: () => Promise<void>;
  connectGitLab: () => Promise<void>;
  connectBitbucket: () => Promise<void>;
  updateSubscriptionPlan: (userId: string, plan: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch subscription plan from users table
  const fetchSubscriptionPlan = async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('subscription_plan')
      .eq('id', userId)
      .single();
    if (error) return 'free';
    return data?.subscription_plan || 'free';
  };

  // Update subscription plan in users table
  const updateSubscriptionPlan = async (userId: string, plan: string) => {
    await supabase.from('users').update({ subscription_plan: plan }).eq('id', userId);
    localStorage.setItem('subscriptionPlan', plan);
    setUser((u) => u ? { ...u, subscriptionPlan: plan } : u);
  };

  // Helper to upsert user in users table
  const upsertUser = async (supabaseUser: any) => {
    if (!supabaseUser) return;
    await supabase.from('users').upsert({
      id: supabaseUser.id,
      name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || 'User',
      email: supabaseUser.email,
      avatar: supabaseUser.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${supabaseUser.email}`,
      subscription_plan: 'free',
      onboarding_complete: false,
    });
  };

  useEffect(() => {
    // Check for existing session on mount
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          let plan = localStorage.getItem('subscriptionPlan') || 'free';
          setUser({
            id: session.user.id,
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            avatar: session.user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.email}`,
            githubConnected: !!session.user.user_metadata?.github_username,
            gitlabConnected: !!session.user.user_metadata?.gitlab_username,
            bitbucketConnected: !!session.user.user_metadata?.bitbucket_username,
            subscriptionPlan: plan,
          });
        }
      } catch (error) {
        console.error('Error checking auth session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        let plan = localStorage.getItem('subscriptionPlan') || 'free';
        setUser({
          id: session.user.id,
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
          avatar: session.user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.email}`,
          githubConnected: !!session.user.user_metadata?.github_username,
          gitlabConnected: !!session.user.user_metadata?.gitlab_username,
          bitbucketConnected: !!session.user.user_metadata?.bitbucket_username,
          subscriptionPlan: plan,
        });
        await upsertUser(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        localStorage.removeItem('subscriptionPlan');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      if (data?.user) await upsertUser(data.user);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Sign up failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      if (data?.user) await upsertUser(data.user);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Sign in failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGitHub = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'GitHub sign in failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Google sign in failed');
    } finally {
      setIsLoading(false);
    }
  };

  const connectGitHub = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes: 'repo',
        },
      });
      if (error) throw error;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'GitHub connection failed');
    } finally {
      setIsLoading(false);
    }
  };

  const connectGitLab = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'gitlab',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          scopes: 'api',
        },
      });
      if (error) throw error;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'GitLab connection failed');
    } finally {
      setIsLoading(false);
    }
  };

  const connectBitbucket = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'bitbucket',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Bitbucket connection failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    console.log("signOut called");
    setIsLoading(true);
    try {
      console.log("Calling supabase.auth.signOut()");
      const { error } = await supabase.auth.signOut();
      console.log("supabase.auth.signOut() returned", error);
      if (error) {
        console.error("Supabase signOut error:", error);
        throw error;
      }
      setUser(null);
      localStorage.removeItem('subscriptionPlan');
      console.log("Clearing localStorage and cookies");
      Object.keys(localStorage)
        .filter((key) => key.startsWith('sb-'))
        .forEach((key) => localStorage.removeItem(key));
      document.cookie.split(';').forEach((c) => {
        if (c.trim().startsWith('sb-')) {
          document.cookie = c
            .replace(/^ +/, '')
            .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
        }
      });
      console.log("Reloading window");
      window.location.reload();
    } catch (error) {
      console.error("Sign out error:", error);
      throw new Error(error instanceof Error ? error.message : 'Sign out failed');
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signUp,
    signIn,
    signInWithGitHub,
    signInWithGoogle,
    signOut,
    connectGitHub,
    connectGitLab,
    connectBitbucket,
    updateSubscriptionPlan,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

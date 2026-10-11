import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
interface SocialProps {
  setSocialLoading: React.Dispatch<
    React.SetStateAction<"google" | "github" | null>
  >;
}
  
  export const handleSocialSignIn = async (
    provider: "google" | "github",
     call: string | null,
     setSocialLoading: React.Dispatch<React.SetStateAction<"google" | "github" | null>>) => {

      const destination = call ? call : "/";
    try {
      setSocialLoading(provider);

      const { error } = await signIn.social({
        provider,
        callbackURL: destination,
      });

      if (error) {
        toast.error(error.message || "সোশ্যাল সাইন ইন ব্যর্থ হয়েছে।");
        setSocialLoading(null);
      }
    } catch {
      toast.error("সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
      setSocialLoading(null);
    }
  };
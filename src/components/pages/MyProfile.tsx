"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MyProfile() {
    const { data: session, isPending } = useSession();

    const [name, setName] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleUpdate = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const updatedName = (
            name ?? session?.user?.name ?? ""
        ).trim();

        if (!updatedName) {
            setMessage("Please enter your name.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const { error } = await authClient.updateUser({
                name: updatedName,
            });

            if (error) {
                setMessage(error.message || "Update failed.");
                toast.error(error.message || "Profile update failed!");
                return;
            }

            setMessage("Profile updated successfully!");
            setName(updatedName);
            toast.success('Profile updated successfully!')
        } catch {
            setMessage("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    if (isPending) {
        return <p className="p-6">Loading...</p>;
    }

    if (!session) {
        return <p className="p-6">Please sign in first.</p>;
    }

    return (
        <div className="mx-auto max-w-md p-6">
            <h1 className="mb-6 text-2xl font-bold">
                Update Information
            </h1>

            <form onSubmit={handleUpdate}>
                <label
                    className="mb-2 block"
                    htmlFor="name"
                >
                    Name
                </label>

                <input
                    id="name"
                    type="text"
                    value={name ?? session.user.name ?? ""}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full rounded-lg border p-3"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 w-full rounded-lg bg-blue-600 p-3 text-white disabled:opacity-50"
                >
                    {loading
                        ? "Updating..."
                        : "Update Information"}
                </button>

                {message && (
                    <p className="mt-4" role="status">
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
}

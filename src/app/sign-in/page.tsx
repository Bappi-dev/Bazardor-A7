"use client";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
const SignInPage = () => {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {};
        // Convert FormData to plain object
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });
        console.log(data);
    };

    return (
        <div className="bg-[#F0F5F0] py-28">
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-extrabold">সাইন ইন</h2>
                <p className="text-gray-500 mb-4">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
                <Form className="flex w-96 flex-col gap-4 shadow p-5 rounded-2xl" onSubmit={onSubmit}>

                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label>ইমেইল</Label>
                        <Input placeholder="Bappi@gmail.com" />
                        <FieldError />
                    </TextField>
                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }
                            return null;
                        }}
                    >
                        <Label>পাসওয়ার্ড</Label>
                        <Input placeholder="Enter your password" />
                        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                        <FieldError />
                    </TextField>
                    <div className="flex gap-2">
                        <Button className="w-full" type="submit">
                            অ্যাকাউন্ট তৈরি করুন
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default SignInPage;
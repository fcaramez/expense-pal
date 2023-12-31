import { useCallback } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/utils/api";

export default function SignupPage() {
  const router = useRouter();
  const { mutate: signUpUser } = api.auth.signup.useMutation({
    onSuccess: ({ token }) => {
      localStorage.setItem("token", token as string);
      router.push("/");
    },
  });

  const signupFormSchema = z.object({
    username: z
      .string()
      .min(2, { message: "Username must have more than 2 characters" })
      .max(15, { message: "Username must not exceed 15 characters" }),
    email: z.string().email("Please provide a valid email address"),
    password: z.string().min(1, { message: "Password is required" }),
    income: z.string(),
    avatar: z.string(),
  });

  const signupForm = useForm<z.infer<typeof signupFormSchema>>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      avatar: "",
      income: "",
    },
    resolver: zodResolver(signupFormSchema),
  });

  const handleFileInput = useCallback(
    async (e: React.SyntheticEvent<EventTarget>) => {
      const target = e.target as HTMLInputElement;
      if (!target.files || target.files.length === 0) return;
      const formData = new FormData();
      formData.append("file", target.files[0] as Blob);
      formData.append("upload_preset", "expense-app");

      const data = await fetch(
        "https://api.cloudinary.com/v1_1/fcaramez/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const res = await data.json();

      const url = res.url;

      signupForm.setValue("avatar", url);
    },
    [signupForm],
  );

  const handleFormSubmission = (values: z.infer<typeof signupFormSchema>) => {
    const parsedNumber = Number(signupForm.getValues().income);

    const payload = {
      username: values.username,
      email: values.email,
      password: values.password,
      income: parsedNumber,
      avatar: values.avatar,
    };

    signUpUser(payload);
  };

  return (
    <main className="flex h-full w-screen flex-1 flex-col items-center justify-center">
      <h1 className="text-center text-2xl font-bold text-black">Signup</h1>
      <Form {...signupForm}>
        <div>
          <form
            onSubmit={signupForm.handleSubmit(handleFormSubmission)}
            className="grid grid-cols-2 place-items-center gap-4 p-6"
          >
            <FormField
              control={signupForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="username"
                      placeholder="johnDoe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signupForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="john@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signupForm.control}
              name="password"
              render={({ field }) => (
                <FormItem className="col-span-2 w-full">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="password"
                      placeholder="*********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signupForm.control}
              name="income"
              render={({ field }) => (
                <FormItem className="col-span-2 w-full">
                  <FormLabel>Income</FormLabel>
                  <FormControl>
                    <Input
                      type="income"
                      autoComplete="income"
                      placeholder="$"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-2 w-full">
              <label className=" mb-2 block text-sm font-medium dark:text-white">
                Profile Picture
              </label>
              <input
                className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-black focus:outline-none dark:border-black dark:bg-black dark:text-gray-400 dark:placeholder:text-black"
                onChange={handleFileInput}
                type="file"
                accept="image/*"
              />
            </div>
            <Button
              variant="primary"
              className="col-span-2 w-full rounded-xl border-none text-white shadow-xl"
            >
              Submit
            </Button>
            <p className="col-span-2 text-sm">
              Already have an account?{" "}
              <span className="text-main">
                <Link href="/login">Login Here</Link>
              </span>
            </p>
          </form>
        </div>
      </Form>
    </main>
  );
}

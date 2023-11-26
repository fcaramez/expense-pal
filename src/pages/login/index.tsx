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

export default function LoginPage() {
  const router = useRouter();

  const { mutate: loginUser } = api.auth.login.useMutation({
    onSuccess: ({ token }) => {
      localStorage.setItem("token", token as string);
      router.push("/");
    },
  });

  const loginFormSchema = z.object({
    searchCriteria: z
      .string()
      .min(1, { message: "Username or Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
  });

  const loginForm = useForm({
    defaultValues: {
      searchCriteria: "",
      password: "",
    },
    resolver: zodResolver(loginFormSchema),
  });

  const handleFormSubmission = (values: z.infer<typeof loginFormSchema>) => {
    loginUser(values);
  };

  return (
    <main className="flex h-full w-screen flex-col items-center justify-center gap-6 ">
      <h1 className="text-font text-center text-2xl font-bold">Login</h1>
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(handleFormSubmission)}
          className="grid grid-cols-1 place-items-center gap-4 p-6"
        >
          <FormField
            control={loginForm.control}
            name="searchCriteria"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Username or Email</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="email"
                    placeholder="johnDoe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
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

          <Button
            variant="primary"
            className="w-full rounded-xl border-none text-white shadow-xl"
            type="submit"
          >
            Submit
          </Button>
          <p>
            Don't have an account?{" "}
            <span className="text-main">
              <Link href="/signup">Signup Here</Link>
            </span>
          </p>
        </form>
      </Form>
    </main>
  );
}

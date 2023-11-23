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
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-6 ">
      <h1 className="text-center text-2xl font-bold text-font">Login</h1>
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(handleFormSubmission)}
          className="grid grid-cols-1 place-items-center gap-4 p-6"
        >
          <FormField
            control={loginForm.control}
            name="searchCriteria"
            render={({ field }) => (
              <FormItem className="col-span-2 w-full">
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

          <Button
            variant="primary"
            className="col-span-2 w-full rounded-xl border-none text-white"
            type="submit"
          >
            Submit
          </Button>
          <p className="col-span-2">
            Don't have an account?{" "}
            <span className="text-highlight">
              <Link href="/signup">Signup Here</Link>
            </span>
          </p>
        </form>
      </Form>
    </main>
  );
}

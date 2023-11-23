import { zodResolver } from "@hookform/resolvers/zod";
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
    searchCriteria: z.string(),
    password: z.string(),
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
      <h1 className="text-center text-2xl font-semibold">Login</h1>
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

          <Button className="col-span-2 w-full text-sm" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}

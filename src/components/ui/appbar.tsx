import Link from "next/link";
import { FaMoneyBill } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const AppBar = () => {
  return (
    <header className="w-full">
      <nav className="flex items-center justify-around p-6">
        <Link href="/" className="flex items-center gap-2 hover:cursor-pointer">
          <FaMoneyBill className="h-12 w-12 text-main" />
          <h1 className="text-2xl font-bold">Expense Pal</h1>
        </Link>
        <div className="space-x-6">
          <Link
            href="/feed"
            className="hidden rounded-xl p-2 hover:text-main lg:inline"
          >
            Feed
          </Link>
          <Link
            href="/profile/expenses"
            className="rounded-xlp-2 hidden hover:text-main  lg:inline"
          >
            Expenses
          </Link>
          <Link
            href="/profile"
            className="rounded-xlp-2 hidden hover:text-main  lg:inline"
          >
            Account
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="lg:hidden">
              <RxHamburgerMenu className="h-6 w-6" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <Link href="/profile">Account</Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/feed">Feed</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/profile/expenses">Expenses</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};

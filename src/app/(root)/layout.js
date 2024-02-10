import { Poppins } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import LeftSideBar from '@/components/layout/sidebar'
import Toolbar from '@/components/layout/toolbar'
import RighSideShow from '@/components/layout/rightsidebar'
import MainContent from "@/components/layout/MainContent";
import BotttomBar from "@/components/layout/BotttomBar";
import '@/app/globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata = {
  title: "Feel Free",
  description: "Best Social Media Platform",
  icons: {
    icon: '/assets/logo.jpg'
  }
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.className} custom-scrollbar `}>
          <div className="flex gap-x-8">
            <LeftSideBar />
            <div className="flex flex-col mt-4 w-full sm:w-[60vw] md:w-[50vw]">
              <Toolbar />
              <MainContent children={children} />
              <BotttomBar />
            </div>
            <RighSideShow />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}

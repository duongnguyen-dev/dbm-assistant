import { Toaster } from "@/components/ui/toaster"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main>
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  )
}
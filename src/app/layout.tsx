import "@/css/main.css";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-primary">
                <main>{children}</main>
            </body>
        </html>
    );
}

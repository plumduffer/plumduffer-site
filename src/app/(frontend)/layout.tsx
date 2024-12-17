import "@/css/main.css";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className="[--padding-inline:theme(spacing.8)] [--content-max-width:theme(screens.2xl)]"
        >
            <body className="bg-primary text-white h-full">
                <div className="grid grid-cols-container h-full">
                    <main className="col-content">{children}</main>
                </div>
            </body>
        </html>
    );
}

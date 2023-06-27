import Navbar from "./components/navbar/navbar"


export default function Layout({ children }: any) {
    return (
        <>
            <Navbar />
            <main>{children}</main>

        </>
    )
}
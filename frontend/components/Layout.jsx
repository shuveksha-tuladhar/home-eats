import Head from "next/head";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

export default function Layout(props) {
  const title = "HomeEats";

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      {/* <Navigation /> */}
      <main>{props.children}</main>
      <Footer/>
    </div>
  );
}
